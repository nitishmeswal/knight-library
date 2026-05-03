import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import DataStreamScene from "@/components/scenes/DataStreamScene";

export default function Page() {
  return (
    <SceneShell title="Digital Data Stream" canvas={<DataStreamScene />}>
      <SceneSection
        chapter="Scene"
        title="Double Helix."
        body="Two strands of glowing nodes twist around each other — data pulses between them."
      />
      <SceneSection
        chapter="Chapter I"
        title="Signal Flow."
        body="800 particles race along the helix, faster as you scroll deeper."
      />
      <SceneSection
        chapter="Chapter II"
        title="Bandwidth."
        body="The helix tightens and pulses accelerate at maximum scroll."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
