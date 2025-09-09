import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Step = {
  id: number;
  title: string;
  description: string;
};

export function StepIndicator({
  steps,
  currentStep,
}: {
  steps: Step[];
  currentStep: number;
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {steps.map(step => (
        <div
          key={step.id}
          className="relative flex flex-1 flex-col items-center"
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300',
              currentStep > step.id
                ? 'bg-purple-600 text-white'
                : currentStep === step.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-600'
            )}
          >
            {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
          </div>
          <div
            className={cn(
              'mt-2 text-center text-sm font-medium',
              currentStep >= step.id ? 'text-gray-800' : 'text-gray-500'
            )}
          >
            {step.title}
          </div>
          {step.id < steps.length && (
            <div
              className={cn(
                'absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(100%-40px)] -translate-y-1/2 bg-gray-200 transition-colors duration-300',
                currentStep > step.id && 'bg-purple-400'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
