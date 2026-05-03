import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import InfiniteGridScene from "@/components/scenes/InfiniteGridScene";

export default function Page() {
  return (
    <SceneShell title="Infinite Grid Landscape" canvas={<InfiniteGridScene />}>
      <SceneSection
        chapter="Scene"
        title="Digital Terrain."
        body="A wireframe plane undulates with increasing amplitude — fabric of spacetime."
      />
      <SceneSection
        chapter="Chapter I"
        title="Wave Function."
        body="Perlin-like noise creates organic hills that grow with scroll progress."
      />
      <SceneSection
        chapter="Chapter II"
        title="Descent."
        body="Camera dives from overview into the valleys."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
