import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import GlassMorphScene from "@/components/scenes/GlassMorphScene";

export default function Page() {
  return (
    <SceneShell title="Glass Morphing UI" canvas={<GlassMorphScene />}>
      <SceneSection
        chapter="Scene"
        title="Crystal Panels."
        body="8 transparent glass panels orbit, morph, and refract light as you scroll."
      />
      <SceneSection
        chapter="Chapter I"
        title="Refraction."
        body="Each panel bends light through physical material simulation."
      />
      <SceneSection
        chapter="Chapter II"
        title="Prism."
        body="The arrangement transforms from tight ring to scattered constellation."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
