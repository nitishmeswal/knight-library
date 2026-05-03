import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ShatteredGlassScene from "@/components/scenes/ShatteredGlassScene";

export default function Page() {
  return (
    <SceneShell title="Shattered Glass" canvas={<ShatteredGlassScene />}>
      <SceneSection chapter="Scene 14" title="Break the pane." body="A flat sheet of glass fractures into 320 shards flying at the camera with individual spin." />
      <SceneSection chapter="Intact" title="The surface, whole." />
      <SceneSection chapter="Fracture" title="Lines of tension." />
      <SceneSection chapter="Burst" title="Everything at once." />
    </SceneShell>
  );
}
