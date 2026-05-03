import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import OceanScene from "@/components/scenes/OceanScene";

export default function Page() {
  return (
    <SceneShell title="Ocean Surface" canvas={<OceanScene />}>
      <SceneSection chapter="Scene 17" title="Skim the water." body="A vertex-displaced plane acting as ocean; scroll whips up the waves and lifts the camera to reveal depth." />
      <SceneSection chapter="Calm" title="Gentle swell." />
      <SceneSection chapter="Wind" title="Whitecaps rise." />
      <SceneSection chapter="Storm" title="Full chop." />
    </SceneShell>
  );
}
