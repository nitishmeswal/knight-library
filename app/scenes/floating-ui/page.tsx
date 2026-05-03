import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import FloatingUIScene from "@/components/scenes/FloatingUIScene";

export default function Page() {
  return (
    <SceneShell title="Floating UI Universe" canvas={<FloatingUIScene />}>
      <SceneSection
        chapter="Scene"
        title="UI in Space."
        body="60 glass cards float in zero gravity — scroll zooms through the ecosystem."
      />
      <SceneSection
        chapter="Chapter I"
        title="Interface Nebula."
        body="Each card drifts with subtle rotation, creating a product showcase in three dimensions."
      />
      <SceneSection
        chapter="Chapter II"
        title="Deep Zoom."
        body="Camera pushes through the field as scroll reaches maximum."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
