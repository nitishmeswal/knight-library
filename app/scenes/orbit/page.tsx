import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import OrbitScene from "@/components/scenes/OrbitScene";

export default function Page() {
  return (
    <SceneShell title="Planet Orbit" canvas={<OrbitScene />}>
      <SceneSection
        chapter="Scene 08"
        title="Orbital cinematography."
        body="The camera circumnavigates a ringed planet as you scroll, giving every chapter a new vantage."
      />
      <SceneSection
        chapter="Equator"
        title="Level gaze."
        body="The rings draw a perfect line across the frame."
      />
      <SceneSection
        chapter="High noon"
        title="Rising elevation."
        body="Climb above the ring plane. See the shape from a new angle."
      />
      <SceneSection chapter="Apex" title="Looking down." />
    </SceneShell>
  );
}
