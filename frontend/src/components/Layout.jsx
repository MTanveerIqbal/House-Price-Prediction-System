import React from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-ai-dark text-ai-text font-sans selection:bg-ai-accent selection:text-white overflow-hidden relative">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-ai-accent/10 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    );
};

export default Layout;
