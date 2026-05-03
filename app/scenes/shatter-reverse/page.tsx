import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import ShatterReverseScene from "@/components/scenes/ShatterReverseScene";

export default function Page() {
  return (
    <SceneShell title="Shattering Glass" canvas={<ShatterReverseScene />}>
      <SceneSection
        chapter="Scene"
        title="Intact."
        body="250 glass shards form a perfect sphere — pristine and transparent."
      />
      <SceneSection
        chapter="Chapter I"
        title="Break."
        body="Scroll forward — the sphere shatters outward in slow motion."
      />
      <SceneSection
        chapter="Chapter II"
        title="Reverse."
        body="Continue scrolling — time reverses and every shard returns to its place."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
