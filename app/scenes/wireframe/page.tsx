import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import WireframeScene from "@/components/scenes/WireframeScene";

export default function Page() {
  return (
    <SceneShell title="Wireframe → Solid" canvas={<WireframeScene />}>
      <SceneSection
        chapter="Scene 02"
        title="From blueprint to product."
        body="A torus knot skeleton materializes into a glossy, mirror-polished solid as you scroll."
      />
      <SceneSection
        chapter="Blueprint"
        title="Pure structure."
        body="Begin with intent. Show the frame. Respect the viewer's curiosity."
      />
      <SceneSection
        chapter="Manufacture"
        title="Materialize."
        body="Metalness climbs. Roughness falls. The surface becomes a mirror."
      />
      <SceneSection chapter="Shipping" title="Fully realized." />
    </SceneShell>
  );
}
