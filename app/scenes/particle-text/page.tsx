import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ParticleTextScene from "@/components/scenes/ParticleTextScene";

export default function Page() {
  return (
    <SceneShell title="Particle Text Reveal" canvas={<ParticleTextScene />}>
      <SceneSection
        chapter="Scene"
        title="Dust to Words."
        body="5,000 particles converge from chaos to form the word KNIGHT."
      />
      <SceneSection
        chapter="Chapter I"
        title="Convergence."
        body="Each particle follows its own path — the text emerges like a signal from noise."
      />
      <SceneSection
        chapter="Chapter II"
        title="Dissolution."
        body="Keep scrolling and the text scatters again into entropy."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
