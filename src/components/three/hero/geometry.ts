import { BufferGeometry, Float32BufferAttribute } from "three";

export function createContourGeometry(slices: number, segments: number): BufferGeometry {
  const positions: number[] = [];
  for (let row = 1; row < slices - 1; row += 1) {
    const phi = (row / (slices - 1)) * Math.PI;
    const points: number[][] = [];
    for (let col = 0; col <= segments; col += 1) {
      const theta = (col / segments) * Math.PI * 2;
      points.push([
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      ]);
    }
    for (let col = 0; col < segments; col += 1) {
      positions.push(...points[col], ...points[col + 1]);
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  return geometry;
}

export function createRingGeometry(segments: number): BufferGeometry {
  const positions: number[] = [];
  for (let i = 0; i <= segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    positions.push(Math.cos(angle), Math.sin(angle), 0);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  return geometry;
}

function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createDustGeometry(count: number, seed = 1931): BufferGeometry {
  const random = mulberry32(seed);
  const positions: number[] = [];
  const sizes: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const radius = 1.35 + random() * 1.25;
    const theta = random() * Math.PI * 2;
    const y = random() * 2 - 1;
    const ring = Math.sqrt(1 - y * y);
    positions.push(Math.cos(theta) * ring * radius, y * radius, Math.sin(theta) * ring * radius);
    sizes.push(0.6 + random() * 1.3);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new Float32BufferAttribute(sizes, 1));
  return geometry;
}
