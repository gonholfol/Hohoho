import React from 'react';

interface SnowflakeProps {
  style: React.CSSProperties;
}

export function Snowflake({ style }: SnowflakeProps) {
  return (
    <div 
      className="absolute text-blue-100/30 pointer-events-none select-none"
      style={style}
    >
      •
    </div>
  );
}