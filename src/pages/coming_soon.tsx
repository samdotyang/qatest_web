import React from 'react';
import githubLogo from '@/github.svg';

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue to-purple flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Main content */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Social links */}
        <div className="flex justify-center gap-6">
          <a href="https://github.com/kkday-it/kkday-qa-automation" className='className="text-white/80 hover:text-white transition-colors'>
            <img src={githubLogo} alt="github_logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;