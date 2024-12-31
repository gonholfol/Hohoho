import { memo } from 'react';

const SnowEffect = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 99999 }}>
      <div className="absolute inset-0 w-full h-full">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="snow"
            style={{
              '--size': `${Math.random() * 0.7 + 0.2}rem`,
              '--left': `${Math.random() * 100}%`,
              '--top': `${-10 + Math.random() * 100}%`,
              '--opacity': `${0.3 + Math.random() * 0.7}`,
              '--duration': `${Math.random() * 5 + 5}s`,
              '--delay': `${-Math.random() * 15}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(SnowEffect); 