import React from 'react';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div' | 'p';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component 
      className={`glitch-text relative inline-block ${className}`} 
      data-text={text}
    >
      {text}
    </Component>
  );
};

export default GlitchText;