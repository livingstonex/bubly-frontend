import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function BottomNavigation({
  currentStep,
  handlePrevious,
  handleNext,
  canContinue,
}: {
  currentStep: number;
  handlePrevious: () => void;
  handleNext: () => void;
  canContinue: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between border-t pt-6">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      {currentStep < 5 ? (
        <Button onClick={handleNext} disabled={!canContinue}>
          <span>{currentStep === 4 ? 'Finish' : 'Continue'}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
}
