import { useEffect, useState } from 'react';

import { useBusiness } from '@/lib/queries/useBusiness';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BusinessInfo } from './business-info';
import { BusinessDocumentUpload } from './business-document-upload';
import { BusinessWebsiteUrlProcessing } from './business-website-url-processing';
import { BusinessOnboardingComplete } from './business-onboarding-complete';
import { StepIndicator } from './components/step-indicator';
import { BottomNavigation } from './components/bottom-navigation';

const steps = [
  {
    id: 1,
    title: 'Business Information',
    description: 'Please provide basic information about your business',
  },
  {
    id: 2,
    title: 'Document Upload',
    description:
      'Please upload a whitepaper of your business or a document that gives our AI more details about your business.',
  },
  {
    id: 3,
    title: 'Website Information',
    description: 'Please enter your business website url',
  },
  {
    id: 4,
    title: 'Onboarding Completed',
    description:
      'Your account is created, you can start creating automated publicity content now.',
  },
];

export default function OnboardingFlow() {
  const { data: business } = useBusiness();
  const [currentStep, setCurrentStep] = useState<number>(
    business?.current_step ?? 1
  );
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    setCanContinue(false);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BusinessInfo onSuccess={() => setCanContinue(true)} />;

      case 2:
        return (
          <BusinessDocumentUpload onSuccess={() => setCanContinue(true)} />
        );

      case 3:
        return (
          <BusinessWebsiteUrlProcessing
            onSuccess={() => setCanContinue(true)}
          />
        );

      case 4:
        return <BusinessOnboardingComplete />;

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center p-4 mt-16 ">
      <Card className="w-full max-w-3xl shadow-md">
        <CardHeader className="pb-0">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {renderStepContent()}

          <BottomNavigation
            currentStep={currentStep}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            canContinue={canContinue}
          />
        </CardContent>
      </Card>
    </div>
  );
}
