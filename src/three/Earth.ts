import { Group, Texture, RepeatWrapping, ShaderMaterial, Mesh } from "three";

class Earth {
  obj: Mesh | null = null;

  init(fbx: Group, albedoMap: Texture, altitudeMap: Texture) {
    albedoMap.wrapS = albedoMap.wrapT = RepeatWrapping;

    const uniforms = {
      sealevel: { type: 'float', value: 0 },
      texture1: { type: 't', value: albedoMap },
      texture2: { type: 't', value: altitudeMap }
    };

    const material = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `
        varying vec2 vUv;
        attribute vec2 uv2;
        varying vec2 vUv2;
    
        void main() {
          vUv = uv;
          vUv2 = uv2;
    
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition; 
        }
      `,
      fragmentShader: `
        uniform float sealevel; 
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 vUv;
        varying vec2 vUv2;

        float AAStep(float step, float aasize, float inn) {
          float a = step + aasize;
          float b = step - aasize;
          return smoothstep(b, a, inn);
        }

        void main() {
          vec2 albedoAdjustedUv = vec2(vUv.x + 0.25, vUv.y);
          vec4 albedoMap = texture2D(texture1, albedoAdjustedUv);
          vec4 altitudeMap = texture2D(texture2, vUv2);

          float magic1 = -0.2907895;
          float magic2 = 0.10625;
          float magic3 = 0.03947369;
          float magic4 = -0.006578933;

          // min 0.2, max 0.95
          float important = sealevel;

          altitudeMap = saturate(altitudeMap - 0.35);

          float AAStep1 = AAStep(magic2, magic1, altitudeMap.r);
          float AAStep2 = AAStep(magic2, magic3, altitudeMap.r);
          float AAStep3 = AAStep(important, magic4, altitudeMap.r);

          float pow1 = pow(AAStep1, 0.4671053);
          float mult1 = AAStep2 * AAStep3;

          vec4 red = vec4(1.0, 0.0, 0.0, 0.8);
          vec4 orange = vec4(1.0, 0.5, 0.0, 0.8);
          vec4 mix1 = mix(red, orange, 1.0);

          float mult2 = 0.9144737 * mix1.a;
          vec4 mix2 = mix(albedoMap, mix1, mult2);
          vec4 mix3 = mix(albedoMap, mix2, mult1);

          gl_FragColor = mix3;
        }
      `
    });

    fbx.traverse(child => {
      if (child instanceof Mesh) {
        child.scale.set(1, 1, 1);
        child.material = material;
        this.obj = child;
      }
    });
  }

  changeSeaLevel(level: number) {
    if (!this.obj) return;
    // @ts-ignore
    this.obj.material.uniforms.sealevel.value = level;
  }
}

export default Earth;