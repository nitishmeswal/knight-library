import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ProductExplodedScene from "@/components/scenes/ProductExplodedScene";

export default function Page() {
  return (
    <SceneShell title="Product Exploded View" canvas={<ProductExplodedScene />}>
      <SceneSection
        chapter="Scene"
        title="Assembly."
        body="12 cylindrical components separate on scroll — a classic exploded diagram."
      />
      <SceneSection
        chapter="Chapter I"
        title="Engineering."
        body="Each part slides out along its axis with subtle rotation."
      />
      <SceneSection
        chapter="Chapter II"
        title="Blueprint."
        body="Camera orbits to show all components from every angle."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
