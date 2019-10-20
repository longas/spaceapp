import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import CameraController from './CameraController';
import Earth from './Earth';

import earthAlbedo from '../assets/textures/earth_albedo.jpg';
import earthAltitude from '../assets/textures/earth_altitude.png';

class ThreeController {
  root: HTMLDivElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock = new THREE.Clock();
  textureLoader = new THREE.TextureLoader();
  objLoader = new OBJLoader();
  fbxLoader = new FBXLoader();
  cameraController: CameraController;
  earth: Earth = new Earth();

  earthAutoRotating = true;

  constructor(root: HTMLDivElement) {
    this.root = root;
    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.cameraController = new CameraController(this.camera, this.root);
    this.renderer = this.createRenderer();
    this.root.appendChild(this.renderer.domElement);

    this.textureLoader.load(earthAlbedo, albedoMap => {
      this.textureLoader.load(earthAltitude, altitudeMap => {
        this.fbxLoader.load('/ggsphere.fbx', fbx => {
          this.earth.init(fbx, albedoMap, altitudeMap);
          this.scene.add(fbx);
        });
      });
    });

    this.animate();

    window.addEventListener('resize', this.handleWindowResize);
  }

  transitionToMap() {
    this.earthAutoRotating = false;
    this.cameraController.centerCamera();
  }

  changeSeaLevel(level: number) {
    this.earth.changeSeaLevel(level);
  }

  toggleAutoRotation(active: boolean) {
    this.cameraController.controls!.autoRotate = active;
  }

  createCamera() {
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-0.75, 0.3, 5);
    return camera;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.root.clientWidth, this.root.clientHeight);
    renderer.setPixelRatio(2);
    renderer.gammaFactor = 2.2;
    renderer.gammaOutput = true;
    renderer.physicallyCorrectLights = true;
    return renderer;
  }

  animate() {
    const animate = () => {
      requestAnimationFrame(animate);

      if (this.earthAutoRotating && this.earth.obj) {
        this.earth.obj.rotation.z += 0.001;
        //this.earth.obj.rotation.x += 0.0005;
      }

      if (this.cameraController.controls) this.cameraController.controls.update();

      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }

  handleWindowResize = () => {
    const width = this.root.clientWidth;
    const height = this.root.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };
}

export default ThreeController;