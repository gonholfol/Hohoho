import { useState, useEffect } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export function useSnowfall(count: number = 50) {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const createSnowflake = (id: number): Snowflake => ({
      id,
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2
    });

    // Initialize snowflakes
    setSnowflakes(Array.from({ length: count }, (_, i) => createSnowflake(i)));

    const interval = setInterval(() => {
      setSnowflakes(prev => prev.map(flake => {
        const newY = flake.y + flake.speed;
        return newY > 100
          ? createSnowflake(flake.id)
          : { ...flake, y: newY };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [count]);

  return snowflakes;
}