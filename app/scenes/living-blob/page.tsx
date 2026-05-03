import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import LivingBlobScene from "@/components/scenes/LivingBlobScene";

export default function Page() {
  return (
    <SceneShell title="Living Blob" canvas={<LivingBlobScene />}>
      <SceneSection
        chapter="Scene"
        title="Breathe."
        body="An organic sphere expands and contracts like lungs — alive and responsive."
      />
      <SceneSection
        chapter="Chapter I"
        title="Stress."
        body="Scroll increases the stress level — deformation grows chaotic."
      />
      <SceneSection
        chapter="Chapter II"
        title="Calm."
        body="The blob shifts color from green to red as tension builds."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
