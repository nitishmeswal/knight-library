import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import HoloGridScene from "@/components/scenes/HoloGridScene";

export default function Page() {
  return (
    <SceneShell title="Holographic Grid" canvas={<HoloGridScene />}>
      <SceneSection
        chapter="Scene 10"
        title="Signal on the grid."
        body="A holographic wire plane ripples in real time. Scroll amplifies the wave and lifts the camera."
      />
      <SceneSection
        chapter="Idle"
        title="Low amplitude."
        body="A gentle hum. The grid breathes."
      />
      <SceneSection
        chapter="Signal"
        title="Pulse rising."
        body="Waves sharpen. Tempo doubles."
      />
      <SceneSection chapter="Overdrive" title="Full oscillation." />
    </SceneShell>
  );
}
