import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import ThreeController from './three';
import styles from './App.module.css';
import upArrowLogo from './assets/images/uparrow.png';

const App: React.FC = () => {
  const threeCtrl = useRef<ThreeController>();
  const threeRoot = useRef<HTMLDivElement>(null);
  const [inMap, setInMap] = useState(false);

  useEffect(() => {
    if (threeRoot.current && !threeCtrl.current) {
      threeCtrl.current = new ThreeController(threeRoot.current);
    }
  }, [threeRoot.current]);

  const transitionToMap = () => {
    threeCtrl.current!.transitionToMap();
    setInMap(true);
  };

  return (
    <>
      <div className={styles.threeRoot} ref={threeRoot}></div>
      <div className={`${styles.wrapper} ${inMap ? styles.noEvents : ''}`}>
        <div className={styles.header}>
          {inMap && <h1>Rising Water</h1>}
        </div>
        <div className={styles.content}>
          <Router>
            <Switch>
              <Route path="/map">
                <Map
                  changeSeaLevel={(level: number) => threeCtrl.current!.changeSeaLevel(level)}
                  toggleAutoRotation={(active: boolean) => threeCtrl.current!.toggleAutoRotation(active)} />
              </Route>
              <Route path="/">
                <Home centerEarth={transitionToMap} />
              </Route>
            </Switch>
          </Router>
        </div>
        <div className={styles.footer}>
          <a href="https://uparrowstudio.com/">
            <img className={styles.uparrow} src={upArrowLogo} alt="UpArrow" />
          </a>

          <a href="https://www.spaceappschallenge.org/">
            <svg className={styles.spaceapps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 209.88 83.76">
              <path fill="#FFF" d="M92.87 56v-1.22a3.18 3.18 0 00-.16-.86 2.51 2.51 0 00-.32-.66 7.13 7.13 0 00-.48-.65c-.4-.48-.8-.93-1.2-1.34s-.82-.83-1.24-1.24-.85-.85-1.29-1.32-.9-1-1.38-1.57a3.62 3.62 0 01-.94-1.9 16.05 16.05 0 01-.14-2.37v-4.96q0-5.43 5.11-5.43c1.84 0 3.13.45 3.88 1.34a6.24 6.24 0 011.12 4.09v6H93v-5.6a4.13 4.13 0 00-.42-2 1.73 1.73 0 00-1.65-.76c-1.42 0-2.12.79-2.12 2.36v4.87a5.53 5.53 0 00.14 1.51 3 3 0 00.58 1 24.79 24.79 0 002.4 2.71 28.61 28.61 0 012.54 2.67 5.35 5.35 0 011.16 2.15 13.11 13.11 0 01.28 3.08v4.71a6.07 6.07 0 01-1.18 4A4.9 4.9 0 0190.79 66a4.91 4.91 0 01-3.89-1.39 5.92 5.92 0 01-1.22-4v-7h2.92v6.55a4.07 4.07 0 00.46 2.07 1.74 1.74 0 001.65.8 2 2 0 001.66-.62 2.77 2.77 0 00.5-1.81zm14.35-17.16a3.24 3.24 0 00-.6-2.18 2.58 2.58 0 00-2-.7h-2.08v11.17h2.12a2.57 2.57 0 002-.68 3.11 3.11 0 00.64-2.2v-5.46zm-7.75 26.84V32.84h5.14a5.68 5.68 0 014.27 1.44 6.32 6.32 0 011.38 4.51v5.38c0 2.08-.45 3.58-1.36 4.51a5.74 5.74 0 01-4.26 1.4h-2.13v15.6zm19.71-8.3q-.53-4.23-1-8.4t-1-8.44q-.52 4.27-1.06 8.44t-1.1 8.4zm1.08 8.3l-.72-5.5h-4.92l-.72 5.5h-3l4.52-32.84H119l4.27 32.84zM133 53.63h2.76v6.79a6.6 6.6 0 01-1.14 4.25 4.51 4.51 0 01-3.69 1.33q-5.24 0-5.24-5.55v-22.3q0-5.67 5.24-5.67 4.8 0 4.8 5.59v5.82H133v-5.78a3.35 3.35 0 00-.45-1.94 1.85 1.85 0 00-1.61-.62c-1.45 0-2.18.86-2.18 2.56v22.35c0 1.73.73 2.59 2.18 2.59a1.86 1.86 0 001.6-.64 3.4 3.4 0 00.46-1.95zm6.31 12.05V32.84H148v3.07h-5.68v11.5h4v3.07h-4v12.21h5.88v3h-8.92zm25.87-8.3q-.53-4.23-1-8.4t-1-8.44q-.53 4.27-1.06 8.44t-1.1 8.4zm1.08 8.3l-.72-5.5h-4.92l-.72 5.5h-3l4.52-32.84H165l4.28 32.84zm13.83-26.89a3.3 3.3 0 00-.6-2.18 2.59 2.59 0 00-2-.7h-2.08v11.22h2.12a2.59 2.59 0 002-.68 3.16 3.16 0 00.64-2.2v-5.46zm-7.79 26.89V32.84h5.14a5.66 5.66 0 014.27 1.44 6.32 6.32 0 011.39 4.51v5.38c0 2.08-.46 3.58-1.37 4.51a5.74 5.74 0 01-4.26 1.4h-2.13v15.6zm21.63-26.89a3.3 3.3 0 00-.6-2.18 2.59 2.59 0 00-2-.7h-2.08v11.22h2.12a2.59 2.59 0 002-.68 3.16 3.16 0 00.64-2.2v-5.46zm-7.76 26.89V32.84h5.14a5.68 5.68 0 014.27 1.44 6.32 6.32 0 011.42 4.51v5.38c0 2.08-.46 3.58-1.37 4.51a5.74 5.74 0 01-4.26 1.4h-2.13v15.6zM206.84 56v-1.22a3.62 3.62 0 00-.16-.86 2.87 2.87 0 00-.32-.66 7.13 7.13 0 00-.48-.65c-.4-.48-.8-.93-1.2-1.34s-.82-.83-1.24-1.24-.87-.87-1.3-1.32-.9-1-1.38-1.57a3.68 3.68 0 01-.93-1.9 16.05 16.05 0 01-.14-2.37v-4.96q0-5.43 5.11-5.43c1.84 0 3.13.45 3.88 1.34a6.24 6.24 0 011.12 4.09v6h-2.84v-5.6a4.13 4.13 0 00-.42-2 1.73 1.73 0 00-1.66-.76c-1.41 0-2.12.79-2.12 2.36v4.87a6 6 0 00.14 1.51 3.34 3.34 0 00.58 1A23.86 23.86 0 00205.9 48a28.61 28.61 0 012.54 2.67 5.35 5.35 0 011.16 2.15 13.11 13.11 0 01.28 3.08v4.71a6.07 6.07 0 01-1.18 4 6.21 6.21 0 01-7.83 0 5.92 5.92 0 01-1.22-4v-7h2.91v6.55a4.17 4.17 0 00.46 2.07 1.76 1.76 0 001.66.8 2 2 0 001.66-.62 2.83 2.83 0 00.5-1.81V56zM60.73 28.86l-.11.15a7.11 7.11 0 01-1 1.07 7.11 7.11 0 01-4.72 1.82 7.07 7.07 0 01-7.07-7.06 6.89 6.89 0 01.36-2.19A7.14 7.14 0 0149.81 20l.19-.2a7.06 7.06 0 0110.73 9.08m4 21a30.81 30.81 0 11-18.2-28.06 8.81 8.81 0 00-.53 3 8.92 8.92 0 008.91 8.9 8.8 8.8 0 004.44-1.19 30.62 30.62 0 015.39 17.37m14.79-29a.81.81 0 00-1.08-.42l-15 6.92a10.18 10.18 0 00.33-1.59h.09l7.73-6.17a.82.82 0 00.1-1.15.8.8 0 00-1.08-.16l-6.85 5.47a8.88 8.88 0 00-2.06-4.68l6.94-6.76a.82.82 0 00-1.1-1.21l-7 6.83A8.88 8.88 0 0056 16l5.42-6.77a.82.82 0 00-1.24-1.07L53.86 16a8.89 8.89 0 00-1.93.45L59 1.16a.82.82 0 00-1.49-.71l-8 17.32a9.28 9.28 0 00-1.1 1c-.13.13-.25.25-.35.37a33.89 33.89 0 1013.69 11.4l.25-.3c.13-.17.25-.35.37-.53L79.12 22a.81.81 0 00.42-1.07" />
              <path fill="#FFF" d="M86.62 21.1a.2.2 0 01.19-.19H88a.2.2 0 01.19.19v6.61a.2.2 0 01-.19.19h-1.2a.2.2 0 01-.19-.19zM93.71 21a.19.19 0 01.19-.18h.25l4 3.83V21.1a.19.19 0 01.19-.19h1.2a.2.2 0 01.19.19v6.72a.19.19 0 01-.19.18h-.16a.29.29 0 01-.13-.05l-4-4v3.73a.19.19 0 01-.19.19h-1.15a.2.2 0 01-.19-.19zM106.15 22.38h-1.43a.19.19 0 01-.19-.19V21.1a.19.19 0 01.19-.19h4.44a.19.19 0 01.19.19v1.09a.19.19 0 01-.19.19h-1.43v5.33a.2.2 0 01-.19.19h-1.2a.2.2 0 01-.19-.19zM114.15 21.1a.19.19 0 01.19-.19h4.14a.19.19 0 01.19.19v1.09a.19.19 0 01-.19.19h-2.77v1.23H118a.2.2 0 01.19.19v1.09a.19.19 0 01-.19.19h-2.28v1.35h2.77a.19.19 0 01.19.19v1.09a.19.19 0 01-.19.19h-4.14a.19.19 0 01-.19-.19zM123.81 21.1a.19.19 0 01.19-.19h3a2.13 2.13 0 01.7 4.16l1.37 2.54a.19.19 0 01-.17.29h-1.33a.18.18 0 01-.16-.09l-1.33-2.65h-.69v2.55a.2.2 0 01-.19.19H124a.19.19 0 01-.19-.19zm3 2.79a.8.8 0 00.76-.8.77.77 0 00-.76-.76h-1.48v1.56zM134.3 21a.19.19 0 01.19-.18h.25l4 3.83V21.1a.19.19 0 01.19-.19h1.2a.2.2 0 01.19.19v6.72a.19.19 0 01-.19.18H140a.29.29 0 01-.13-.05l-4-4v3.73a.19.19 0 01-.19.19h-1.18a.2.2 0 01-.19-.19zM144.94 27.64l3.13-6.72a.2.2 0 01.17-.11h.1a.2.2 0 01.17.11l3.13 6.72a.18.18 0 01-.17.26h-1.11c-.18 0-.26-.06-.35-.25l-.36-.79h-2.72l-.36.8a.37.37 0 01-.36.24h-1.1a.18.18 0 01-.17-.26zm4.11-2.14l-.76-1.65-.75 1.65zM156.8 22.38h-1.43a.19.19 0 01-.19-.19V21.1a.19.19 0 01.19-.19h4.44a.19.19 0 01.19.19v1.09a.19.19 0 01-.19.19h-1.43v5.33a.2.2 0 01-.19.19H157a.2.2 0 01-.19-.19zM164.8 21.1a.2.2 0 01.19-.19h1.2a.2.2 0 01.19.19v6.61a.2.2 0 01-.19.19H165a.2.2 0 01-.19-.19zM175 20.81a3.6 3.6 0 11-3.59 3.6 3.59 3.59 0 013.59-3.6zm0 5.59a2 2 0 10-2-2 2 2 0 002 2zM183.58 21a.19.19 0 01.19-.18h.23l4 3.83V21.1a.19.19 0 01.19-.19h1.2a.2.2 0 01.19.19v6.72a.19.19 0 01-.19.18h-.16a.29.29 0 01-.13-.05l-4-4v3.73a.19.19 0 01-.19.19h-1.19a.2.2 0 01-.19-.19zM194.22 27.64l3.13-6.72a.2.2 0 01.17-.11h.1a.2.2 0 01.17.11l3.13 6.72a.18.18 0 01-.17.26h-1.11c-.18 0-.26-.06-.35-.25l-.36-.79h-2.72l-.36.8a.37.37 0 01-.36.24h-1.1a.18.18 0 01-.17-.26zm4.11-2.14l-.76-1.65-.75 1.65zM205.54 21.1a.19.19 0 01.19-.19h1.19a.2.2 0 01.19.19v5.33h2.38a.19.19 0 01.19.19v1.09a.19.19 0 01-.19.19h-3.76a.19.19 0 01-.19-.19zM91.61 70.81a4.74 4.74 0 013.39 1.3.27.27 0 010 .4l-1.1 1.13a.24.24 0 01-.35 0 2.84 2.84 0 00-1.89-.71 2.87 2.87 0 000 5.73 2.91 2.91 0 001.91-.66.29.29 0 01.37 0L95 79.16a.28.28 0 010 .38 4.85 4.85 0 01-3.41 1.36 5 5 0 110-10.09zM102 71.22a.28.28 0 01.27-.27H104a.27.27 0 01.26.27v3.53h4v-3.53a.27.27 0 01.26-.27h1.67a.28.28 0 01.27.27v9.27a.28.28 0 01-.27.27h-1.67a.27.27 0 01-.26-.27v-3.68h-4v3.68a.27.27 0 01-.26.27h-1.67a.28.28 0 01-.27-.27zM116.88 80.39l4.38-9.39a.29.29 0 01.24-.16h.14a.28.28 0 01.24.16l4.39 9.42a.25.25 0 01-.24.37h-1.56c-.25 0-.36-.09-.49-.35l-.5-1.11h-3.81l-.51 1.12a.52.52 0 01-.5.34h-1.54a.25.25 0 01-.24-.4zm5.76-3l-1.07-2.32-1 2.32zM132.73 71.22A.27.27 0 01133 71h1.67a.28.28 0 01.27.27v7.43h3.33a.26.26 0 01.27.26v1.53a.27.27 0 01-.27.27H133a.27.27 0 01-.26-.27zM145.2 71.22a.27.27 0 01.27-.27h1.67a.27.27 0 01.26.27v7.48h3.34a.26.26 0 01.26.3v1.53a.27.27 0 01-.26.27h-5.27a.27.27 0 01-.27-.27zM157.68 71.22a.27.27 0 01.26-.27h5.8a.27.27 0 01.27.27v1.52a.27.27 0 01-.27.27h-3.88v1.74h3.2a.26.26 0 01.26.26v1.53a.27.27 0 01-.26.27h-3.2v1.89h3.88a.26.26 0 01.26.3v1.53a.27.27 0 01-.27.27h-5.8a.27.27 0 01-.26-.27zM171.19 71.06a.26.26 0 01.26-.25h.35l5.59 5.38v-5a.27.27 0 01.26-.27h1.68a.28.28 0 01.27.27v9.42a.27.27 0 01-.27.26h-.22a.48.48 0 01-.18-.07l-5.54-5.56v5.22a.27.27 0 01-.27.27h-1.66a.28.28 0 01-.27-.27zM191.67 70.83a5.43 5.43 0 013.42 1.31.25.25 0 010 .38L194 73.7a.32.32 0 01-.38 0 2.57 2.57 0 00-1.82-.7 2.81 2.81 0 000 5.62 3.29 3.29 0 001.25-.23v-.81h-.89a.25.25 0 01-.26-.25V76a.26.26 0 01.26-.27H195a.27.27 0 01.25.27v3.77a.32.32 0 01-.12.22 7.06 7.06 0 01-3.47.91 5 5 0 110-10zM202.49 71.22a.27.27 0 01.27-.27h5.8a.27.27 0 01.26.27v1.52a.27.27 0 01-.26.27h-3.89v1.74h3.2a.26.26 0 01.26.26v1.53a.27.27 0 01-.26.27h-3.2v1.89h3.89a.26.26 0 01.26.26v1.53a.27.27 0 01-.26.27h-5.8a.27.27 0 01-.27-.27z" />
              <path fill="#FFF" d="M134.67 7.5a.19.19 0 01.19-.18h.25l4 3.83V7.61a.19.19 0 01.19-.19h1.2a.2.2 0 01.19.19v6.72a.19.19 0 01-.19.18h-.16a.29.29 0 01-.13 0l-4-4v3.73a.19.19 0 01-.19.19h-1.19a.2.2 0 01-.19-.19zM142.11 14.15l3.13-6.72a.2.2 0 01.17-.11h.1a.2.2 0 01.17.11l3.13 6.72a.18.18 0 01-.17.26h-1.11c-.18 0-.26-.06-.35-.25l-.36-.79h-2.72l-.36.8a.37.37 0 01-.36.24h-1.1a.18.18 0 01-.17-.26zm4.11-2.15l-.76-1.65-.76 1.65zM149.83 13.46l.47-.83a.26.26 0 01.34-.06 3 3 0 001.42.55.63.63 0 00.69-.6c0-.42-.35-.74-1-1-.86-.34-1.94-1-1.94-2.21a2.07 2.07 0 012.31-2 3.8 3.8 0 012.14.74.26.26 0 01.06.32l-.51.77c-.07.11-.25.2-.34.13a3.13 3.13 0 00-1.43-.6.58.58 0 00-.63.51c0 .37.3.65 1.09 1s2 .92 2 2.28a2.2 2.2 0 01-2.36 2.07 3.17 3.17 0 01-2.25-.77c-.11-.12-.14-.16-.06-.3zM155.41 14.15l3.13-6.72a.2.2 0 01.17-.11h.1a.2.2 0 01.17.11l3.13 6.72a.18.18 0 01-.17.26h-1.11c-.18 0-.26-.06-.35-.25l-.36-.79h-2.72l-.36.8a.37.37 0 01-.36.24h-1.1a.18.18 0 01-.17-.26zm4.11-2.15l-.76-1.65L158 12z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
