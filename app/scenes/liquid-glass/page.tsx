import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import LiquidGlassScene from "@/components/scenes/LiquidGlassScene";

export default function Page() {
  return (
    <SceneShell title="Liquid Glass Object" canvas={<LiquidGlassScene />}>
      <SceneSection
        chapter="Scene"
        title="Crystal."
        body="A glass sphere with high IOR refracts light — cursor bends the surface."
      />
      <SceneSection
        chapter="Chapter I"
        title="Distortion."
        body="Mouse proximity creates local displacement — light warps through the volume."
      />
      <SceneSection
        chapter="Chapter II"
        title="Clarity."
        body="The transmission and refraction create premium glass simulation."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
