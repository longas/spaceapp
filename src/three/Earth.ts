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
        varying vec3 vViewNormal;

        void main() {
          vUv = uv;
          vUv2 = uv2;

          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);

          vec4 worldPosition = modelMatrix * vec4(position, 1.0 );

          // vWorldNormal = normalize(mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal);
          vViewNormal = normalize(mat3(modelViewMatrix[0].xyz, modelViewMatrix[1].xyz, modelViewMatrix[2].xyz) * normal);

          gl_Position = projectionMatrix * modelViewPosition;
        }
      `,
      fragmentShader: `
        uniform float sealevel;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 vUv;
        varying vec2 vUv2;
        varying vec3 vViewNormal;

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

            // Diagonal Stripes
            float u = vUv.y;

            u = abs(0.5 - mod(u * 500.0, 1.0));
            u = smoothstep(0.1, 0.4, u);
            vec4 orange = vec4(1.0, 0.5, 0.0, 1);
            orange *= saturate(1.0 - (u * 0.35));
            float mult2 = 0.9144737 * 0.8;

            vec4 mix2 = mix(albedoMap, orange, mult2);
            vec4 mix3 = mix(albedoMap, mix2, mult1);
            vec4 c = mix3;

            // Fresnel
            vec3 viewNormal = normalize(vViewNormal);
            float fresnel = dot(vec3(0, 0, 1), viewNormal);

            // Fresnel Fog
            vec4 fogColor = vec4(0.3, 0.48, 1.0, 1.0);
            float fogMask = smoothstep(0.0, 1.23, fresnel);

            c = mix(mix(c, fogColor, 0.2), c, pow(fogMask, 4.0));
            c = mix(mix(c, fogColor, 0.9), c, pow(fogMask, 0.3));

            // Shadows
            vec3 viewNormals;
            vec3 lightDir = normalize(vec3(0.52, 0.3, 1.0));

            float shadowFresnel = dot(vViewNormal, lightDir) * 0.5 + 0.5;
            shadowFresnel = smoothstep(0.42, 0.93, shadowFresnel);

            c *= shadowFresnel;

            // Fresnel Shadow
            c.rgb *= smoothstep(0.1, 0.3, fresnel);
            c.a = 1.0;


            gl_FragColor = c;
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
