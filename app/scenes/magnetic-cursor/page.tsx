import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import MagneticCursorScene from "@/components/scenes/MagneticCursorScene";

export default function Page() {
  return (
    <SceneShell title="Magnetic Cursor Mesh" canvas={<MagneticCursorScene />}>
      <SceneSection
        chapter="Scene"
        title="Soft Metal."
        body="Vertices attract toward your cursor with distance-based deformation."
      />
      <SceneSection
        chapter="Chapter I"
        title="Pull."
        body="Move your mouse — the mesh stretches like magnetic putty toward the pointer."
      />
      <SceneSection
        chapter="Chapter II"
        title="Release."
        body="Scroll increases the magnetic strength of the cursor field."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
