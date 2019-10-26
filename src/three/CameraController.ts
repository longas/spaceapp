import { Camera, Mesh } from "three";
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
    const startPos = this.camera.position.clone();

    tween({
      from: startPos.toArray(),
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
    controls.minDistance = 2.5;
    controls.maxDistance = 8;
    controls.autoRotate = true;
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
