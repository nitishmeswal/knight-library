import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import TimeFreezeScene from "@/components/scenes/TimeFreezeScene";

export default function Page() {
  return (
    <SceneShell title="Time Freeze Explosion" canvas={<TimeFreezeScene />}>
      <SceneSection
        chapter="Scene"
        title="Frozen Moment."
        body="400 shards frozen mid-explosion — scroll rotates the camera around the debris."
      />
      <SceneSection
        chapter="Chapter I"
        title="Cinematic Orbit."
        body="A bullet-time effect: the scene is static, but your perspective sweeps dramatically."
      />
      <SceneSection
        chapter="Chapter II"
        title="Every Angle."
        body="Heat glow from the core fades as distance increases."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
