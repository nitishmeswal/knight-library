import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import SurfaceRippleScene from "@/components/scenes/SurfaceRippleScene";

export default function Page() {
  return (
    <SceneShell title="Surface Ripple Mesh" canvas={<SurfaceRippleScene />}>
      <SceneSection
        chapter="Scene"
        title="Still Water."
        body="A metallic plane sits calm — waiting for interaction."
      />
      <SceneSection
        chapter="Chapter I"
        title="Ripple."
        body="Move your cursor across the surface — waves propagate from the touch point."
      />
      <SceneSection
        chapter="Chapter II"
        title="Storm."
        body="Scroll increases wave amplitude — the surface becomes a stormy sea."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
