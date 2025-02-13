import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Slim version for better performance

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#000",
        },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          shape: { type: "circle" },
          size: { value: 3 },
          move: { enable: true, speed: 2 },
          links: { enable: true, color: "#ffffff", opacity: 0.5 },
        },
      }}
    />
  );
};

export default ParticlesBackground;
