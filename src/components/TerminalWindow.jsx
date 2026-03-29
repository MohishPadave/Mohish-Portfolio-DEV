import { useState, useRef, useEffect } from 'react';

const TerminalWindow = ({ onClose, onMinimize, isMinimized }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      { text: 'Available commands:', color: 'text-yellow-400' },
      { text: '  tutorial    - Interactive guide to portfolio features', color: 'text-gray-300' },
      { text: '  about       - Learn about Mohish', color: 'text-gray-300' },
      { text: '  skills      - View technical skills', color: 'text-gray-300' },
      { text: '  projects    - List of projects', color: 'text-gray-300' },
      { text: '  linkedin    - Open LinkedIn profile', color: 'text-gray-300' },
      { text: '  github      - Open GitHub profile', color: 'text-gray-300' },
      { text: '  contact     - Get contact information', color: 'text-gray-300' },
      { text: '  resume      - Download resume PDF', color: 'text-gray-300' },
      { text: '  exit        - Close terminal window', color: 'text-gray-300' },
      { text: '  clear       - Clear terminal screen', color: 'text-gray-300' },
      { text: '  help        - Show this help message', color: 'text-gray-300' },
    ],
    exit: () => {
      onClose();
      return [{ text: 'Closing terminal...', color: 'text-gray-300' }];
    },
    linkedin: () => {
      window.open('https://www.linkedin.com/in/mohish-padave', '_blank');
      return [
        { text: 'Opening LinkedIn...', color: 'text-blue-400' },
      ];
    },
    github: () => {
      window.open('https://github.com/MohishPadave', '_blank');
      return [
        { text: 'Opening GitHub...', color: 'text-gray-400' },
      ];
    },
    tutorial: () => [
      { text: 'Portfolio Features & Functionality:', color: 'text-green-400' },
      { text: '', color: 'text-gray-300' },
      { text: 'Interactive macOS Desktop:', color: 'text-blue-400' },
      { text: '  • Fully functional dock with app icons', color: 'text-gray-300' },
      { text: '  • Draggable and resizable windows', color: 'text-gray-300' },
      { text: '  • macOS-style window controls (close, minimize, maximize)', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Spotify Integration:', color: 'text-blue-400' },
      { text: '  • Live Spotify playlist player', color: 'text-gray-300' },
      { text: '  • Minimize to keep music playing in background', color: 'text-gray-300' },
      { text: '  • Fullscreen mode support', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Notes App:', color: 'text-blue-400' },
      { text: '  • View portfolio information', color: 'text-gray-300' },
      { text: '  • About me, skills, and experience', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Terminal:', color: 'text-blue-400' },
      { text: '  • Interactive command-line interface', color: 'text-gray-300' },
      { text: '  • Type commands to explore portfolio', color: 'text-gray-300' },
      { text: '  • Try: help, about, skills, projects, contact', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Control Center:', color: 'text-blue-400' },
      { text: '  • Adjust screen brightness', color: 'text-gray-300' },
      { text: '  • Quick access to Spotify', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Desktop Icons:', color: 'text-blue-400' },
      { text: '  • Click to open windows with portfolio content', color: 'text-gray-300' },
      { text: '  • Direct links to LinkedIn, GitHub', color: 'text-gray-300' },
      { text: '  • Download resume PDF', color: 'text-gray-300' },
    ],
    about: () => [
      { text: 'About Mohish Padave', color: 'text-green-400' },
      { text: '', color: 'text-gray-300' },
      { text: 'Full-stack developer passionate about creating', color: 'text-gray-300' },
      { text: 'interactive and engaging web experiences.', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'This portfolio showcases my skills in:', color: 'text-blue-400' },
      { text: '  • React & Modern JavaScript', color: 'text-gray-300' },
      { text: '  • UI/UX Design', color: 'text-gray-300' },
      { text: '  • Interactive Animations', color: 'text-gray-300' },
    ],
    skills: () => [
      { text: 'Technical Skills:', color: 'text-green-400' },
      { text: '', color: 'text-gray-300' },
      { text: 'Frontend:', color: 'text-blue-400' },
      { text: '  • React.js, JavaScript (ES6+)', color: 'text-gray-300' },
      { text: '  • HTML5, CSS3, Tailwind CSS', color: 'text-gray-300' },
      { text: '  • GSAP Animations', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Tools & Others:', color: 'text-blue-400' },
      { text: '  • Git & GitHub', color: 'text-gray-300' },
      { text: '  • Vite, npm', color: 'text-gray-300' },
      { text: '  • Responsive Design', color: 'text-gray-300' },
    ],
    projects: () => [
      { text: 'Featured Projects:', color: 'text-green-400' },
      { text: '', color: 'text-gray-300' },
      { text: '1. macOS Portfolio (This site!)', color: 'text-blue-400' },
      { text: '   Interactive portfolio with macOS interface', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Click "My Projects" icon on desktop for more details!', color: 'text-yellow-400' },
    ],
    contact: () => [
      { text: 'Contact Information:', color: 'text-green-400' },
      { text: '', color: 'text-gray-300' },
      { text: 'Email: mohish.workk@gmail.com', color: 'text-gray-300' },
      { text: 'LinkedIn: linkedin.com/in/mohish-padave', color: 'text-gray-300' },
      { text: 'GitHub: github.com/MohishPadave', color: 'text-gray-300' },
      { text: '', color: 'text-gray-300' },
      { text: 'Click the Mail icon in dock to send an email!', color: 'text-blue-400' },
    ],
    resume: () => {
      window.open('/assets/documents/resume.pdf', '_blank');
      return [
        { text: 'Opening resume in new tab...', color: 'text-green-400' },
      ];
    },
    clear: () => null,
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    const output = commands[trimmedCmd]
      ? commands[trimmedCmd]()
      : [{ text: `Command not found: ${cmd}`, color: 'text-red-400' }, { text: "Type 'help' for available commands", color: 'text-gray-500' }];

    setHistory([...history, { input: cmd, output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pb-32 px-4 pointer-events-none transition-opacity duration-300 ${isMinimized ? 'opacity-0 pointer-events-none' : ''}`}>
      <div
        className={`relative bg-[#1e1e1e] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col border border-gray-700 pointer-events-auto ${isMaximized
          ? 'w-full h-full max-w-none max-h-none m-0 transition-all duration-300'
          : 'w-full max-w-3xl h-[70vh] max-h-[600px] transition-all duration-300'
          }`}
        role="dialog"
        aria-label="Terminal window"
      >
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-700">
          {/* Window Controls */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="window-control w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-all shadow-sm group relative"
              title="Close"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                  <path d="M2 2l8 8M10 2l-8 8" />
                </svg>
              </span>
            </button>
            <button
              onClick={onMinimize}
              className="window-control w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffb700] transition-all shadow-sm group relative"
              title="Minimize"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6h8" />
                </svg>
              </span>
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="window-control w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20a030] transition-all shadow-sm group relative"
              title="Maximize"
            >
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-2 h-2 text-black/60" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2h3v3M10 10H7V7M10 2H7v3M2 10h3V7" />
                </svg>
              </span>
            </button>
          </div>

          {/* Terminal Title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-gray-400 text-sm font-medium">
            Terminal
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={contentRef}
          className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm overflow-auto"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="text-green-400 mb-1">Welcome to Mohish's Terminal</div>
          <div className="text-blue-400 mb-1">Type 'tutorial' for an interactive guide</div>
          <div className="text-blue-400 mb-1">Type 'help' for command list</div>
          <div className="text-gray-500 mb-3">----------------------------------------</div>

          {/* Command History */}
          {history.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-center mb-1">
                <span className="text-yellow-400">$</span>
                <span className="ml-2 text-white">{item.input}</span>
              </div>
              {item.output && item.output.map((line, i) => (
                <div key={i} className={line.color}>
                  {line.text}
                </div>
              ))}
            </div>
          ))}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-yellow-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ml-2 flex-1 bg-transparent text-white outline-none border-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;
