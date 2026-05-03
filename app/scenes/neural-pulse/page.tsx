import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import NeuralPulseScene from "@/components/scenes/NeuralPulseScene";

export default function Page() {
  return (
    <SceneShell title="Neural Brain Pulse" canvas={<NeuralPulseScene />}>
      <SceneSection
        chapter="Scene"
        title="Growth."
        body="300 nodes grow from nothing — connections light up as the brain forms."
      />
      <SceneSection
        chapter="Chapter I"
        title="Intelligence."
        body="Signals pulse through edges at increasing frequency with scroll."
      />
      <SceneSection
        chapter="Chapter II"
        title="Bloom."
        body="At full scroll, the complete brain network blazes with activity."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
