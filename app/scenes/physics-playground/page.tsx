import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import PhysicsPlaygroundScene from "@/components/scenes/PhysicsPlaygroundScene";

export default function Page() {
  return (
    <SceneShell title="Physics Playground" canvas={<PhysicsPlaygroundScene />}>
      <SceneSection
        chapter="Scene"
        title="Bounce."
        body="60 balls respond to scroll as a force input — they bounce, collide, and scatter."
      />
      <SceneSection
        chapter="Chapter I"
        title="Impulse."
        body="Scroll velocity translates directly into upward force on each ball."
      />
      <SceneSection
        chapter="Chapter II"
        title="Freefall."
        body="Stop scrolling and gravity takes over — pure physics simulation."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
