import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import FracturedRealityScene from "@/components/scenes/FracturedRealityScene";

export default function Page() {
  return (
    <SceneShell title="Fractured Reality" canvas={<FracturedRealityScene />}>
      <SceneSection
        chapter="Scene"
        title="Whole."
        body="20 horizontal slices form a solid column — perfect alignment."
      />
      <SceneSection
        chapter="Chapter I"
        title="Glitch."
        body="Scroll offsets each slice — slight displacements create a glitch illusion."
      />
      <SceneSection
        chapter="Chapter II"
        title="Dislocate."
        body="The offsets grow chaotic — reality fractures into disconnected layers."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
