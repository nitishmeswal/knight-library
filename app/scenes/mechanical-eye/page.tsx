import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import MechanicalEyeScene from "@/components/scenes/MechanicalEyeScene";

export default function Page() {
  return (
    <SceneShell title="Mechanical Eye" canvas={<MechanicalEyeScene />}>
      <SceneSection
        chapter="Scene"
        title="Watch."
        body="A detailed eye follows your cursor — the iris tracks your every move."
      />
      <SceneSection
        chapter="Chapter I"
        title="Focus."
        body="Scroll zooms into the iris — the pupil contracts."
      />
      <SceneSection
        chapter="Chapter II"
        title="Blink."
        body="Random blinks add uncanny realism to the tracking."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
