'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';

type SimulationState = 'idle' | 'typing' | 'generating' | 'complete';

interface DemoPreset {
  id: string;
  label: string;
  prompt: string;
  steps: string[];
  demoUrl: string;
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'editorial',
    label: 'Dashboard',
    prompt: 'Create a clean analytics dashboard with revenue charts and activity feed',
    steps: [
      'Analyzing design tokens...',
      'Generating layout structure...',
      'Rendering components...',
      'Applying editorial-tech theme...',
    ],
    demoUrl: '/explore/editorial-tech?embed=true',
  },
  {
    id: 'dark',
    label: 'Dark Admin',
    prompt: 'Build a dark-themed admin panel with trading interface and real-time data',
    steps: [
      'Loading dark-boldness tokens...',
      'Building sidebar navigation...',
      'Rendering data tables...',
      'Applying dark theme...',
    ],
    demoUrl: '/explore/dark-boldness?embed=true',
  },
  {
    id: 'minimal',
    label: 'Workspace',
    prompt: 'Design a minimal workspace app with task management and calendar view',
    steps: [
      'Initializing minimal-workspace...',
      'Creating workspace layout...',
      'Adding task components...',
      'Finalizing theme...',
    ],
    demoUrl: '/explore/minimal-workspace?embed=true',
  },
];

interface DemoSimulationProps {
  onComplete: (demoUrl: string) => void;
  onPromptSubmit?: (prompt: string, theme: string) => void;
}

function useTypewriter(text: string, active: boolean, speed: number, onDone?: () => void) {
  const [displayed, setDisplayed] = useState('');
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      return;
    }

    let index = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        onDoneRef.current?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, active, speed]);

  return displayed;
}

export function DemoSimulation({ onComplete, onPromptSubmit }: DemoSimulationProps) {
  const [state, setState] = useState<SimulationState>('idle');
  const [selectedPreset, setSelectedPreset] = useState<DemoPreset | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  const handlePresetClick = useCallback(
    (preset: DemoPreset) => {
      setSelectedPreset(preset);
      setCompletedSteps([]);
      setActiveStepIndex(-1);
      setState('typing');
      onPromptSubmit?.(preset.prompt, preset.id);
    },
    [onPromptSubmit]
  );

  const handleReset = useCallback(() => {
    setState('idle');
    setSelectedPreset(null);
    setCompletedSteps([]);
    setActiveStepIndex(-1);
  }, []);

  const typedPrompt = useTypewriter(selectedPreset?.prompt ?? '', state === 'typing', 30, () =>
    setState('generating')
  );

  useEffect(() => {
    if (state !== 'generating' || !selectedPreset) {
      return;
    }

    setActiveStepIndex(0);
  }, [state, selectedPreset]);

  const activeStepText = selectedPreset?.steps[activeStepIndex] ?? '';

  const typedStep = useTypewriter(
    activeStepText,
    state === 'generating' && activeStepIndex >= 0,
    20,
    () => {
      if (!selectedPreset) {
        return;
      }

      setCompletedSteps((prev) => [...prev, activeStepIndex]);

      const nextIndex = activeStepIndex + 1;
      if (nextIndex < selectedPreset.steps.length) {
        setTimeout(() => setActiveStepIndex(nextIndex), 500);
      } else {
        setTimeout(() => {
          setState('complete');
          onComplete(selectedPreset.demoUrl);
        }, 500);
      }
    }
  );

  return (
    <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-5 md:p-6 w-full max-w-xl">
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm text-neutral-500 mb-3">Try a preset:</p>
            <div className="flex flex-wrap gap-2">
              {DEMO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset)}
                  className="inline-flex items-center h-8 px-4 rounded-full text-sm font-medium border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {state === 'typing' && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="font-mono text-sm text-neutral-800 leading-relaxed min-h-[3rem]">
              {typedPrompt}
              <span className="inline-block w-[2px] h-4 bg-neutral-800 ml-0.5 align-middle animate-pulse" />
            </div>
          </motion.div>
        )}

        {state === 'generating' && selectedPreset && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            {selectedPreset.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = index === activeStepIndex;
              const isVisible = isCompleted || isActive;

              if (!isVisible) {
                return null;
              }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2"
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="block w-4 h-4 rounded-full border-2 border-neutral-300 border-t-neutral-500 animate-spin" />
                    )}
                  </span>
                  <span className="font-mono text-sm text-neutral-700">
                    {isCompleted ? step : typedStep}
                    {isActive && (
                      <span className="inline-block w-[2px] h-3.5 bg-neutral-700 ml-0.5 align-middle animate-pulse" />
                    )}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {state === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            <div className="space-y-2">
              {selectedPreset?.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-mono text-sm text-neutral-700">{step}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <span className="text-sm text-green-600 font-medium">Generation complete</span>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
