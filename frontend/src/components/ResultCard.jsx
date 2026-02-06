import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { CheckCircle, TrendingUp } from 'lucide-react';

const ResultCard = ({ price }) => {
    // Animated counter for price
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const displayPrice = useTransform(springValue, (latest) => latest.toFixed(2));

    useEffect(() => {
        springValue.set(price);
    }, [price, springValue]);

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-gradient-to-br from-ai-card to-ai-dark p-1 rounded-3xl shadow-2xl relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-ai-accent/20 to-purple-500/20 rounded-3xl blur-xl" />

            <div className="bg-ai-dark relative rounded-[22px] p-8 overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <TrendingUp className="w-24 h-24" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-500/10 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-sm font-medium text-green-400 tracking-wider uppercase">Valuation Complete</span>
                </div>

                <div className="space-y-1 mb-8">
                    <p className="text-ai-muted text-sm">Estimated Market Value</p>
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-white">
                            {price} Lakh
                        </span>
                        <span className="text-sm text-ai-muted">(PKR)</span>
                    </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                    <h4 className="text-sm font-semibold text-white mb-2">Price Insights</h4>
                    <p className="text-xs text-ai-muted leading-relaxed">
                        This estimate is calculated based on current market trends, location analysis, and property specifications. Actual prices may vary based on specific amenities and negotiation.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultCard;
