import { useState, useEffect } from 'react';

const WelcomeTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "This is my LinkedIn Page",
      description: "Connect with me professionally on LinkedIn to see my work experience and network.",
      position: "left",
      target: "linkedin"
    },
    {
      title: "Checkout my GitHub Page",
      description: "Explore my open source projects and code repositories on GitHub.",
      position: "left",
      target: "github"
    },
    {
      title: "My Skills",
      description: "View my technical skills and expertise in various technologies.",
      position: "left",
      target: "skills"
    },
    {
      title: "Resume",
      description: "Download my resume to learn more about my experience and qualifications.",
      position: "left",
      target: "resume"
    },
    {
      title: "Mac OS Center",
      description: "Access system controls, brightness, volume, and quick settings from here.",
      position: "top-right",
      target: "control-center"
    },
    {
      title: "Photos Folder",
      description: "Browse through my photo gallery and visual content.",
      position: "bottom",
      target: "photos"
    },
    {
      title: "Folder to see my Projects",
      description: "Click here to explore all my projects and detailed work.",
      position: "bottom",
      target: "folder"
    },
    {
      title: "Mail to contact me",
      description: "Send me an email directly by clicking the Mail icon.",
      position: "bottom",
      target: "mail"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('portfolioTourCompleted', 'true');
    onComplete();
  };

  const getPositionClasses = () => {
    const target = steps[currentStep].target;
    switch (steps[currentStep].position) {
      case 'left':
        // Desktop icons on the left side
        if (target === 'linkedin') return 'top-[120px] left-[180px]';
        if (target === 'github') return 'top-[200px] left-[180px]';
        if (target === 'skills') return 'top-[280px] left-[180px]';
        if (target === 'resume') return 'top-[360px] left-[180px]';
        return 'top-1/2 left-[180px] -translate-y-1/2';
      case 'top-right':
        // Control center in top right
        return 'top-[80px] right-[80px]';
      case 'bottom':
        // Dock icons at bottom
        if (target === 'photos') return 'bottom-[120px] left-[35%]';
        if (target === 'folder') return 'bottom-[120px] left-[42%]';
        if (target === 'mail') return 'bottom-[120px] left-[56%]';
        return 'bottom-[120px] left-1/2 -translate-x-1/2';
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto" onClick={handleSkip}></div>

      {/* Tooltip */}
      <div className={`absolute ${getPositionClasses()} pointer-events-auto animate-fadeIn`}>
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 p-5 max-w-[280px] relative">
          {/* Header with Tip number and close */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">{currentStep + 1}</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Tip {currentStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-1.5 leading-tight">
              {steps[currentStep].title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {steps[currentStep].description}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSkip}
              className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-medium rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              {currentStep === steps.length - 1 ? "Get Started" : 'Next'}
            </button>
          </div>
        </div>

        {/* Arrow pointer */}
        <div className={`absolute ${
          steps[currentStep].position === 'left' ? '-left-3 top-8' :
          steps[currentStep].position === 'top-right' ? 'top-full left-8 mt-2' :
          steps[currentStep].position === 'bottom' ? 'bottom-full left-8 mb-2' :
          'hidden'
        }`}>
          <div className={`w-0 h-0 drop-shadow-lg ${
            steps[currentStep].position === 'left' ? 'border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-white' :
            steps[currentStep].position === 'bottom' ? 'border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white' :
            'border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTour;
