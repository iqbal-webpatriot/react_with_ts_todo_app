import React, { useState, useEffect, useRef, ReactNode, ReactElement } from 'react';
import ReactDOM from 'react-dom';

type TooltipProps = {
  text: string;
   children?:React.ReactElement
};

const Tooltip = ( {text,children}:TooltipProps ) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const portalContainer = document.getElementById('tooltip-container');

  if (!portalContainer) {
    return null;
  }

  return (
    <>
    <div className="relative inline-block">
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
     {children}
    </div>

    {isTooltipVisible && (
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded mt-2">
        {text}
      </div>
    )}
  </div>
    </>
  );
};
export default Tooltip

