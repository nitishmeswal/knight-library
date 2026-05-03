import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import NoiseTerrainScene from "@/components/scenes/NoiseTerrainScene";

export default function Page() {
  return (
    <SceneShell title="Noise Terrain Evolution" canvas={<NoiseTerrainScene />}>
      <SceneSection
        chapter="Scene"
        title="Flat."
        body="A terrain starts smooth and erupts into mountains driven by layered noise."
      />
      <SceneSection
        chapter="Chapter I"
        title="Chaos."
        body="Multiple noise octaves create increasingly complex topography."
      />
      <SceneSection
        chapter="Chapter II"
        title="Peaks."
        body="The wireframe overlay reveals the mathematical structure beneath."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
