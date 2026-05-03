import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import BlackHoleScene from "@/components/scenes/BlackHoleScene";

export default function Page() {
  return (
    <SceneShell title="Black Hole" canvas={<BlackHoleScene />}>
      <SceneSection chapter="Scene 12" title="Gravity wins." body="An accretion disk whirls around a dark sphere while particles spiral inward forever." />
      <SceneSection chapter="Approach" title="The pull begins." />
      <SceneSection chapter="Disk" title="Light spinning at the edge." />
      <SceneSection chapter="Horizon" title="The last frame." />
    </SceneShell>
  );
}
