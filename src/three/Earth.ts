import * as THREE from 'three';
import { tween } from 'popmotion';

class Earth {
  group: THREE.Group = new THREE.Group();

  init(obj: THREE.Group, texture: THREE.Texture) {
    obj.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({ map: texture });
      }
    });

    this.group = obj;
  }
}

export default Earth;