import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import DominoScene from "@/components/scenes/DominoScene";

export default function Page() {
  return (
    <SceneShell title="Domino Cascade" canvas={<DominoScene />}>
      <SceneSection chapter="Scene 18" title="Cause & effect." body="60 dominoes on a curved path. Scroll drives a falling wavefront; the camera chases it." />
      <SceneSection chapter="Push" title="Tap the first." />
      <SceneSection chapter="Cascade" title="The line collapses." />
      <SceneSection chapter="Silence" title="All down." />
    </SceneShell>
  );
}
