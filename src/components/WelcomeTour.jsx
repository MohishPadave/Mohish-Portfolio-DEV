import { useState } from 'react';

const WelcomeTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Interactive Portfolio",
      description: "This is a link to my interactive portfolio. Click to explore my work!",
      position: "left",
      target: "portfolio"
    },
    {
      title: "LinkedIn Profile",
      description: "Connect with me professionally on LinkedIn to see my work experience and network.",
      position: "left",
      target: "linkedin"
    },
    {
      title: "GitHub Repository",
      description: "Explore my open source projects and code repositories on GitHub.",
      position: "left",
      target: "github"
    },
    {
      title: "Tech Stack",
      description: "View my technical skills and expertise in various technologies.",
      position: "left",
      target: "techstack"
    },
    {
      title: "My Resume",
      description: "Download my resume to learn more about my experience and qualifications.",
      position: "left",
      target: "resume"
    },
    {
      title: "Control Center",
      description: "Access system controls, brightness, volume, and quick settings from here.",
      position: "top-right",
      target: "control-center"
    },
    {
      title: "Terminal App",
      description: "Access the command line interface and run terminal commands.",
      position: "bottom",
      target: "terminal"
    },
    {
      title: "Photos App",
      description: "Browse through my photo gallery and visual content.",
      position: "bottom",
      target: "photos"
    },
    {
      title: "Projects Folder",
      description: "Click here to explore all my projects and detailed work.",
      position: "bottom",
      target: "folder"
    },
    {
      title: "Notes App",
      description: "Take notes and jot down your thoughts and ideas.",
      position: "bottom",
      target: "notes"
    },
    {
      title: "Mail App",
      description: "Send me an email directly by clicking the Mail icon.",
      position: "bottom",
      target: "mail"
    },
    {
      title: "Spotify",
      description: "Listen to music and enjoy your favorite playlists.",
      position: "bottom",
      target: "spotify"
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
        // Desktop icons on the left side - align tooltips with center of each icon
        if (target === 'portfolio') return 'top-[120px] left-[180px] sm:top-[100px] sm:left-[140px]';
        if (target === 'linkedin') return 'top-[200px] left-[180px] sm:top-[160px] sm:left-[140px]';
        if (target === 'github') return 'top-[280px] left-[180px] sm:top-[220px] sm:left-[140px]';
        if (target === 'techstack') return 'top-[440px] left-[180px] sm:top-[280px] sm:left-[140px]';
        if (target === 'resume') return 'top-[520px] left-[180px] sm:top-[340px] sm:left-[140px]';
        return 'top-1/2 left-[180px] -translate-y-1/2 sm:left-[140px]';
      case 'top-right':
        // Control center in top right - centered on the control center
        return 'top-[60px] right-[60px] sm:top-[50px] sm:right-[20px]';
      case 'bottom':
        // Dock icons at bottom - centered on each dock icon
        if (target === 'terminal') return 'bottom-[180px] left-[36%] -translate-x-1/2 sm:bottom-[140px] sm:left-[20%]';
        if (target === 'photos') return 'bottom-[180px] left-[42%] -translate-x-1/2 sm:bottom-[140px] sm:left-[30%]';
        if (target === 'folder') return 'bottom-[180px] left-[48%] -translate-x-1/2 sm:bottom-[140px] sm:left-[40%]';
        if (target === 'notes') return 'bottom-[180px] left-[54%] -translate-x-1/2 sm:bottom-[140px] sm:left-[50%]';
        if (target === 'mail') return 'bottom-[180px] left-[58%] -translate-x-1/2 sm:bottom-[140px] sm:left-[60%]';
        if (target === 'spotify') return 'bottom-[180px] left-[62%] -translate-x-1/2 sm:bottom-[140px] sm:left-[70%]';
        return 'bottom-[180px] left-1/2 -translate-x-1/2 sm:bottom-[140px]';
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
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 p-5 max-w-[280px] sm:max-w-[240px] relative">
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
          steps[currentStep].position === 'left' ? '-left-3 top-6' :
          steps[currentStep].position === 'top-right' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' :
          steps[currentStep].position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' :
          'hidden'
        }`}>
          <div className={`w-0 h-0 drop-shadow-lg ${
            steps[currentStep].position === 'left' ? 'border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-white' :
            steps[currentStep].position === 'bottom' ? 'border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white' :
            'border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeTour;
