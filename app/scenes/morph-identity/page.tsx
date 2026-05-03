import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import MorphIdentityScene from "@/components/scenes/MorphIdentityScene";

export default function Page() {
  return (
    <SceneShell title="Morphing Identity" canvas={<MorphIdentityScene />}>
      <SceneSection
        chapter="Scene"
        title="Sphere."
        body="3,000 points form a perfect sphere — the base identity."
      />
      <SceneSection
        chapter="Chapter I"
        title="Transform."
        body="Points smoothly interpolate to a cube, then to a torus."
      />
      <SceneSection
        chapter="Chapter II"
        title="Cycle."
        body="Scroll through all three geometric identities seamlessly."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
