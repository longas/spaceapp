import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Home.module.css';

interface HomeProps {
  centerEarth: Function;
}

const Home: React.FC<HomeProps> = ({ centerEarth }) => {
  const history = useHistory();

  return (
    <div className={styles.homePage}>
      <h1>Rising Water</h1>
      <p>
        Approximately 40% of the entire human population lives in coastal areas, and eight of the ten largest cities in the world are located on the coast. As sea level continues to rise, these coastal areas will face increasingly severe impacts from hurricanes, storm surge, and flooding in general, affecting billions of people.
      </p>
      <button onClick={() => {
        centerEarth();
        history.push('/map');
      }}>Explore</button>
    </div>
  );
};

export default Home;