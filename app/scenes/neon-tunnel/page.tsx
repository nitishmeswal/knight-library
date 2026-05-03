import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import NeonTunnelScene from "@/components/scenes/NeonTunnelScene";

export default function Page() {
  return (
    <SceneShell title="Neon Tunnel" canvas={<NeonTunnelScene />}>
      <SceneSection
        chapter="Scene"
        title="Enter the tunnel."
        body="80 neon rings race past at scroll-controlled speed through infinite depth."
      />
      <SceneSection
        chapter="Chapter I"
        title="Warp Drive."
        body="Each ring pulses and shifts hue — a chromatic tunnel through digital space."
      />
      <SceneSection
        chapter="Chapter II"
        title="Terminal Velocity."
        body="Speed cranks as you approach the end of the scroll."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
