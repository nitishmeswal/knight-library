import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import InfinityMirrorScene from "@/components/scenes/InfinityMirrorScene";

export default function Page() {
  return (
    <SceneShell title="Infinity Mirror" canvas={<InfinityMirrorScene />}>
      <SceneSection chapter="Scene 15" title="Rings to forever." body="Forty wire rings recede into fog; new rings respawn at the back creating an endless tunnel." />
      <SceneSection chapter="Glimpse" title="The first depth." />
      <SceneSection chapter="Descent" title="Further in." />
      <SceneSection chapter="∞" title="No end in sight." />
    </SceneShell>
  );
}
