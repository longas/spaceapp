import React, { useState, useEffect } from 'react';
import styles from './Map.module.css';

interface MapProps {
  changeSeaLevel: (level: number) => void;
  toggleAutoRotation: (active: boolean) => void;
}

const Map: React.FC<MapProps> = ({ changeSeaLevel, toggleAutoRotation }) => {
  const [seaLevel, setSeaLevel] = useState(0);
  const [autoRotation, setAutoRotation] = useState(true);

  const onAltitudeChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const level = Number(ev.target.value);
    setSeaLevel(level);
    changeSeaLevel(level / 110);
  };

  const autoRotationChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setAutoRotation(ev.currentTarget.checked);
    toggleAutoRotation(ev.currentTarget.checked);
  };

  return (
    <div className={styles.slider}>
      <input type="range" min="0" max="70" value={seaLevel} onChange={onAltitudeChanged} />
      <input type="checkbox" checked={autoRotation} onChange={autoRotationChanged} />
    </div>
  );
};

export default Map;