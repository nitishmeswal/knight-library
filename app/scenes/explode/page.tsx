import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ExplodeScene from "@/components/scenes/ExplodeScene";

export default function Page() {
  return (
    <SceneShell title="Explode & Reform" canvas={<ExplodeScene />}>
      <SceneSection
        chapter="Scene 01"
        title="Explode. Reform."
        body="216 fragments scattered across space. Scroll to pull them back into a single, perfect cube."
      />
      <SceneSection
        chapter="Chapter I"
        title="Order from chaos."
        body="Every fragment is an instanced mesh interpolating between a random exploded origin and its lattice home."
      />
      <SceneSection
        chapter="Chapter II"
        title="Geometry is narrative."
        body="As the cube reforms, the camera tightens. The story resolves in the final frame."
      />
      <SceneSection chapter="Finale" title="Whole again." />
    </SceneShell>
  );
}
