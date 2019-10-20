import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import CameraController from './CameraController';
import Earth from './Earth';

import earthImg from '../assets/earth.jpg';

class ThreeController {
  root: HTMLDivElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock = new THREE.Clock();
  textureLoader = new THREE.TextureLoader();
  fbxLoader = new FBXLoader();
  objLoader = new OBJLoader();
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


    this.objLoader.load('/ggsphere.obj', obj => {
      this.textureLoader.load(earthImg, texture => {
        this.earth.init(obj, texture);
        this.scene.add(this.earth.group);
      });

      this.scene.add(obj);
    });

    this.fbxLoader.load('/ggsphere.fbx', fbx => {


      fbx.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        }
      });
      this.scene.add(fbx);
      return;

      //const sphereMesh = fbx.children[0] as THREE.Mesh;
      const sphereMesh = fbx.children[0];
      this.scene.add(sphereMesh);

      /*this.textureLoader.load(earthImg, texture => {
        this.earth.init(sphereMesh, texture);
        this.scene.add(this.earth.object!);
      });*/
    });

    this.animate();

    window.addEventListener('resize', this.handleWindowResize);
  }

  transitionToMap() {
    this.earthAutoRotating = false;
    this.cameraController.centerCamera();
  }

  createCamera() {
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-0.75, 0.3, 5);
    return camera;
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer();
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

      if (this.earthAutoRotating) {
        this.earth.group.rotation.y += 0.001;
        this.earth.group.rotation.x += 0.0005;
      }

      //this.cameraController.controls.update();
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