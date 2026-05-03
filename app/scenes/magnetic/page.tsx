import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import MagneticFieldScene from "@/components/scenes/MagneticFieldScene";

export default function Page() {
  return (
    <SceneShell title="Magnetic Field" canvas={<MagneticFieldScene />}>
      <SceneSection chapter="Scene 20" title="Invisible made visible." body="1,400 iron filings orient to a dipole's field. Scroll rotates the dipole axis, rearranging the pattern." />
      <SceneSection chapter="Align" title="Particles find the lines." />
      <SceneSection chapter="Rotate" title="Flip the poles." />
      <SceneSection chapter="Reform" title="A new pattern." />
    </SceneShell>
  );
}
