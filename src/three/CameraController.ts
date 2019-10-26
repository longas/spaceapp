import { Camera, Mesh, Math } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { tween } from "popmotion";
import { easeInOut } from "@popmotion/easing";

class CameraController {
  root: HTMLDivElement;
  camera: Camera;
  controls: OrbitControls | null = null;
  mouseDownCb: Function = () => {};

  constructor(camera: Camera, root: HTMLDivElement) {
    this.camera = camera;
    this.root = root;
  }

  changeToOrbit() {
    this.controls = this.createCameraControls(this.camera, this.root);
  }

  centerCamera(earth: Mesh) {
    const startEarthRotation = earth.rotation.clone();

    tween({
      from: startEarthRotation.z,
      to: startEarthRotation.z + Math.degToRad(50),
      duration: 500,
      ease: easeInOut
    }).start({
      update: (rotation: number) => (earth.rotation.z = rotation),
      complete: () => this.changeToOrbit()
    });

    const startCameraPos = this.camera.position.clone();

    tween({
      from: startCameraPos.toArray(),
      to: [0, 0, 8],
      duration: 500,
      ease: easeInOut
    }).start({
      update: (v: [number, number, number]) => this.camera.position.set(...v),
      complete: () => this.changeToOrbit()
    });
  }

  toggleAutoRotation(active: boolean) {
    this.controls!.autoRotate = active;
  }

  createCameraControls(camera: Camera, root: HTMLDivElement) {
    const controls = new OrbitControls(camera, root);
    controls.rotateSpeed = 0.3;
    controls.minDistance = 2.5;
    controls.maxDistance = 8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;

    const onInteracted = () => {
      this.toggleAutoRotation(false);
      this.mouseDownCb();
    };

    controls.domElement.addEventListener("mousedown", onInteracted);
    controls.domElement.addEventListener("touchstart", onInteracted);

    return controls;
  }
}

export default CameraController;
