import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ParticleSkinScene from "@/components/scenes/ParticleSkinScene";

export default function Page() {
  return (
    <SceneShell title="Particle Skin Object" canvas={<ParticleSkinScene />}>
      <SceneSection
        chapter="Scene"
        title="Skin."
        body="5,000 particles form the surface of a sphere — a fragile shell."
      />
      <SceneSection
        chapter="Chapter I"
        title="Shed."
        body="Scroll causes particles to drift outward — the skin breaks apart."
      />
      <SceneSection
        chapter="Chapter II"
        title="Reform."
        body="Continue scrolling — noise-driven forces pull particles back into form."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
