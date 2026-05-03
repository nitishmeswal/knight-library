import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import RibbonScene from "@/components/scenes/RibbonScene";

export default function Page() {
  return (
    <SceneShell title="Ribbon Flow" canvas={<RibbonScene />}>
      <SceneSection chapter="Scene 11" title="Silk in motion." body="Five ribbons flow along helical paths whose twist intensifies with scroll." />
      <SceneSection chapter="Weave" title="Cross and uncross." />
      <SceneSection chapter="Release" title="Spread wide." />
      <SceneSection chapter="Return" title="Rebind the thread." />
    </SceneShell>
  );
}
