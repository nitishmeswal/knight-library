import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ClothSimScene from "@/components/scenes/ClothSimScene";

export default function Page() {
  return (
    <SceneShell title="Cloth Simulation" canvas={<ClothSimScene />}>
      <SceneSection
        chapter="Scene"
        title="Draped."
        body="A fabric plane hangs from its top edge — gravity pulls it naturally."
      />
      <SceneSection
        chapter="Chapter I"
        title="Wind."
        body="Scroll increases wind turbulence — the cloth billows and flutters."
      />
      <SceneSection
        chapter="Chapter II"
        title="Storm."
        body="At full scroll, the fabric whips violently in a digital storm."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
