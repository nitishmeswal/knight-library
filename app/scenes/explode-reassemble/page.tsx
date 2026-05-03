import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ExplodeReassembleScene from "@/components/scenes/ExplodeReassembleScene";

export default function Page() {
  return (
    <SceneShell title="Explode & Reassemble" canvas={<ExplodeReassembleScene />}>
      <SceneSection
        chapter="Scene"
        title="Explode. Reassemble."
        body="300 dodecahedron fragments scatter with glow cracks and magnetically reform into an organic rock."
      />
      <SceneSection
        chapter="Chapter I"
        title="Order from chaos."
        body="Each fragment glows hot as it separates, cooling as it snaps back into place."
      />
      <SceneSection
        chapter="Chapter II"
        title="Rebirth."
        body="The object is whole again — scars glowing faintly from within."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
