import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import CyberpunkFlyScene from "@/components/scenes/CyberpunkFlyScene";

export default function Page() {
  return (
    <SceneShell title="Cyberpunk Flythrough" canvas={<CyberpunkFlyScene />}>
      <SceneSection
        chapter="Scene"
        title="Night City."
        body="400 neon buildings stretch to the horizon — rain falls as you scroll forward."
      />
      <SceneSection
        chapter="Chapter I"
        title="Skyline."
        body="Grid lines glow magenta, buildings pulse with shifting hues in synthwave palette."
      />
      <SceneSection
        chapter="Chapter II"
        title="Terminal."
        body="Camera rises above the skyline at full scroll."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
