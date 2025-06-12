import { useState, useEffect, useCallback } from "react";
import DeviceManager from "./DeviceManager";

function DeviceManagerWrapper({ planId }) {
  const [savedDevices, setSavedDevices] = useState([]);

  useEffect(() => {
    const storedDevices = localStorage.getItem(`devices_${planId}`);
    if (storedDevices) {
      setSavedDevices(JSON.parse(storedDevices));
    }
  }, [planId]);

  const handleSaveDevices = useCallback(
    (devices) => {
      localStorage.setItem(`devices_${planId}`, JSON.stringify(devices));
      setSavedDevices(devices);
    },
    [planId]
  );

  return (
    <DeviceManager
      onSaveDevices={handleSaveDevices}
      initialDevices={savedDevices}
      planId={planId}
    />
  );
}

export default DeviceManagerWrapper;
