import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import WireframeToRealScene from "@/components/scenes/WireframeToRealScene";

export default function Page() {
  return (
    <SceneShell title="Wireframe to Realistic" canvas={<WireframeToRealScene />}>
      <SceneSection
        chapter="Scene"
        title="Blueprint Mode."
        body="An icosahedron starts as pure wireframe and materializes into a glossy solid."
      />
      <SceneSection
        chapter="Chapter I"
        title="Materialization."
        body="Metal and clearcoat emerge as scroll progresses — from schematic to real."
      />
      <SceneSection
        chapter="Chapter II"
        title="Polished."
        body="The final form gleams with studio lighting."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
