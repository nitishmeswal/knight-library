import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import SoftBodyScene from "@/components/scenes/SoftBodyScene";

export default function Page() {
  return (
    <SceneShell title="Soft Body Cube" canvas={<SoftBodyScene />}>
      <SceneSection
        chapter="Scene"
        title="Jelly."
        body="A cube with spring physics jiggles when disturbed — every vertex is sprung."
      />
      <SceneSection
        chapter="Chapter I"
        title="Impact."
        body="Move your cursor near the surface — waves propagate through the volume."
      />
      <SceneSection
        chapter="Chapter II"
        title="Wobble."
        body="Scroll increases the jiggle factor — the cube becomes pure gelatin."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
