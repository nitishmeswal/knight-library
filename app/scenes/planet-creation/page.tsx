import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import PlanetCreationScene from "@/components/scenes/PlanetCreationScene";

export default function Page() {
  return (
    <SceneShell title="Planet Creation" canvas={<PlanetCreationScene />}>
      <SceneSection
        chapter="Scene"
        title="Cosmic Dust."
        body="3,000 particles collapse inward as gravity forms a planet from nothing."
      />
      <SceneSection
        chapter="Chapter I"
        title="Accretion."
        body="Dust compacts into rock, color shifts from brown to oceanic blue."
      />
      <SceneSection
        chapter="Chapter II"
        title="Atmosphere."
        body="A glowing atmosphere shell appears at full formation."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
