import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import CursorDistortScene from "@/components/scenes/CursorDistortScene";

export default function Page() {
  return (
    <SceneShell title="Cursor Distortion Field" canvas={<CursorDistortScene />}>
      <SceneSection
        chapter="Scene"
        title="Touch the Surface."
        body="A metallic plane ripples where your cursor moves — scroll intensifies distortion."
      />
      <SceneSection
        chapter="Chapter I"
        title="Interaction."
        body="Waves propagate outward from the cursor position in real time."
      />
      <SceneSection
        chapter="Chapter II"
        title="Maximum Ripple."
        body="At full scroll, even ambient waves join the distortion."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
