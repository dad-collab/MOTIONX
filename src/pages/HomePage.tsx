import { CHAPTERS } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Chapter } from "@/components/sections/Chapter";

export function HomePage({ entered, onSceneReady }: { entered: boolean; onSceneReady: () => void }) {
  return (
    <>
      <Hero entered={entered} onSceneReady={onSceneReady} />
      {CHAPTERS.map((chapter) => <Chapter key={chapter.id} chapter={chapter} />)}
    </>
  );
}
