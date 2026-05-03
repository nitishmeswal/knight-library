import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import LiquidMetalMorphScene from "@/components/scenes/LiquidMetalMorphScene";

export default function Page() {
  return (
    <SceneShell title="Liquid Metal Morph" canvas={<LiquidMetalMorphScene />}>
      <SceneSection
        chapter="Scene"
        title="Liquid Metal."
        body="A chrome sphere distorts with procedural noise, morphing between shapes as you scroll."
      />
      <SceneSection
        chapter="Chapter I"
        title="Fluid Matter."
        body="The surface ripples like mercury — every vertex displaces along its normal."
      />
      <SceneSection
        chapter="Chapter II"
        title="Transmutation."
        body="Cool blues shift to hot pinks as the morph reaches full intensity."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
