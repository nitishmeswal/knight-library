import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import AIBrainScene from "@/components/scenes/AIBrainScene";

export default function Page() {
  return (
    <SceneShell title="AI Brain Visualization" canvas={<AIBrainScene />}>
      <SceneSection
        chapter="Scene"
        title="Neural Net."
        body="200 nodes connected by 400 edges — signals pulse through the network."
      />
      <SceneSection
        chapter="Chapter I"
        title="Activation."
        body="Nodes brighten and connections fire as scroll increases neural activity."
      />
      <SceneSection
        chapter="Chapter II"
        title="Intelligence."
        body="The full network blazes with coordinated signal patterns."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
