import React from 'react';
import { Snowflake } from './Snowflake';
import { useSnowfall } from './useSnowfall';

export function Snowfall() {
  const snowflakes = useSnowfall(30);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            fontSize: `${flake.size}rem`,
            opacity: flake.opacity,
            transform: `translateZ(0)`,
            transition: 'top 0.05s linear'
          }}
        />
      ))}
    </div>
  );
}