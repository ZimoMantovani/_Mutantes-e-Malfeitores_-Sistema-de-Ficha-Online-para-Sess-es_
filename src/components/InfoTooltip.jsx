import React, { useState } from 'react';
import { Info } from 'lucide-react';

const InfoTooltip = ({ children, content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <span 
        onClick={handleClick}
        className="cursor-pointer hover:text-blue-600 transition-colors duration-200 border-b border-dotted border-gray-400 hover:border-blue-600"
      >
        {children}
      </span>
      
      {isVisible && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div 
            className="fixed inset-0 z-40"
            onClick={handleClose}
          />
          
          {/* Tooltip */}
          <div className="absolute z-50 w-64 p-3 mt-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-lg left-0 top-full">
            <div className="relative">
              {/* Seta do tooltip */}
              <div className="absolute -top-5 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-300" />
              <div className="absolute -top-4 left-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white" />
              
              {/* Conteúdo */}
              <div className="text-gray-800">
                {content}
              </div>
              
              {/* Botão de fechar */}
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 text-lg leading-none"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Componente específico para ícone de informação
export const InfoIcon = ({ content, className = '' }) => {
  return (
    <InfoTooltip content={content} className={className}>
      <Info className="w-4 h-4 inline-block ml-1 text-gray-400 hover:text-blue-600" />
    </InfoTooltip>
  );
};

export default InfoTooltip;
