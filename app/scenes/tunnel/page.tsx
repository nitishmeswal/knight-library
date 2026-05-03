import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import TunnelScene from "@/components/scenes/TunnelScene";

export default function Page() {
  return (
    <SceneShell title="Tunnel Flythrough" canvas={<TunnelScene />}>
      <SceneSection
        chapter="Scene 06"
        title="A cinematic tube."
        body="The camera travels a curved 3D path driven entirely by scroll. Rings of light pass by."
      />
      <SceneSection
        chapter="Depart"
        title="Enter the corridor."
        body="The path curls softly. Orientation is automatic — we always look forward."
      />
      <SceneSection
        chapter="Transit"
        title="Midway."
        body="Parallax rings accelerate. The tube feels infinite."
      />
      <SceneSection chapter="Arrive" title="Breakthrough." />
    </SceneShell>
  );
}
