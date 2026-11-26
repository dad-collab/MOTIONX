export const orbVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform float uLens;
  varying vec3 vWorld;
  varying float vRidge;
  void main() {
    vec3 p = position;
    float slow = uTime * 0.16;
    float wave = sin(p.x * 4.2 + p.y * 3.1 + slow) * cos(p.z * 5.0 - p.y * 2.2 - slow * 0.7);
    float fineWave = sin(p.y * 11.0 + p.z * 7.0 + slow * 1.4) * 0.018;
    float lens = exp(-distance(p.xy, uPointer * 0.92) * 5.5) * uLens;
    float displacement = wave * 0.038 + fineWave + lens * 0.12;
    p += normalize(position) * displacement;
    float reveal = smoothstep(0.0, 1.0, uIntro);
    p *= mix(0.78, 1.0, reveal) * (1.0 - uScroll * 0.22);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vWorld = world.xyz;
    vRidge = wave * 0.5 + 0.5;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const orbFragmentShader = /* glsl */ `
  uniform vec3 uSignal;
  uniform vec3 uBone;
  uniform vec2 uPointer;
  uniform float uLens;
  uniform float uIntro;
  uniform float uScroll;
  varying vec3 vWorld;
  varying float vRidge;
  void main() {
    float radial = length(vWorld.xy - uPointer * 0.3);
    float lensGlow = exp(-radial * 3.0) * uLens;
    float contour = smoothstep(0.12, 0.9, vRidge);
    vec3 color = mix(uBone, uSignal, contour * 0.82 + lensGlow * 0.45);
    float alpha = (0.32 + contour * 0.55 + lensGlow * 0.42) * uIntro * (1.0 - uScroll);
    gl_FragColor = vec4(color, alpha);
  }
`;

export const coreVertexShader = /* glsl */ `
  uniform float uIntro;
  uniform float uScroll;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 p = position * (0.985 * uIntro * (1.0 - uScroll * 0.3));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

export const coreFragmentShader = /* glsl */ `
  uniform vec3 uVoid;
  varying vec3 vNormal;
  void main() {
    float edge = pow(1.0 - abs(vNormal.z), 3.0);
    gl_FragColor = vec4(mix(uVoid, vec3(0.035, 0.04, 0.055), edge), 1.0);
  }
`;

export const dustVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uScroll;
  attribute float aSize;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.18 + p.x * 2.0) * 0.018;
    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (260.0 / -viewPosition.z);
    gl_Position = projectionMatrix * viewPosition;
    vAlpha = (0.15 + 0.3 * sin(uTime * 0.3 + p.z * 4.0)) * uIntro * (1.0 - uScroll);
  }
`;

export const dustFragmentShader = /* glsl */ `
  uniform vec3 uSignal;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = (1.0 - smoothstep(0.08, 0.5, d)) * vAlpha;
    gl_FragColor = vec4(uSignal, alpha);
  }
`;
