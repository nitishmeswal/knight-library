import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import GravityShiftScene from "@/components/scenes/GravityShiftScene";

export default function Page() {
  return (
    <SceneShell title="Gravity Shift" canvas={<GravityShiftScene />}>
      <SceneSection
        chapter="Scene"
        title="Falling Sideways."
        body="80 objects respond to a gravity vector that rotates with scroll — chaos ensues."
      />
      <SceneSection
        chapter="Chapter I"
        title="No Up."
        body="Gravity pulls in every direction — objects bounce off invisible bounds."
      />
      <SceneSection
        chapter="Chapter II"
        title="Equilibrium."
        body="The objects never settle — physics stays live."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
