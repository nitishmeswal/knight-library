import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import RopePhysicsScene from "@/components/scenes/RopePhysicsScene";

export default function Page() {
  return (
    <SceneShell title="Rope Physics" canvas={<RopePhysicsScene />}>
      <SceneSection
        chapter="Scene"
        title="Tendrils."
        body="8 strands extend from a central point — each follows your cursor with lag."
      />
      <SceneSection
        chapter="Chapter I"
        title="Elasticity."
        body="Secondary motion creates organic, rope-like movement."
      />
      <SceneSection
        chapter="Chapter II"
        title="Turbulence."
        body="Scroll increases the tendril thickness and responsiveness."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
