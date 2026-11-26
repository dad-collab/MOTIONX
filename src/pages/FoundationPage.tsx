import { useRef } from "react";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { FoundationOrb } from "@/components/three/FoundationOrb";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { colors, motionTokens, type ColorToken } from "@/design/tokens";
import { gsap, useGSAP } from "@/lib/gsap";

const WORDMARK = "MOTIONX";

const palette: { token: ColorToken; name: string; role: string }[] = [
  { token: "void", name: "Void", role: "Page background" },
  { token: "ink", name: "Ink", role: "Raised background" },
  { token: "graphite", name: "Graphite", role: "Surfaces and 3D bodies" },
  { token: "steel", name: "Steel", role: "Hover and pressed surfaces" },
  { token: "line", name: "Line", role: "Hairlines and dividers" },
  { token: "mist", name: "Mist", role: "Metadata and captions" },
  { token: "fog", name: "Fog", role: "Body copy" },
  { token: "bone", name: "Bone", role: "Headings and primary text" },
  { token: "signal", name: "Signal", role: "The single accent: actions and focus" },
  { token: "signalDim", name: "Signal dim", role: "Accent in pressed states" },
  { token: "plasma", name: "Plasma", role: "3D light only, never UI text" },
  { token: "alert", name: "Alert", role: "Errors only" },
];

const typeScale = [
  {
    name: "Display XL",
    className: "font-display text-display-xl font-bold",
    sample: "Motion",
    spec: "Syne Bold · fluid 56 to 176 px · line 0.9",
  },
  {
    name: "Display L",
    className: "font-display text-display-lg font-bold",
    sample: "Immersive",
    spec: "Syne Bold · fluid 44 to 120 px · line 0.92",
  },
  {
    name: "Heading 1",
    className: "font-display text-h1 font-semibold",
    sample: "Creative systems",
    spec: "Syne SemiBold · fluid 32 to 64 px · line 1.02",
  },
  {
    name: "Heading 2",
    className: "font-display text-h2 font-semibold",
    sample: "Built to be felt",
    spec: "Syne SemiBold · fluid 24 to 40 px · line 1.1",
  },
  {
    name: "Body large",
    className: "text-body-lg text-fog",
    sample:
      "We direct motion for brands that want to be remembered, from launch films to interactive worlds.",
    spec: "Manrope Regular · 18 px · line 1.65",
  },
  {
    name: "Body",
    className: "text-body text-fog",
    sample:
      "Every project starts with a single frame. The rules below hold the colour, type and motion that later sections are built on.",
    spec: "Manrope Regular · 15 px · line 1.6",
  },
  {
    name: "Label",
    className: "font-mono text-label uppercase text-mist",
    sample: "Selected work 2025",
    spec: "JetBrains Mono · 11 px · caps · tracking 0.18em",
  },
];

const revealWords = ["Enter", "Move", "Land"];

export function FoundationPage() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: motionTokens.ease.out } })
          .from(
            "[data-letter]",
            {
              yPercent: 110,
              duration: motionTokens.duration.cinematic,
              stagger: motionTokens.stagger.base,
            },
            0.2,
          )
          .from(
            "[data-probe-fade]",
            {
              opacity: 0,
              y: 24,
              duration: motionTokens.duration.base,
              stagger: motionTokens.stagger.loose,
            },
            "-=1.8",
          );

        gsap.to("[data-wordmark]", {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: heroRef },
  );

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-svh flex-col overflow-hidden"
      >
        <div className="absolute inset-0 opacity-70 lg:left-1/2 lg:opacity-100">
          <SceneCanvas className="h-full">
            <FoundationOrb />
          </SceneCanvas>
        </div>

        <header className="relative z-10 flex h-20 items-center justify-between px-6 md:px-10 lg:px-16">
          <span className="font-display text-base font-bold tracking-[0.2em] text-bone">
            {WORDMARK}
          </span>
          <span className="font-mono text-label uppercase text-mist">
            Design system
          </span>
        </header>

        <Container className="relative z-10 flex flex-1 flex-col justify-end pb-16 md:pb-24">
          <div data-probe-fade>
            <Eyebrow index="00">Phase 01 · Foundation</Eyebrow>
          </div>
          <h1
            aria-label={WORDMARK}
            data-wordmark
            className="mt-6 font-display text-display-lg font-bold text-bone"
          >
            {WORDMARK.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                className="inline-block align-top overflow-hidden"
              >
                <span data-letter className="inline-block">
                  {letter}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-probe-fade
            className="mt-8 max-w-xl text-body-lg text-pretty text-fog"
          >
            A cinematic, dark, motion-first studio site. This page checks the
            palette, type, motion and 3D stack before any section is built.
          </p>
          <div data-probe-fade className="mt-10 flex flex-wrap gap-3">
            <a href="#color" className={buttonStyles({ size: "lg" })}>
              Review palette
            </a>
            <a
              href="#motion"
              className={buttonStyles({ variant: "ghost", size: "lg" })}
            >
              Motion tokens
            </a>
          </div>
        </Container>
      </section>

      <Section id="color" labelledBy="color-title">
        <Reveal>
          <Eyebrow index="01">Color</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="color-title"
            className="mt-6 max-w-2xl font-display text-h1 font-semibold"
          >
            Dark by default, one signal colour.
          </h2>
        </Reveal>
        <ul className="mt-14 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4 lg:grid-cols-6">
          {palette.map((item) => (
            <li key={item.token} className="flex flex-col bg-void">
              <div
                className="aspect-[4/3] w-full"
                style={{ backgroundColor: colors[item.token] }}
              />
              <div className="p-4">
                <p className="text-sm font-medium text-bone">{item.name}</p>
                <p className="mt-1 font-mono text-label uppercase text-mist">
                  {colors[item.token]}
                </p>
                <p className="mt-2 text-xs text-fog">{item.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="type" labelledBy="type-title">
        <Reveal>
          <Eyebrow index="02">Typography</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="type-title"
            className="mt-6 max-w-2xl font-display text-h1 font-semibold"
          >
            Three families, one fluid scale.
          </h2>
        </Reveal>
        <div className="mt-14">
          {typeScale.map((row) => (
            <div
              key={row.name}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <div>
                <p className="font-mono text-label uppercase text-mist">
                  {row.name}
                </p>
                <p className="mt-2 text-xs text-mist">{row.spec}</p>
              </div>
              <p className={row.className}>{row.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="motion" labelledBy="motion-title">
        <Reveal>
          <Eyebrow index="03">Controls and motion</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="motion-title"
            className="mt-6 max-w-2xl font-display text-h1 font-semibold"
          >
            Deliberate movement, quiet controls.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <Button variant="ghost">Secondary</Button>
          <Button disabled>Disabled</Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {revealWords.map((word, index) => (
            <Reveal key={word} delay={index * 0.12}>
              <div className="border-t border-line pt-6">
                <p className="font-mono text-label text-signal">
                  0{index + 1}
                </p>
                <p className="mt-4 font-display text-h2 font-semibold">
                  {word}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-mono text-label uppercase text-mist">
              Duration (seconds)
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs">
              {Object.entries(motionTokens.duration).map(([name, value]) => (
                <div key={name}>
                  <dt className="uppercase tracking-[0.18em] text-mist">
                    {name}
                  </dt>
                  <dd className="mt-1 tabular-nums text-bone">{value}s</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="font-mono text-label uppercase text-mist">
              Easing
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs">
              {Object.entries(motionTokens.ease).map(([name, value]) => (
                <div key={name}>
                  <dt className="uppercase tracking-[0.18em] text-mist">
                    {name}
                  </dt>
                  <dd className="mt-1 text-bone">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
