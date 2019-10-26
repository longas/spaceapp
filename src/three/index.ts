import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  TextureLoader
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import CameraController from "./CameraController";
import Earth from "./Earth";

import earthFbx from "../assets/models/ggsphere.fbx";
import earthAlbedoMap from "../assets/textures/earth_albedo.jpg";
import earthAltitudeMap from "../assets/textures/earth_altitude.png";

class ThreeController {
  root: HTMLDivElement;
  scene = new Scene();
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  clock = new Clock();
  textureLoader = new TextureLoader();
  fbxLoader = new FBXLoader();
  cameraController: CameraController;
  earth: Earth = new Earth();

  earthAutoRotating = true;

  constructor(root: HTMLDivElement, loadedCb: Function) {
    this.root = root;
    this.camera = this.createCamera();
    this.cameraController = new CameraController(this.camera, this.root);
    this.renderer = this.createRenderer();
    this.root.appendChild(this.renderer.domElement);

    this.initEarth(loadedCb);
    this.animate();

    window.addEventListener("resize", this.handleWindowResize);
  }

  initEarth(loadedCb: Function) {
    const albedoMap = this.textureLoader.load(earthAlbedoMap);
    const altitudeMap = this.textureLoader.load(earthAltitudeMap);
    this.fbxLoader.load(earthFbx, fbx => {
      this.earth.init(fbx, albedoMap, altitudeMap);
      this.scene.add(fbx);
      loadedCb();
    });
  }

  transitionToMap() {
    this.earthAutoRotating = false;
    this.cameraController.centerCamera(this.earth.obj!);
  }

  changeSeaLevel(level: number) {
    this.earth.changeSeaLevel(level);
  }

  toggleAutoRotation(active: boolean) {
    this.cameraController.toggleAutoRotation(active);
  }

  createCamera() {
    const camera = new PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-0.75, 0.3, 5);
    return camera;
  }

  createRenderer() {
    const renderer = new WebGLRenderer({ alpha: true });
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
        this.earth.obj.rotation.z += 0.0005;
      }

      if (this.cameraController.controls) {
        this.cameraController.controls.update();
      }

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
