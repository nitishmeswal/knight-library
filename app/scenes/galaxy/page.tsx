import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import GalaxyScene from "@/components/scenes/GalaxyScene";

export default function Page() {
  return (
    <SceneShell title="Galaxy Spiral" canvas={<GalaxyScene />}>
      <SceneSection
        chapter="Scene 04"
        title="Eighteen thousand stars."
        body="A spiral galaxy of additive particles. Scroll tightens the spiral and speeds the rotation."
      />
      <SceneSection
        chapter="Outer arm"
        title="Cold light."
        body="Blue giants populate the edge. Motion is slow, patient."
      />
      <SceneSection
        chapter="Core"
        title="Density increases."
        body="Stars spiral inward. The galactic core pulls the eye."
      />
      <SceneSection chapter="Event" title="Spin up." />
    </SceneShell>
  );
}
