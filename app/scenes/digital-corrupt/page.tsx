import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import DigitalCorruptScene from "@/components/scenes/DigitalCorruptScene";

export default function Page() {
  return (
    <SceneShell title="Digital Corruption" canvas={<DigitalCorruptScene />}>
      <SceneSection
        chapter="Scene"
        title="Clean."
        body="500 particles form a smooth sphere — each point in its correct position."
      />
      <SceneSection
        chapter="Chapter I"
        title="Corrupt."
        body="Scroll voxelizes the object — particles snap to grid positions with random offsets."
      />
      <SceneSection
        chapter="Chapter II"
        title="Restore."
        body="Continue scrolling — corruption reverses and the smooth form returns."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
