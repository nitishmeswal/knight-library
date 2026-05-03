import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import AbstractSculptureScene from "@/components/scenes/AbstractSculptureScene";

export default function Page() {
  return (
    <SceneShell title="Abstract Sculpture Builder" canvas={<AbstractSculptureScene />}>
      <SceneSection
        chapter="Scene"
        title="Fragments."
        body="50 metallic pieces fly in from scattered positions to build a spiraling sculpture."
      />
      <SceneSection
        chapter="Chapter I"
        title="Assembly."
        body="Each piece arrives on a staggered delay — the structure grows from the base up."
      />
      <SceneSection
        chapter="Chapter II"
        title="Complete."
        body="The final form is a futuristic helix tower."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
