import React, { useState } from 'react';

type ImageColProps = {
  imageRef?: React.RefObject<HTMLDivElement | null>;
};

const ImageCol = ({ imageRef }: ImageColProps) => {
  const [showAlternateImage, setShowAlternateImage] = useState(false);

  const handleImageHover = () => {
    setShowAlternateImage(true);
  };

  const handleImageMouseLeave = () => {
    setShowAlternateImage(false);
  };

  return (
    <div ref={imageRef} className="relative">
      {/* Placeholder portrait */}
      <div className="relative aspect-3/4 bg-bg-card border border-border-subtle overflow-hidden">
        {/* Decorative gradient bg */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(200,169,110,0.15) 0%, transparent 60%)' }}
        />
        {/* Initials */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={showAlternateImage ? '/ashishsubedicolor.png' : '/ashishsubedi.jpg'}
            alt={showAlternateImage ? 'Ashish Subedi Color' : 'Ashish Subedi'}
            className="font-ui font-extrabold text-[120px] text-gold/10 tracking-tight select-none"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageMouseLeave}
          />
        </div>
        {/* Label overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 border-t border-border-subtle bg-bg/60 backdrop-blur-sm">
          <p className="font-ui text-[11px] font-medium tracking-widest2 uppercase text-ink-dim">
            Ashish Subedi
          </p>
          <p className="font-ui text-[10px] tracking-widest3 uppercase text-ink-faint mt-1">
            Kathmandu, Nepal
          </p>
        </div>
      </div>

      {/* Decorative accent line */}
      <div className="absolute -right-3 top-8 bottom-8 w-px bg-gold/30" />
    </div>
  );
};

export default ImageCol;