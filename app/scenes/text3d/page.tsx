import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import TextAssembleScene from "@/components/scenes/TextAssembleScene";

export default function Page() {
  return (
    <SceneShell title="3D Text Assemble" canvas={<TextAssembleScene text="CREATE" />}>
      <SceneSection
        chapter="Scene 09"
        title="Language, assembled."
        body="A word, rasterized into hundreds of cubes. Scroll pulls the cubes out of chaos and into meaning."
      />
      <SceneSection
        chapter="Scatter"
        title="Nothing means anything yet."
        body="Cubes drift. The word is still a secret."
      />
      <SceneSection
        chapter="Converge"
        title="Shape emerges."
        body="Each cube homes to a pixel of the glyph it belongs to."
      />
      <SceneSection chapter="Reveal" title="The word is read." />
    </SceneShell>
  );
}
