import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import MagnetizedPartsScene from "@/components/scenes/MagnetizedPartsScene";

export default function Page() {
  return (
    <SceneShell title="Magnetized Parts" canvas={<MagnetizedPartsScene />}>
      <SceneSection
        chapter="Scene"
        title="Orbit."
        body="40 metallic pieces orbit a glowing core — a magnetic solar system."
      />
      <SceneSection
        chapter="Chapter I"
        title="Attract."
        body="Move your cursor near — pieces break orbit and follow the mouse."
      />
      <SceneSection
        chapter="Chapter II"
        title="Pull."
        body="Scroll strengthens the cursor magnetism — more pieces break free."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
