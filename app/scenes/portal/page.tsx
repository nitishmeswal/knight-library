import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import PortalScene from "@/components/scenes/PortalScene";

export default function Page() {
  return (
    <SceneShell title="Portal Transition" canvas={<PortalScene />}>
      <SceneSection
        chapter="Scene"
        title="Gateway."
        body="6 concentric rings spin and collapse as scroll warps you through a dimensional portal."
      />
      <SceneSection
        chapter="Chapter I"
        title="Threshold."
        body="Particles accelerate backward — you are being pulled through."
      />
      <SceneSection
        chapter="Chapter II"
        title="Other Side."
        body="The camera passes through into the void beyond."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
