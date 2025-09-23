import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback, useMemo } from "react";

/**
 * Компонент анимированный задний фон
 */
export const Background = ({ theme }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = useMemo(() => { 
    return {
      background: {
        color: theme ? "#2E3337" : "#e1e2e2ff",  
      },
      particles: {
        number: { value: 20, density: { enable: true, area: 450 } },
        color: { value: theme ? ["#28be4673", "#1b8c337c", "#474b4f5d"] : ["#2e3337a1", "#474b4fa9", "#28be4671"] },
        shape: { type: "square" },
        opacity: { value: 1 },
        size: { value: { min: 5, max: 50 } },
        links: {
          enable: true,
          distance: 200,
          color: theme ? "#ffffffb2" : "#1e1e1eb2",
          opacity: 0.7,
          width: 1,
        },
        move: { enable: true, speed: 0.3, outModes: "out" },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 1 } },
          push: { quantity: 1 },
          repulse: { distance: 100, duration: 0.5 },
        },
      },
    };
  }, [theme]);

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};
