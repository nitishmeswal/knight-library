import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import DNAScene from "@/components/scenes/DNAScene";

export default function Page() {
  return (
    <SceneShell title="DNA Helix" canvas={<DNAScene />}>
      <SceneSection
        chapter="Scene 05"
        title="The double helix."
        body="Two strands. Forty rungs. Scroll unravels the structure, stretching the pitch and fading the bonds."
      />
      <SceneSection
        chapter="Bound"
        title="Tightly coiled."
        body="Information compressed into form. Every rung a bit of meaning."
      />
      <SceneSection
        chapter="Release"
        title="The strands relax."
        body="Pitch grows. Rungs dissolve. Continuity becomes spacious."
      />
      <SceneSection chapter="Echo" title="Twin helices." />
    </SceneShell>
  );
}
