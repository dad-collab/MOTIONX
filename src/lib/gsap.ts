import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionTokens } from "@/design/tokens";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({
  ease: motionTokens.ease.out,
  duration: motionTokens.duration.base,
});

// Phone address bars resize the viewport while scrolling. Ignoring those
// resizes stops scrubbed layouts from jumping mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, useGSAP };
