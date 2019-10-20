import { Camera, Euler, Quaternion, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { tween } from 'popmotion';
import { easeInOut } from '@popmotion/easing';

class CameraController {
  root: HTMLDivElement;
  camera: THREE.Camera;
  controls: OrbitControls | null = null;

  constructor(camera: Camera, root: HTMLDivElement) {
    this.camera = camera;
    this.root = root;
  }

  changeToOrbit() {
    this.controls = this.createCameraControls(this.camera, this.root);
  }

  centerCamera() {
    const startPos = this.camera.position.clone();

    const anim = tween({
      from: startPos.toArray(),
      to: [0, 0, 8],
      duration: 500,
      ease: easeInOut,
    }).start((v: [number, number, number]) => {
      this.camera.position.set(...v);
    });

    const interval = setInterval(() => {
      // @ts-ignore
      const progress = anim.getProgress();

      if (progress) {
        setTimeout(() => {
          this.changeToOrbit();
        }, 500);
        clearInterval(interval);
      }
    }, 100);
  }

  createCameraControls(camera: Camera, root: HTMLDivElement) {
    const controls = new OrbitControls(camera, root);
    controls.minDistance = 3.5;
    controls.maxDistance = 8;
    controls.autoRotate = true;
    return controls;
  }

  toggleCameraControls(enable: boolean) {
    // this.controls.enabled = enable;
    // this.controls.autoRotate = enable;
  }

  calculatePosition(phi: number, theta: number, radius: number) {
    const x = -((radius) * Math.sin(phi) * Math.cos(theta));
    const z = ((radius) * Math.sin(phi) * Math.sin(theta));
    const y = ((radius) * Math.cos(phi));

    return [x, y, z];
  }

  tween() {
    this.toggleCameraControls(false);

    //
    const lat = 41.6517501;
    const lon = -0.9300004;
    const radius = 3;

    const starQuaternion = this.camera.quaternion.clone();
    // const endPhi = (90 - lat) * (Math.PI / 180);
    // const endTheta = (lon + 180) * (Math.PI / 180);    
    const endPhi = Math.random() * 360;
    const endTheta = Math.random() * 360;
    const endQuaternion = new Quaternion();
    endQuaternion.setFromEuler(new Euler(40, endTheta, 0));

    tween({
      from: [0, 3],
      to: [1, radius],
      duration: 1000
    }).start((v: number[]) => {
      const pos = new Vector3(0, 0, radius);
      pos.applyQuaternion(starQuaternion.slerp(endQuaternion, v[0]));
      this.camera.position.set(pos.x, pos.y, pos.z);
    });
  }
}

export default CameraController;