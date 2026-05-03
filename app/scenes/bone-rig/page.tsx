import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import BoneRigScene from "@/components/scenes/BoneRigScene";

export default function Page() {
  return (
    <SceneShell title="Bone Rigged Mesh" canvas={<BoneRigScene />}>
      <SceneSection
        chapter="Scene"
        title="Rest Pose."
        body="12 capsule segments form a limb — starting in a straight rest pose."
      />
      <SceneSection
        chapter="Chapter I"
        title="Animate."
        body="Scroll drives the pose — each joint bends and curls with organic motion."
      />
      <SceneSection
        chapter="Chapter II"
        title="Full Curl."
        body="At maximum scroll, the limb is fully articulated."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
