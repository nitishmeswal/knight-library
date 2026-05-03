import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import SkullDisintegrateScene from "@/components/scenes/SkullDisintegrateScene";

export default function Page() {
  return (
    <SceneShell title="Skull Disintegration" canvas={<SkullDisintegrateScene />}>
      <SceneSection
        chapter="Scene"
        title="Form."
        body="4,000 particles hold the shape of a human skull — inner glow creates a cyber vibe."
      />
      <SceneSection
        chapter="Chapter I"
        title="Dust."
        body="Scroll forward and the skull breaks apart into floating dust."
      />
      <SceneSection
        chapter="Chapter II"
        title="Rebuild."
        body="Reverse scroll magnetically pulls every particle back into formation."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
