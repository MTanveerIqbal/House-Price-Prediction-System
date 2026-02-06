import React from 'react';
import { motion } from 'framer-motion';
import { Brain, LandPlot, ShieldCheck, Zap } from 'lucide-react';

const Header = () => {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row items-center justify-between mb-16 px-4 py-6 glass-panel rounded-2xl border-white/5 bg-white/5"
        >
            <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="relative">
                    <div className="absolute inset-0 bg-ai-accent rounded-xl blur-lg opacity-40 animate-pulse" />
                    <div className="relative p-3 bg-ai-card rounded-xl border border-white/10 shadow-2xl">
                        <Brain className="w-8 h-8 text-ai-accent" />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-black bg-gradient-to-r from-white via-white to-ai-muted bg-clip-text text-transparent tracking-tighter">
                        AI ESTATE
                    </h1>
                    <p className="text-xs text-ai-muted font-bold tracking-[0.2em] uppercase">Market Intelligence</p>
                </div>
            </div>

            <div className="flex gap-8 items-center text-sm font-medium">
                <div className="flex items-center gap-2 text-green-400 bg-green-500/5 px-3 py-1 rounded-full border border-green-500/10">
                    <Zap className="w-4 h-4" /> Live Engine
                </div>
                <div className="flex items-center gap-2 text-ai-muted">
                    <ShieldCheck className="w-4 h-4" /> Secure Data
                </div>
                <button className="hidden md:block px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all">
                    Documentation
                </button>
            </div>
        </motion.header>
    );
};

export default Header;
