import React from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import { motion } from 'framer-motion';

function App() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <Header />

        <main className="pb-24">
          <div className="text-center mb-20 relative px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ai-accent/5 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white drop-shadow-sm">
                Next-Gen Real Estate <br />
                <span className="bg-gradient-to-r from-ai-accent to-purple-500 bg-clip-text text-transparent">
                  Predictive Analysis
                </span>
              </h2>
              <p className="text-ai-muted max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                Utilizing deep learning models trained on 13,000+ data points to provide hyper-accurate property valuations across Bengaluru's dynamic market.
              </p>
            </motion.div>
          </div>

          <PredictionForm />

          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              { title: "Precision Models", desc: "Linear regression with feature scaling for +/- 5% accuracy." },
              { title: "Real-time Data", desc: "Instant access to current market trends and location heatmaps." },
              { title: "Clean Insights", desc: "Beautifully visualized data for informed decision making." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-8 glass-panel border border-white/5 hover:border-ai-accent/30 transition-colors"
              >
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-ai-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </main>

        <footer className="py-12 border-t border-white/5 text-center text-ai-muted text-sm px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p>&copy; 2024 AI Estate Analytics. System Version 2.0.1 (Experimental). by AI Engineer Muhammad Tanveer Iqbal</p>
            <div className="flex gap-8 font-semibold">
              <a href="https://www.linkedin.com/in/syed-muhammad-tanveer-75aaa1321/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com/MTanveerIqbal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}

export default App;
