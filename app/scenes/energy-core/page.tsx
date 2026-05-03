import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import EnergyCoreScene from "@/components/scenes/EnergyCoreScene";

export default function Page() {
  return (
    <SceneShell title="Energy Core Sphere" canvas={<EnergyCoreScene />}>
      <SceneSection
        chapter="Scene"
        title="Sealed."
        body="16 shell plates encase a rotating energy core — containment intact."
      />
      <SceneSection
        chapter="Chapter I"
        title="Breach."
        body="Scroll opens the shell — plates drift outward, revealing the blazing core."
      />
      <SceneSection
        chapter="Chapter II"
        title="Overload."
        body="The exposed core pulses faster as containment fails."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
