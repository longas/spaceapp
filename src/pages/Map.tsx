import React, { useState, useEffect } from 'react';
import styles from './Map.module.css';

interface MapProps {
}

const Map: React.FC<MapProps> = () => {
  const [seaLevel, setSeaLevel] = useState(0);

  return (
    <div className={styles.slider}>
      <input type="range" min="0" max="100" value={seaLevel} onChange={e => setSeaLevel(Number(e.target.value))} />
    </div>
  );
};

export default Map;