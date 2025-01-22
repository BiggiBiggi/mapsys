import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./DeviceManager.module.scss";

// Import your device icons
import pcPortable from "/src/assets/images/PCPortable.png";
import pcFixe from "/src/assets/images/PCFixe.png";
import imprimanteSupport from "/src/assets/images/ImpSupport.png";
import imprimanteCopieur from "/src/assets/images/impCopieur.png";

const deviceTypes = [
  {
    id: "pcPortable",
    name: "PC Portable",
    icon: pcPortable,
    table: "pc_glpi",
    prefix: "S068164",
  },
  {
    id: "pcFixe",
    name: "PC Fixe",
    icon: pcFixe,
    table: "pc_glpi",
    prefix: "S068163",
  },
  {
    id: "imprimanteSupport",
    name: "Imprimante Support",
    icon: imprimanteSupport,
    table: "imp_support",
  },
  {
    id: "imprimanteCopieur",
    name: "Imprimante Copieur",
    icon: imprimanteCopieur,
    table: "imp_copieurs",
  },
];

const API_BASE_URL = "http://localhost:5000/api";

function DeviceManager({ onSaveDevices, initialDevices, planId }) {
  const [devices, setDevices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [databaseDevices, setDatabaseDevices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [error, setError] = useState(null);
  const [isPlacingDevice, setIsPlacingDevice] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [deviceDetails, setDeviceDetails] = useState({});
  const mapContainerRef = useRef(null);
  const draggedDeviceRef = useRef(null);

  const fetchDeviceDetails = useCallback(async (deviceId, deviceType) => {
    try {
      const type = deviceTypes.find((t) => t.id === deviceType);
      if (!type) return;

      const response = await fetch(`${API_BASE_URL}/${type.table}/${deviceId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Device details fetched:", data);

      setDeviceDetails((prev) => ({
        ...prev,
        [deviceId]: data,
      }));
    } catch (error) {
      console.error("Error fetching device details:", error);
    }
  }, []);

  useEffect(() => {
    const savedDevices = localStorage.getItem(`devices_${planId}`);
    if (savedDevices) {
      const parsedDevices = JSON.parse(savedDevices);
      setDevices(parsedDevices);
      parsedDevices.forEach((device) => {
        fetchDeviceDetails(device.databaseId, device.type);
      });
    } else if (initialDevices) {
      setDevices(initialDevices);
      initialDevices.forEach((device) => {
        fetchDeviceDetails(device.databaseId, device.type);
      });
    }
  }, [planId, initialDevices, fetchDeviceDetails]);

  const fetchDevicesFromDatabase = useCallback(
    async (table, prefix) => {
      try {
        let url = `${API_BASE_URL}/${table}`;
        if (searchTerm) {
          url += `?search=${encodeURIComponent(searchTerm)}`;
        }
        if (prefix) {
          url += `${searchTerm ? "&" : "?"}type=${
            prefix === "S068164" ? "portable" : "fixe"
          }`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Database devices fetched:", data);

        const devicesWithIds = data.map((device) => ({
          ...device,
          uniqueId: `${table}-${
            device.id || device.ID || Date.now()
          }-${Math.random().toString(36).substr(2, 9)}`,
        }));
        setDatabaseDevices(devicesWithIds);
        setError(null);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setDatabaseDevices([]);
        setError(error.message);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    if (selectedType) {
      fetchDevicesFromDatabase(selectedType.table, selectedType.prefix);
    }
  }, [selectedType, fetchDevicesFromDatabase]);

  const addDevice = () => {
    if (!isPlacingDevice) {
      setIsModalOpen(true);
    } else {
      handleConfirmPlacements();
    }
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSearchTerm("");
    setSelectedDevice(null);
    setError(null);
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleValidateDevice = () => {
    if (selectedDevice) {
      const deviceData = databaseDevices.find(
        (d) => d.uniqueId === selectedDevice.uniqueId
      );
      console.log("Device data being saved:", deviceData);

      const newDevice = {
        id: `${planId}-${selectedType.id}-${Date.now()}`,
        type: selectedType.id,
        databaseId: deviceData.ID || deviceData.id,
        details: deviceData, // Stockage des détails complets
        x: 0,
        y: 0,
      };

      setDevices((prevDevices) => {
        const updatedDevices = [...prevDevices, newDevice];
        localStorage.setItem(
          `devices_${planId}`,
          JSON.stringify(updatedDevices)
        );
        return updatedDevices;
      });

      setIsPlacingDevice(true);
      setIsModalOpen(false);
      setSelectedType(null);
      setSearchTerm("");
      setSelectedDevice(null);
    }
  };

  const handleSavePositions = useCallback(() => {
    console.log("Saving positions:", devices);
    localStorage.setItem(`devices_${planId}`, JSON.stringify(devices));
    onSaveDevices(devices);
    setConfirmationMessage(
      `Positions des appareils sauvegardées pour le plan ${planId}`
    );

    setTimeout(() => {
      setConfirmationMessage("");
    }, 3000);
  }, [devices, planId, onSaveDevices]);

  const handleConfirmPlacements = useCallback(() => {
    if (isPlacingDevice) {
      setIsPlacingDevice(false);
    }
    handleSavePositions();
  }, [isPlacingDevice, handleSavePositions]);

  const handleMouseMove = useCallback(
    (e) => {
      if (draggedDeviceRef.current && !isDeleteModalOpen) {
        const newX =
          e.clientX -
          draggedDeviceRef.current.mapOffsetX -
          draggedDeviceRef.current.startX;
        const newY =
          e.clientY -
          draggedDeviceRef.current.mapOffsetY -
          draggedDeviceRef.current.startY;

        draggedDeviceRef.current.x = newX;
        draggedDeviceRef.current.y = newY;

        const deviceElement = document.getElementById(
          draggedDeviceRef.current.id
        );
        if (deviceElement) {
          deviceElement.style.transform = `translate(${newX}px, ${newY}px)`;
        }
      }
    },
    [isDeleteModalOpen]
  );

  const handleMouseUp = useCallback(() => {
    if (draggedDeviceRef.current) {
      const { id, x, y } = draggedDeviceRef.current;
      setDevices((prevDevices) =>
        prevDevices.map((d) => (d.id === id ? { ...d, x, y } : d))
      );
    }
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    draggedDeviceRef.current = null;
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e, device) => {
      if (isPlacingDevice && device.id !== devices[devices.length - 1].id) {
        return;
      }
      e.preventDefault();
      const deviceRect = e.target.getBoundingClientRect();
      const mapRect = mapContainerRef.current.getBoundingClientRect();

      draggedDeviceRef.current = {
        ...device,
        startX: e.clientX - deviceRect.left,
        startY: e.clientY - deviceRect.top,
        originalX: device.x,
        originalY: device.y,
        mapOffsetX: mapRect.left,
        mapOffsetY: mapRect.top,
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [isPlacingDevice, devices, handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteDevice = useCallback(
    (deviceId) => {
      console.log("Deleting device with ID:", deviceId);
      console.log("Current devices:", devices);

      setDevices((prevDevices) => {
        const updatedDevices = prevDevices.filter(
          (device) => device.id !== deviceId
        );
        console.log("Updated devices:", updatedDevices);
        localStorage.setItem(
          `devices_${planId}`,
          JSON.stringify(updatedDevices)
        );
        onSaveDevices(updatedDevices);
        return updatedDevices;
      });

      setIsDeleteModalOpen(false);
      setConfirmationMessage(`Appareil supprimé du plan ${planId}`);

      setTimeout(() => {
        setConfirmationMessage("");
      }, 3000);
    },
    [devices, planId, onSaveDevices]
  );

  const filteredDevices = databaseDevices.filter((device) =>
    (device.Nom_PC || device.NomImpServeur || device.Nom_IMP || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderDeviceTooltip = (device, details) => {
    let tooltipContent;
    let name;
    switch (device.type) {
      case "pcPortable":
      case "pcFixe":
        name = details.Nom_PC;
        tooltipContent = (
          <>
            <h3>Détails du PC :</h3>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom du PC :</span>
                <span className={styles.value}>{details.Nom_PC || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Numéro de Série :</span>
                <span className={styles.value}>{details.SN || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>IP Wifi :</span>
                <span className={styles.value}>{details.IP_Wifi || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>IP Filaire :</span>
                <span className={styles.value}>
                  {details.IP_Filaire || "N/A"}
                </span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Prise :</span>
                <span className={styles.value}>{details.Prise || "N/A"}</span>
              </div>
            </div>
          </>
        );
        break;
      case "imprimanteCopieur":
        name = details.NomImpServeur;
        tooltipContent = (
          <>
            <h3>Détail de l&apos;imprimante :</h3>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom IMP Serveur :</span>
                <span className={styles.value}>
                  {details.NomImpServeur || "N/A"}
                </span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Modèle :</span>
                <span className={styles.value}>{details.Model || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Adresse IP :</span>
                <span className={styles.value}>
                  {details.AdresseIp || "N/A"}
                </span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Numéro de Serie :</span>
                <span className={styles.value}>{details.SN || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom Infolog :</span>
                <span className={styles.value}>
                  {details.NomInfolog || "N/A"}
                </span>
              </div>
            </div>
          </>
        );
        break;
      case "imprimanteSupport":
        name = details.Nom_IMP;
        tooltipContent = (
          <>
            <h3>Détail de l&apos;imprimante support :</h3>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom de l&apos;imprimante :</span>
                <span className={styles.value}>{details.Nom_IMP || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Adresse IP :</span>
                <span className={styles.label}>Adresse IP :</span>
                <span className={styles.value}>
                  {details.AdresseIp || "N/A"}
                </span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Numéro de Serie :</span>
                <span className={styles.value}>{details.SN || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Modèle :</span>
                <span className={styles.value}>{details.Type || "N/A"}</span>
              </div>
            </div>
          </>
        );
        break;
      default:
        return null;
    }
    return { tooltipContent, name };
  };

  return (
    <div className={styles.deviceManager}>
      <button
        onClick={addDevice}
        className={`${styles.addButton} ${
          isPlacingDevice ? styles.confirmButton : ""
        }`}
      >
        {isPlacingDevice ? "Confirmer l'emplacement" : "Ajouter un appareil"}
      </button>

      <button onClick={openDeleteModal} className={styles.deleteButton}>
        Supprimer un appareil
      </button>

      <div
        ref={mapContainerRef}
        className={styles.mapContainer}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {devices.map((device) => {
          const details = deviceDetails[device.databaseId] || {};
          return (
            <div
              key={device.id}
              id={device.id}
              className={styles.deviceIcon}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translate(${device.x}px, ${device.y}px)`,
                cursor: "grab",
                transition: "none",
                zIndex: 0,
              }}
              onMouseDown={(e) => handleMouseDown(e, device)}
              draggable={false}
              data-plan-id={planId}
            >
              <img
                src={
                  deviceTypes.find((d) => d.id === device.type).icon ||
                  "/placeholder.svg"
                }
                alt={device.type}
                style={{ width: "30px", height: "30px" }}
              />
              <div className={styles.tooltip}>
                {renderDeviceTooltip(device, details).tooltipContent}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className={styles.modal} style={{ zIndex: 2000 }}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Choisissez un type d&apos;appareil
            </h2>
            <div className={styles.deviceTypeButtons}>
              {deviceTypes.map((type) => (
                <button key={type.id} onClick={() => handleTypeSelect(type)}>
                  <img src={type.icon || "/placeholder.svg"} alt={type.name} />
                  {type.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.closeButton}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {selectedType && (
        <div className={styles.modal} style={{ zIndex: 2001 }}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Choisissez un appareil</h2>
            <input
              type="text"
              placeholder="Rechercher un appareil..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            {error ? (
              <div className={styles.error}>{error}</div>
            ) : (
              <div className={styles.deviceListContainer}>
                <div className={styles.deviceList}>
                  {filteredDevices.map((device) => (
                    <button
                      key={device.uniqueId}
                      onClick={() => handleDeviceSelect(device)}
                      className={`${styles.deviceButton} ${
                        selectedDevice &&
                        selectedDevice.uniqueId === device.uniqueId
                          ? styles.selected
                          : ""
                      }`}
                    >
                      {device.Nom_PC || device.NomImpServeur || device.Nom_IMP}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.modalButtons}>
              <button
                onClick={() => setSelectedType(null)}
                className={styles.closeButton}
              >
                Fermer
              </button>
              {selectedDevice && (
                <button
                  onClick={handleValidateDevice}
                  className={styles.validateButton}
                >
                  Valider
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modal} style={{ zIndex: 2000 }}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              Choisissez un appareil à supprimer
            </h2>
            <div className={styles.deviceList}>
              {devices.map((device) => {
                const details = deviceDetails[device.databaseId] || {};
                const { name } = renderDeviceTooltip(device, details);
                return (
                  <button
                    key={device.id}
                    onClick={() => handleDeleteDevice(device.id)}
                    className={styles.deviceButton}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {deviceTypes.find((t) => t.id === device.type).name} -{" "}
                    {name || "Nom inconnu"}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className={styles.closeButton}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      {confirmationMessage && (
        <div className={styles.confirmationMessage}>{confirmationMessage}</div>
      )}
    </div>
  );
}

export default DeviceManager;
