import React, { useState, useEffect } from "react";
import styles from "./Map.module.css";
import CameraController from "../three/CameraController";

interface MapProps {
  changeSeaLevel: (level: number) => void;
  getCameraController: () => CameraController;
}

const Map: React.FC<MapProps> = ({ changeSeaLevel, getCameraController }) => {
  const [seaLevel, setSeaLevel] = useState(0);
  const [autoRotation, setAutoRotation] = useState(true);

  useEffect(() => {
    getCameraController().mouseDownCb = () => {
      setAutoRotation(false);
    };
  }, [getCameraController]);

  const onAltitudeChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(ev.target.value);
    setSeaLevel(level);
    // HACK
    changeSeaLevel(level / 110);
  };

  const autoRotationChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAutoRotation(ev.currentTarget.checked);
    getCameraController().toggleAutoRotation(ev.currentTarget.checked);
  };

  return (
    <div className={styles.controls}>
      <label className={styles.seaLevelLabel} htmlFor="seaslider">
        Sea level (0 - 70m): {seaLevel}m
      </label>
      <input
        className={styles.seaSlider}
        id="seaslider"
        type="range"
        min="0"
        max="70"
        value={seaLevel}
        onChange={onAltitudeChanged}
      />

      <label className={styles.autoRotationLabel} htmlFor="autorotation">
        Auto Rotation
      </label>
      <input
        className={styles.autoRotation}
        id="autorotation"
        type="checkbox"
        checked={autoRotation}
        onChange={autoRotationChanged}
      />
    </div>
  );
};

export default Map;
