import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Bath, Square, Loader2, DollarSign, MapPin } from 'lucide-react';
import axios from 'axios';
import ResultCard from './ResultCard';

const PredictionForm = () => {
    const [locations, setLocations] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [formData, setFormData] = useState({
        total_sqft: '',
        bath: '',
        bhk: '',
        location: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_URL = 'http://localhost:8000';

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get(`${API_URL}/locations`);
            setLocations(response.data.locations);
        } catch (err) {
            console.error("Error fetching locations:", err);
            setError('Backend connection error. Please ensure the server is running.');
        } finally {
            setLoadingLocations(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.location || !formData.total_sqft) {
            setError('Please provide at least a location and area.');
            return;
        }

        setLoading(true);
        setPrediction(null);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/predict`, {
                total_sqft: parseFloat(formData.total_sqft),
                bath: parseFloat(formData.bath) || 1,
                bhk: parseInt(formData.bhk) || 1,
                location: formData.location
            });
            setPrediction(response.data.predicted_price);
        } catch (err) {
            setError('Valuation engine encountered an error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
                {/* Form Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-8 relative overflow-hidden"
                >
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-ai-accent/10 rounded-full blur-[80px]" />

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-ai-accent/20 rounded-lg flex items-center justify-center border border-ai-accent/30">
                            <Search className="w-5 h-5 text-ai-accent" />
                        </div>
                        <h2 className="text-2xl font-bold">Property Details</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="total_sqft" className="text-sm font-semibold text-ai-muted flex items-center gap-2 cursor-pointer">
                                <Square className="w-4 h-4" /> Area (Square Feet)
                            </label>
                            <input
                                type="number"
                                id="total_sqft"
                                name="total_sqft"
                                value={formData.total_sqft}
                                onChange={handleChange}
                                className="input-modern"
                                placeholder="e.g. 1500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-ai-muted flex items-center gap-2">
                                    <Home className="w-4 h-4" /> BHK
                                </label>
                                <input
                                    type="number"
                                    name="bhk"
                                    value={formData.bhk}
                                    onChange={handleChange}
                                    className="input-modern"
                                    placeholder="e.g. 3"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-ai-muted flex items-center gap-2">
                                    <Bath className="w-4 h-4" /> Bathrooms
                                </label>
                                <input
                                    type="number"
                                    name="bath"
                                    value={formData.bath}
                                    onChange={handleChange}
                                    className="input-modern"
                                    placeholder="e.g. 2"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-ai-muted flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Preferred Location
                            </label>
                            <div className="relative">
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="input-modern appearance-none disabled:opacity-50"
                                    disabled={loadingLocations}
                                    required
                                >
                                    <option value="" disabled>Search or Select Location</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc} className="bg-ai-dark text-white">
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-ai-muted">
                                    {loadingLocations ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>▼</span>}
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-premium w-full flex items-center justify-center gap-3 text-lg py-5 mt-4"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Processing Market Data...
                                </>
                            ) : (
                                <>
                                    <DollarSign className="w-6 h-6" />
                                    Calculate Valuation
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* Display Panel */}
                <div className="flex flex-col gap-6">
                    <AnimatePresence mode="wait">
                        {prediction !== null ? (
                            <ResultCard price={prediction} key="result" />
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full glass-panel flex flex-col items-center justify-center text-center p-12 overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-ai-accent/5 to-transparent pointer-events-none" />
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 animate-float relative">
                                    <div className="absolute inset-0 bg-ai-accent/20 rounded-full blur-2xl animate-pulse" />
                                    <Home className="w-12 h-12 text-ai-accent relative z-10" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Precision Analysis</h3>
                                <p className="text-ai-muted text-lg leading-relaxed max-w-sm">
                                    Complete the form to unlock AI-powered insights into current real estate values.
                                </p>
                                <div className="mt-12 flex gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-2 h-2 rounded-full bg-ai-muted/30 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
