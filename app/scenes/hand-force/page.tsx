import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import HandForceScene from "@/components/scenes/HandForceScene";

export default function Page() {
  return (
    <SceneShell title="Hand Force Interaction" canvas={<HandForceScene />}>
      <SceneSection
        chapter="Scene"
        title="Push."
        body="30 objects float in space — your cursor pushes them like an invisible hand."
      />
      <SceneSection
        chapter="Chapter I"
        title="React."
        body="Objects scatter from cursor proximity, then drift back to home positions."
      />
      <SceneSection
        chapter="Chapter II"
        title="Intensity."
        body="Scroll amplifies the push force — objects fly further."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
