import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import NeonCityScene from "@/components/scenes/NeonCityScene";

export default function Page() {
  return (
    <SceneShell title="Neon City" canvas={<NeonCityScene />}>
      <SceneSection chapter="Scene 19" title="Synthwave at dusk." body="Flying over an infinite grid of neon buildings. Scroll drives the flight; hue shifts with time." />
      <SceneSection chapter="Streets" title="Low altitude." />
      <SceneSection chapter="Skyline" title="Rise above." />
      <SceneSection chapter="Horizon" title="Endless grid." />
    </SceneShell>
  );
}
