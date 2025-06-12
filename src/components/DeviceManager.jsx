"use client";

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
    table: "equipements",
    dbType: "PC Portable", // Valeur exacte dans la colonne 'type' de la DB
  },
  {
    id: "pcFixe",
    name: "PC Fixe",
    icon: pcFixe,
    table: "equipements",
    dbType: "PC Fixe",
  },
  {
    id: "imprimanteSupport",
    name: "Imprimante Support",
    icon: imprimanteSupport,
    table: "equipements",
    dbType: "Imprimante Support",
  },
  {
    id: "imprimanteCopieur",
    name: "Imprimante Copieur",
    icon: imprimanteCopieur,
    table: "equipements",
    dbType: "Imprimante Copieur",
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditDevice, setSelectedEditDevice] = useState(null);
  const [editMode, setEditMode] = useState(null); // 'position' or 'info'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newDeviceInfo, setNewDeviceInfo] = useState(null);
  const [deviceBeingEdited, setDeviceBeingEdited] = useState(null);
  const [isEditModalReady, setIsEditModalReady] = useState(false);

  // Nouvelle fonction pour récupérer les appareils déjà positionnés
  const fetchPositionedDevices = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/positionne`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("📍 Positioned devices fetched:", data);
      return data.map((item) => item.id_eqts); // Retourner seulement les IDs
    } catch (error) {
      console.error("❌ Error fetching positioned devices:", error);
      return [];
    }
  }, []);

  // Fonction pour enregistrer un appareil comme positionné
  const saveDevicePosition = useCallback(
    async (deviceId) => {
      try {
        // Vérifier si l'ID est valide
        if (!deviceId) {
          console.error("❌ Invalid device ID for positioning");
          return false;
        }

        console.log(
          `📍 Attempting to save position for device ID: ${deviceId}`
        );

        // Structure adaptée à l'API - utiliser id au lieu de id_poste_de_travail
        const positionData = {
          id_eqts: deviceId,
          id_poste_de_travail: planId, // Sera utilisé comme "id" dans la table
        };

        console.log("📦 Position data to send:", positionData);

        const response = await fetch(`${API_BASE_URL}/positionne`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(positionData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Server error: ${response.status} - ${errorText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`✅ Device ${deviceId} marked as positioned`);
        return true;
      } catch (error) {
        console.error("❌ Error saving device position:", error);
        // Afficher un message d'erreur à l'utilisateur mais ne pas bloquer le flux
        setConfirmationMessage(
          `⚠️ Erreur lors de l'enregistrement de la position (l'appareil est tout de même placé sur le plan)`
        );
        setTimeout(() => {
          setConfirmationMessage("");
        }, 5000);
        return false;
      }
    },
    [planId]
  );

  // Fonction pour libérer un appareil (le retirer de la table positionne)
  const removeDevicePosition = useCallback(async (deviceId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/positionne/${deviceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`✅ Device ${deviceId} position removed`);
      return true;
    } catch (error) {
      console.error("❌ Error removing device position:", error);
      return false;
    }
  }, []);

  const fetchDeviceDetails = useCallback(async (deviceId, deviceType) => {
    try {
      // Vérifications de sécurité
      if (!deviceId) {
        console.warn("fetchDeviceDetails: deviceId is undefined or null");
        return null;
      }

      if (!deviceType) {
        console.warn("fetchDeviceDetails: deviceType is undefined or null");
        return null;
      }

      const type = deviceTypes.find((t) => t.id === deviceType);
      if (!type) {
        console.warn(
          `fetchDeviceDetails: No type found for deviceType: ${deviceType}`
        );
        return null;
      }

      const url = `${API_BASE_URL}/${type.table}/${deviceId}`;
      console.log(`🔍 Fetching device details from: ${url}`);

      const response = await fetch(url);

      if (!response.ok) {
        console.error(
          `❌ HTTP error! status: ${response.status} for URL: ${url}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Device details fetched:", data);
      console.log("🌐 IP address in fetched data:", data.ip);

      // IMPORTANT: Stocker les détails complets avec l'IP
      setDeviceDetails((prev) => ({
        ...prev,
        [deviceId]: data,
      }));

      return data;
    } catch (error) {
      console.error("❌ Error fetching device details:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    const savedDevices = localStorage.getItem(`devices_${planId}`);
    if (savedDevices) {
      const parsedDevices = JSON.parse(savedDevices);
      setDevices(parsedDevices);

      // IMPORTANT: Toujours recharger les détails depuis l'API, ne pas utiliser les détails sauvegardés
      parsedDevices.forEach((device) => {
        if (device.databaseId) {
          console.log(`🔄 Reloading details for device ${device.databaseId}`);
          fetchDeviceDetails(device.databaseId, device.type);
        }
      });
    } else if (initialDevices) {
      setDevices(initialDevices);
      initialDevices.forEach((device) => {
        fetchDeviceDetails(device.databaseId, device.type);
      });
    }
  }, [planId, initialDevices, fetchDeviceDetails]);

  const fetchDevicesFromDatabase = useCallback(
    async (table, deviceTypeConfig) => {
      try {
        let url;

        // Utiliser la route spécifique pour filtrer par type
        if (deviceTypeConfig && deviceTypeConfig.dbType) {
          url = `${API_BASE_URL}/${table}/type/${encodeURIComponent(
            deviceTypeConfig.dbType
          )}`;

          // Ajouter la recherche si nécessaire
          if (searchTerm) {
            url += `?search=${encodeURIComponent(searchTerm)}`;
          }
        } else {
          // Route générale sans filtre de type
          url = `${API_BASE_URL}/${table}`;

          if (searchTerm) {
            url += `?search=${encodeURIComponent(searchTerm)}`;
          }
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Database devices fetched:", data);

        // Récupérer les appareils déjà positionnés
        const positionedDeviceIds = await fetchPositionedDevices();
        console.log("📍 Already positioned device IDs:", positionedDeviceIds);

        // Filtrer les appareils déjà positionnés
        const availableDevices = data.filter((device) => {
          const deviceId = device.id_eqts || device.ID || device.id;
          return !positionedDeviceIds.includes(deviceId);
        });

        console.log("✅ Available devices (not positioned):", availableDevices);

        const devicesWithIds = availableDevices.map((device) => ({
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
    [searchTerm, fetchPositionedDevices]
  );

  const fetchDevicesOfSameType = useCallback(
    async (deviceType) => {
      const type = deviceTypes.find((t) => t.id === deviceType);
      if (!type) return;

      try {
        let url = `${API_BASE_URL}/${type.table}/type/${encodeURIComponent(
          type.dbType
        )}`;

        // Ajouter la recherche si nécessaire
        if (searchTerm) {
          url += `?search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Devices of same type fetched:", data);

        // Récupérer les appareils déjà positionnés
        const positionedDeviceIds = await fetchPositionedDevices();

        // Filtrer les appareils déjà positionnés
        const availableDevices = data.filter((device) => {
          const deviceId = device.id_eqts || device.ID || device.id;
          return !positionedDeviceIds.includes(deviceId);
        });

        const devicesWithIds = availableDevices.map((device) => ({
          ...device,
          uniqueId: `${type.table}-${
            device.id || device.ID || Date.now()
          }-${Math.random().toString(36).substr(2, 9)}`,
        }));
        setDatabaseDevices(devicesWithIds);
        setError(null);
      } catch (error) {
        console.error("Error fetching devices of same type:", error);
        setDatabaseDevices([]);
        setError(error.message);
      }
    },
    [searchTerm, fetchPositionedDevices]
  );

  useEffect(() => {
    if (selectedType) {
      fetchDevicesFromDatabase(selectedType.table, selectedType);
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

  const handleValidateDevice = async () => {
    if (selectedDevice) {
      const deviceData = databaseDevices.find(
        (d) => d.uniqueId === selectedDevice.uniqueId
      );
      console.log("📋 Device data being saved:", deviceData);

      // Vérifier que nous avons un ID valide
      const databaseId = deviceData.id_eqts || deviceData.ID || deviceData.id;

      if (!databaseId) {
        console.error(
          "❌ No valid database ID found in device data:",
          deviceData
        );
        setError("Erreur: ID de l'appareil introuvable");
        return;
      }

      console.log("✅ Using database ID:", databaseId);

      // IMPORTANT: Récupérer les détails complets depuis l'API avant de sauvegarder
      try {
        await fetchDeviceDetails(databaseId, selectedType.id);

        const newDevice = {
          id: `${planId}-${selectedType.id}-${Date.now()}`,
          type: selectedType.id,
          databaseId: databaseId,
          // Ne pas sauvegarder les détails dans localStorage, les recharger à chaque fois
          x: 50,
          y: 50,
        };

        console.log("💾 New device created:", newDevice);

        setDevices((prevDevices) => {
          const updatedDevices = [...prevDevices, newDevice];
          // Sauvegarder sans les détails pour forcer le rechargement
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
      } catch (error) {
        console.error("❌ Error fetching device details:", error);
        setError("Erreur lors du chargement des détails de l'appareil");
      }
    }
  };

  const handleSavePositions = useCallback(() => {
    console.log("💾 Saving positions:", devices);

    // Sauvegarder dans localStorage SANS les détails
    const devicesForStorage = devices.map((device) => {
      const newDevice = { ...device };
      delete newDevice.details;
      return newDevice;
    });
    localStorage.setItem(
      `devices_${planId}`,
      JSON.stringify(devicesForStorage)
    );

    setConfirmationMessage(
      `Positions des appareils sauvegardées pour le plan ${planId}`
    );

    setTimeout(() => {
      setConfirmationMessage("");
    }, 3000);
  }, [devices, planId]);

  const handleConfirmPlacements = useCallback(async () => {
    console.log("✅ Confirming placements...");

    // Enregistrer l'appareil comme positionné dans la base de données
    if (deviceBeingEdited) {
      await saveDevicePosition(deviceBeingEdited.databaseId);
    } else if (devices.length > 0) {
      const lastDevice = devices[devices.length - 1];
      await saveDevicePosition(lastDevice.databaseId);
    }

    setIsPlacingDevice(false);
    setDeviceBeingEdited(null);
    handleSavePositions();
  }, [handleSavePositions, deviceBeingEdited, devices, saveDevicePosition]);

  const handleMouseMove = useCallback(
    (e) => {
      if (draggedDeviceRef.current && !isDeleteModalOpen) {
        const mapRect = mapContainerRef.current.getBoundingClientRect();
        const planWidth = mapRect.width;
        const planHeight = mapRect.height;

        const newX = ((e.clientX - mapRect.left) / planWidth) * 100;
        const newY = ((e.clientY - mapRect.top) / planHeight) * 100;

        draggedDeviceRef.current.x = newX;
        draggedDeviceRef.current.y = newY;

        const deviceElement = document.getElementById(
          draggedDeviceRef.current.id
        );
        if (deviceElement) {
          deviceElement.style.left = `${draggedDeviceRef.current.x}%`;
          deviceElement.style.top = `${draggedDeviceRef.current.y}%`;
        }
      }
    },
    [isDeleteModalOpen]
  );

  const handleMouseUp = useCallback(() => {
    if (draggedDeviceRef.current) {
      const { id, x, y } = draggedDeviceRef.current;

      setDevices((prevDevices) => {
        const updatedDevices = prevDevices.map((d) =>
          d.id === id ? { ...d, x, y } : d
        );

        // Sauvegarder sans les détails
        const devicesForStorage = updatedDevices.map((device) => {
          const newDevice = { ...device };
          delete newDevice.details;
          return newDevice;
        });
        localStorage.setItem(
          `devices_${planId}`,
          JSON.stringify(devicesForStorage)
        );

        return updatedDevices;
      });
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    draggedDeviceRef.current = null;
  }, [handleMouseMove, planId]);

  const handleMouseDown = useCallback(
    (e, device) => {
      if (
        isPlacingDevice &&
        (deviceBeingEdited
          ? device.id === deviceBeingEdited.id
          : device.id === devices[devices.length - 1].id)
      ) {
        e.preventDefault();
        const mapRect = mapContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - mapRect.left) / mapRect.width) * 100;
        const y = ((e.clientY - mapRect.top) / mapRect.height) * 100;

        draggedDeviceRef.current = {
          ...device,
          startX: x,
          startY: y,
          originalX: device.x,
          originalY: device.y,
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }
    },
    [
      isPlacingDevice,
      devices,
      handleMouseMove,
      handleMouseUp,
      deviceBeingEdited,
    ]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleResize = () => {
      setDevices((prevDevices) => [...prevDevices]);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (editMode === "info") {
      fetchDevicesOfSameType(selectedEditDevice.type);
    } else {
      fetchDevicesFromDatabase(selectedType?.table, selectedType);
    }
  };

  const handleDeleteDevice = useCallback(
    async (deviceId) => {
      // Trouver l'appareil à supprimer pour récupérer son databaseId
      const deviceToDelete = devices.find((device) => device.id === deviceId);

      setDevices((prevDevices) => {
        const updatedDevices = prevDevices.filter(
          (device) => device.id !== deviceId
        );

        // Sauvegarder sans les détails
        const devicesForStorage = updatedDevices.map((device) => {
          const newDevice = { ...device };
          delete newDevice.details;
          return newDevice;
        });
        localStorage.setItem(
          `devices_${planId}`,
          JSON.stringify(devicesForStorage)
        );

        setTimeout(() => {
          if (onSaveDevices) {
            onSaveDevices(updatedDevices);
          }
        }, 0);

        return updatedDevices;
      });

      // Libérer l'appareil dans la table positionne
      if (deviceToDelete && deviceToDelete.databaseId) {
        await removeDevicePosition(deviceToDelete.databaseId);
      }

      setIsDeleteModalOpen(false);
      setConfirmationMessage(`Appareil supprimé du plan ${planId}`);

      setTimeout(() => {
        setConfirmationMessage("");
      }, 3000);
    },
    [planId, onSaveDevices, devices, removeDevicePosition]
  );

  const filteredDevices = databaseDevices.filter((device) =>
    (device.nom || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDeviceTooltip = (device, details) => {
    console.log("🏷️ Rendering tooltip for device:", device.id);
    console.log("📋 Device details passed to tooltip:", details);
    console.log("🌐 IP in details:", details.ip);

    let tooltipContent;
    let name;
    switch (device.type) {
      case "pcPortable":
      case "pcFixe":
        name = details.nom;
        tooltipContent = (
          <>
            <h3>Détails du PC :</h3>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom du PC :</span>
                <span className={styles.value}>{details.nom || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Numéro de Série :</span>
                <span className={styles.value}>{details.sn || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>IP :</span>
                <span className={styles.value}>{details.ip || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Prise :</span>
                <span className={styles.value}>{details.prise || "N/A"}</span>
              </div>
            </div>
          </>
        );
        break;
      case "imprimanteCopieur":
        name = details.nom;
        tooltipContent = (
          <>
            <h3>Détail de l&apos;imprimante :</h3>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom IMP Serveur :</span>
                <span className={styles.value}>{details.nom || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Modèle :</span>
                <span className={styles.value}>{details.model || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Adresse IP :</span>
                <span className={styles.value}>{details.ip || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Numéro de Serie :</span>
                <span className={styles.value}>{details.sn || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom Infolog :</span>
                <span className={styles.value}>
                  {details.nom_infolog || "N/A"}
                </span>
              </div>
            </div>
          </>
        );
        break;
      case "imprimanteSupport":
        name = details.nom;
        tooltipContent = (
          <>
            <h3>Détail de l&apos;imprimante support :</h3>
            <div className={styles.tooltipContent}>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Nom de l&apos;imprimante :</span>
                <span className={styles.value}>{details.nom || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Adresse IP :</span>
                <span className={styles.value}>{details.ip || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Numéro de Serie :</span>
                <span className={styles.value}>{details.sn || "N/A"}</span>
              </div>
              <div className={styles.tooltipRow}>
                <span className={styles.label}>Modèle :</span>
                <span className={styles.value}>{details.model || "N/A"}</span>
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

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setSelectedEditDevice(null);
    setEditMode(null);
    setIsEditModalReady(false);

    // Recharger tous les détails
    Promise.all(
      devices.map((device) =>
        fetchDeviceDetails(device.databaseId, device.type)
      )
    ).then(() => {
      setIsEditModalReady(true);
    });
  };

  const handleEditOptionSelect = (mode) => {
    setEditMode(mode);
    if (mode === "position") {
      setIsEditModalOpen(false);
      setIsPlacingDevice(true);
      setDeviceBeingEdited(selectedEditDevice);
    } else if (mode === "info") {
      fetchDevicesOfSameType(selectedEditDevice.type);
    }
  };

  const handleDeviceInfoUpdate = (device) => {
    setNewDeviceInfo(device);
    setShowConfirmation(true);
  };

  const confirmDeviceUpdate = async () => {
    const newDatabaseId =
      newDeviceInfo.id_eqts || newDeviceInfo.ID || newDeviceInfo.id;
    const oldDatabaseId = selectedEditDevice.databaseId;

    setDevices((prevDevices) =>
      prevDevices.map((d) =>
        d.id === selectedEditDevice.id
          ? {
              ...d,
              databaseId: newDatabaseId,
            }
          : d
      )
    );

    // Libérer l'ancien appareil et enregistrer le nouveau
    await removeDevicePosition(oldDatabaseId);
    await saveDevicePosition(newDatabaseId);

    // Recharger les détails pour le nouvel appareil
    fetchDeviceDetails(newDatabaseId, selectedEditDevice.type);

    setShowConfirmation(false);
    setIsEditModalOpen(false);
    setSelectedEditDevice(null);
    setNewDeviceInfo(null);
    setEditMode(null);
  };

  return (
    <div className={styles.deviceManager}>
      <div className={styles.controlPanel}>
        <button onClick={handleEditClick} className={styles.editButton}>
          Modifier un appareil
        </button>
        <button
          onClick={isPlacingDevice ? handleConfirmPlacements : addDevice}
          className={isPlacingDevice ? styles.confirmButton : styles.addButton}
        >
          {isPlacingDevice ? "Confirmer l'emplacement" : "Ajouter un appareil"}
        </button>
        <button onClick={openDeleteModal} className={styles.deleteButton}>
          Supprimer un appareil
        </button>
      </div>

      <div
        ref={mapContainerRef}
        className={styles.mapContainer}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
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
                left: `${device.x}%`,
                top: `${device.y}%`,
                transform: "translate(-50%, -50%)",
                cursor:
                  isPlacingDevice &&
                  (deviceBeingEdited
                    ? device.id === deviceBeingEdited.id
                    : device.id === devices[devices.length - 1].id)
                    ? "grab"
                    : "default",
                transition: "none",
                width: "5%",
                height: "auto",
                maxWidth: "30px",
                maxHeight: "30px",
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
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
              <div className={styles.tooltip}>
                {renderDeviceTooltip(device, details).tooltipContent}
              </div>
            </div>
          );
        })}
      </div>

      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Modifier un appareil</h2>

            {isEditModalReady ? (
              !selectedEditDevice ? (
                <>
                  <input
                    type="text"
                    placeholder="Rechercher le matériel dans la liste ci-dessous..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                  />
                  <div className={styles.deviceListContainer}>
                    <div className={styles.deviceList}>
                      {devices.map((device) => {
                        const details = deviceDetails[device.databaseId] || {};
                        const deviceType = deviceTypes.find(
                          (t) => t.id === device.type
                        );
                        return (
                          <button
                            key={device.id}
                            onClick={() => setSelectedEditDevice(device)}
                            className={styles.deviceButton}
                          >
                            {deviceType.name} - {details.nom || "Inconnu"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : !editMode ? (
                <div className={styles.editOptions}>
                  <button
                    className={styles.editOptionButton}
                    onClick={() => handleEditOptionSelect("position")}
                  >
                    Modifier l&apos;emplacement
                  </button>
                  <button
                    className={styles.editOptionButton}
                    onClick={() => handleEditOptionSelect("info")}
                  >
                    Modifier les informations
                  </button>
                </div>
              ) : editMode === "info" ? (
                <>
                  <input
                    type="text"
                    placeholder="Rechercher le matériel dans la liste ci-dessous..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                  />
                  <div className={styles.deviceListContainer}>
                    <div className={styles.deviceList}>
                      {databaseDevices.map((device) => (
                        <button
                          key={device.uniqueId}
                          onClick={() => handleDeviceInfoUpdate(device)}
                          className={styles.deviceButton}
                        >
                          {device.nom}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null
            ) : (
              <div className={styles.loading}>Chargement des appareils...</div>
            )}

            <div className={styles.modalButtons}>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedEditDevice(null);
                  setEditMode(null);
                  setIsEditModalReady(false);
                }}
                className={styles.closeButton}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className={styles.modal}>
          <div className={styles.confirmationDialog}>
            <h3>Confirmer le remplacement</h3>
            <p>
              Voulez-vous remplacer{" "}
              {deviceDetails[selectedEditDevice.databaseId]?.nom ||
                "cet appareil"}{" "}
              par {newDeviceInfo?.nom || "le nouvel appareil"} ?
            </p>
            <div className={styles.confirmationButtons}>
              <button onClick={confirmDeviceUpdate} className="confirm">
                Confirmer
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setNewDeviceInfo(null);
                }}
                className="cancel"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

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
              placeholder="Rechercher le matériel dans la liste ci-dessous..."
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
                      {device.nom}
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
                const deviceType = deviceTypes.find(
                  (t) => t.id === device.type
                );
                return (
                  <button
                    key={device.id}
                    onClick={() => handleDeleteDevice(device.id)}
                    className={styles.deviceButton}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {deviceType.name} - {details.nom || "Nom inconnu"}
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
