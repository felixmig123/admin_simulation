import { useState } from 'react';

export function DemoBanner() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative z-50 w-full">
      {/* Banner principal - con animación de altura */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gradient-to-r from-[#1a1f2e] via-[#192233] to-[#1a1f2e] border-b border-primary/30 backdrop-blur-sm">
          <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center justify-between">
            
            {/* Contenido izquierdo: Mensaje */}
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-sm text-[#92a4c9]">
                <span className="font-semibold text-white">Demo Project</span>
                <span className="mx-2 text-[#324467]">|</span>
                This is an example application for demonstration purposes
              </p>
            </div>

            {/* Contenido derecho: Link GitHub */}
            <div className="flex items-center gap-3">
              <a
                href="https://ejemplo.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d1118] hover:bg-primary/20 border border-[#324467] hover:border-primary/50 text-[#92a4c9] hover:text-white transition-all duration-200"
                aria-label="View repository on GitHub"
              >
                {/* GitHub Icon */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-medium">View Repository</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                >
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Botón toggle - siempre visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute left-1/2 -translate-x-1/2 top-full flex items-center justify-center w-8 h-5 rounded-b-lg bg-[#192233] border border-t-0 border-primary/30 hover:bg-primary/20 text-[#92a4c9] hover:text-white transition-all duration-200 shadow-lg"
        aria-label={isExpanded ? 'Collapse banner' : 'Expand banner'}
        aria-expanded={isExpanded}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
        >
          <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
