// components/tooltip/Tooltip.tsx
import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative flex items-center">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
        {content}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-full border-8 border-transparent border-t-black"></div>
      </div>
    </div>
  );
};

export default Tooltip;
