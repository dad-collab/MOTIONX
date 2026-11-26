import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";
import { CHAPTERS, SITE } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitChars } from "@/components/motion/SplitChars";
import { buttonStyles } from "@/components/ui/Button";

export type ChapterData = (typeof CHAPTERS)[number];

export function Chapter({ chapter }: { chapter: ChapterData }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    if (reduced) return;
    const node = root.current;
    if (!node) return;
    const title = node.querySelectorAll<HTMLElement>("[data-char]");
    gsap.fromTo(title, { yPercent: 115, autoAlpha: 0 }, {
      yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.018, ease: "expo.out",
      scrollTrigger: { trigger: node, start: "top 72%", once: true },
    });
    const rule = node.querySelector<HTMLElement>("[data-chapter-rule]");
    if (rule) gsap.fromTo(rule, { scaleX: 0, transformOrigin: "left center" }, {
      scaleX: 1, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: node, start: "top 72%", once: true },
    });
  }, { scope: root, dependencies: [chapter.id, reduced], revertOnUpdate: true });

  return (
    <section ref={root} id={chapter.id} tabIndex={-1} className="relative flex min-h-[88svh] items-center border-b border-line py-24 outline-none md:py-32" aria-labelledby={`${chapter.id}-title`}>
      <Container>
        <div className="grid gap-12 md:grid-cols-[0.78fr_1.22fr] md:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <Eyebrow index={chapter.number}>{chapter.label}</Eyebrow>
            <p className="hidden max-w-xs font-mono text-[10px] uppercase leading-6 tracking-[0.13em] text-mist md:block">MOTION / FORM / FEELING</p>
          </div>
          <div>
            <h2 id={`${chapter.id}-title`} className="text-display-lg overflow-hidden font-display font-semibold text-bone">
              <span className="sr-only">{chapter.title}</span><SplitChars text={chapter.title} />
            </h2>
            <div data-chapter-rule className="my-8 h-px w-full origin-left bg-line md:my-10" />
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-xl text-body-lg text-fog">{chapter.statement}</p>
              {chapter.id === "contact" ? (
                <Magnetic>
                  <a href={`mailto:${SITE.email}`} className={`${buttonStyles({ variant: "primary", size: "lg" })} group whitespace-nowrap`}>
                    <span>Start a conversation</span><ArrowUpRight className="h-4 w-4" />
                  </a>
                </Magnetic>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
