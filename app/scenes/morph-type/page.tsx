import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import MorphingTypeScene from "@/components/scenes/MorphingTypeScene";

export default function Page() {
  return (
    <SceneShell title="Morphing Typography" canvas={<MorphingTypeScene />}>
      <SceneSection chapter="Scene 16" title="CREATE." body="The same pool of cubes flows through three words as you scroll: CREATE → EVOLVE → SHIP." />
      <SceneSection chapter="Evolve" title="A second form." />
      <SceneSection chapter="Ship" title="The final glyph." />
      <SceneSection chapter="Loop" title="Each letter, a waypoint." />
    </SceneShell>
  );
}
