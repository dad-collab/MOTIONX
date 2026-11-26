import { gsap } from "@/lib/gsap";

export interface SharedPointer {
  x: number;
  y: number;
  sx: number;
  sy: number;
  lens: number;
  active: boolean;
}

const state: SharedPointer = { x: 0, y: 0, sx: 0, sy: 0, lens: 0, active: false };
let references = 0;
let removeTicker: (() => void) | null = null;
let lastMove = 0;

function move(event: PointerEvent): void {
  if (event.pointerType === "touch") return;
  state.x = (event.clientX / window.innerWidth) * 2 - 1;
  state.y = 1 - (event.clientY / window.innerHeight) * 2;
  state.active = true;
  state.lens = 1;
  lastMove = performance.now();
}

function tick(time: number): void {
  const now = performance.now();
  if (now - lastMove > 1800) {
    state.active = false;
    state.lens = Math.max(0, state.lens - 0.025);
    state.x = Math.sin(time * 0.00017) * 0.16;
    state.y = Math.cos(time * 0.00013) * 0.12;
  }
  state.sx += (state.x - state.sx) * 0.075;
  state.sy += (state.y - state.sy) * 0.075;
}

export function trackPointer(): () => void {
  references += 1;
  if (references === 1) {
    window.addEventListener("pointermove", move, { passive: true });
    const ticker = (time: number) => tick(time);
    gsap.ticker.add(ticker);
    removeTicker = () => gsap.ticker.remove(ticker);
  }
  return () => {
    references = Math.max(0, references - 1);
    if (references === 0) {
      window.removeEventListener("pointermove", move);
      removeTicker?.();
      removeTicker = null;
      state.active = false;
      state.lens = 0;
    }
  };
}

export function getPointer(): Readonly<SharedPointer> {
  return state;
}
