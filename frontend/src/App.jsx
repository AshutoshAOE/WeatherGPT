import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { roadmapData } from './data/roadmap';

function App() {
  const [completedFeatures, setCompletedFeatures] = useState({});

  // Calculate progress
  const allFeatures = roadmapData.flatMap(tier => tier.features);
  const totalFeatures = allFeatures.filter(f => !f.isFuture).length;
  const completedCount = allFeatures.filter(f => !f.isFuture && completedFeatures[f.id]).length;
  const progressPercent = totalFeatures === 0 ? 0 : Math.round((completedCount / totalFeatures) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e0e0e0] font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#2a2a2a] pt-12 pb-6 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-white mb-2">
            WeatherGPT
          </h1>
          <p className="text-[#a0a0a0] text-sm md:text-base font-light mb-8 max-w-2xl">
            A conversational AI platform that makes weather forecasts, alerts, and climate information genuinely actionable by interpreting and synthesizing existing forecast sources.
          </p>
          
          {/* Progress Indicator */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end text-sm text-[#8a8a8a]">
              <span><strong className="text-white font-medium">{completedCount}</strong> of {totalFeatures} core features complete</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 mt-16">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-16"
        >
          {roadmapData.map((tier) => (
            <motion.section key={tier.id} variants={itemVariants} className="flex flex-col gap-6">
              <div className="border-b border-[#2a2a2a] pb-3">
                <h2 className={`text-xl font-serif ${tier.isFoundation ? 'text-[#8a8a8a]' : 'text-white'}`}>
                  {tier.tierName}
                </h2>
              </div>
              
              <div className="flex flex-col gap-4">
                {tier.features.map((feature) => (
                  <FeatureRow 
                    key={feature.id} 
                    feature={feature} 
                    isCompleted={!!completedFeatures[feature.id]}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

function FeatureRow({ feature, isCompleted }) {
  return (
    <div 
      className={`group relative rounded-xl border p-5 md:p-6 transition-all duration-300 ease-out flex gap-4 md:gap-6
        ${feature.isFuture 
          ? 'border-[#1a1a1a] bg-[#121212] opacity-70' 
          : isCompleted 
            ? 'border-teal-500/20 bg-teal-500/5 hover:border-teal-500/40' 
            : 'border-[#222] bg-[#151515] hover:border-[#333] hover:bg-[#1a1a1a]'
        }
      `}
    >
      {/* Checkbox */}
      <div 
        className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors mt-0.5
          ${feature.isFuture 
            ? 'border border-[#333] opacity-50' 
            : isCompleted
              ? 'bg-teal-500 text-white'
              : 'border border-[#444] text-transparent'
          }
        `}
      >
        <Check size={14} className={isCompleted ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <h3 className={`text-base font-medium ${isCompleted ? 'text-teal-100' : 'text-white'} ${feature.isFuture ? 'text-[#888]' : ''}`}>
            {feature.name}
            {feature.isFuture && (
              <span className="ml-3 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#222] text-[#888] border border-[#333]">
                Future Scope
              </span>
            )}
          </h3>
          <span className="text-xs font-mono text-[#666] tracking-tight shrink-0 bg-[#0f0f0f] px-2 py-1 rounded border border-[#222]">
            {feature.implementation}
          </span>
        </div>

        <p className="text-[#a0a0a0] text-sm leading-relaxed">
          {feature.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-[#555] font-semibold">Behavior</span>
            <span className="text-sm text-[#8a8a8a]">{feature.behavior}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wider text-[#555] font-semibold">Integration</span>
            <span className="text-sm text-[#8a8a8a]">{feature.integration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
