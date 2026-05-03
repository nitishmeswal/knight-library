import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import FractalTreeScene from "@/components/scenes/FractalTreeScene";

export default function Page() {
  return (
    <SceneShell title="Fractal Tree" canvas={<FractalTreeScene />}>
      <SceneSection chapter="Scene 13" title="Growth, recursive." body="A single trunk becomes branches; branches become branches. Each generation reveals on scroll." />
      <SceneSection chapter="Trunk" title="Begin at the root." />
      <SceneSection chapter="Branches" title="The first split." />
      <SceneSection chapter="Canopy" title="Fully grown." />
    </SceneShell>
  );
}
