import { useState } from 'react';
import { Check, X, Zap, Crown, Building2, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlanNameEnum, type Plan } from '@/lib/types/plan';

// Mock pricing data - replace with actual Stripe prices
const mockPrices = {
  [PlanNameEnum.BASIC]: { monthly: 9, yearly: 90 },
  [PlanNameEnum.PRO]: { monthly: 29, yearly: 290 },
  [PlanNameEnum.PREMIUM]: { monthly: 99, yearly: 990 },
  [PlanNameEnum.ENTERPRISE]: { monthly: 299, yearly: 2990 },
};

const planIcons = {
  [PlanNameEnum.BASIC]: Star,
  [PlanNameEnum.PRO]: Zap,
  [PlanNameEnum.PREMIUM]: Crown,
  [PlanNameEnum.ENTERPRISE]: Building2,
};

const planColors = {
  [PlanNameEnum.BASIC]: 'border-gray-200 hover:border-gray-300',
  [PlanNameEnum.PRO]: 'border-blue-200 hover:border-blue-300',
  [PlanNameEnum.PREMIUM]: 'border-purple-200 hover:border-purple-300',
  [PlanNameEnum.ENTERPRISE]: 'border-orange-200 hover:border-orange-300',
};

const planGradients = {
  [PlanNameEnum.BASIC]: 'from-gray-50 to-gray-100',
  [PlanNameEnum.PRO]: 'from-blue-50 to-blue-100',
  [PlanNameEnum.PREMIUM]: 'from-purple-50 to-purple-100',
  [PlanNameEnum.ENTERPRISE]: 'from-orange-50 to-orange-100',
};

interface SubscriptionPricingProps {
  plans: Plan[];
  onSelectPlan: (plan: Plan, billingCycle: 'monthly' | 'yearly') => void;
}

export function SubscriptionPricing({
  plans,
  onSelectPlan,
}: SubscriptionPricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  );

  const formatFeature = (
    value: number | boolean | typeof Infinity,
    type: string
  ) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-400" />
      );
    }

    if (value === Infinity) {
      return (
        <span className="text-sm font-medium text-foreground">Unlimited</span>
      );
    }

    if (type === 'storage') {
      return (
        <span className="text-sm font-medium text-foreground">{value} MB</span>
      );
    }

    if (type === 'time') {
      return (
        <span className="text-sm font-medium text-foreground">{value}h</span>
      );
    }

    return (
      <span className="text-sm font-medium text-foreground">
        {value.toLocaleString()}
      </span>
    );
  };

  const getPrice = (planName: PlanNameEnum) => {
    const price = mockPrices[planName][billingCycle];
    return price;
  };

  const getSavings = (planName: PlanNameEnum) => {
    const monthly = mockPrices[planName].monthly;
    const yearly = mockPrices[planName].yearly;
    const savings = ((monthly * 12 - yearly) / (monthly * 12)) * 100;
    return Math.round(savings);
  };

  const isPopular = (planName: PlanNameEnum) => planName === PlanNameEnum.PRO;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Choose Your Plan
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Start with a free trial and scale as you grow
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              billingCycle === 'monthly'
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')
            }
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              billingCycle === 'yearly' ? 'bg-primary' : 'bg-gray-200'
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              billingCycle === 'yearly'
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Yearly
          </span>
          {billingCycle === 'yearly' && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Save up to 20%
            </span>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map(plan => {
          const Icon = planIcons[plan.name];
          const price = getPrice(plan.name);
          const savings = getSavings(plan.name);
          const popular = isPopular(plan.name);

          return (
            <Card
              key={plan.name}
              className={cn(
                'relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                planColors[plan.name],
                popular && 'ring-2 ring-primary ring-opacity-50 scale-105'
              )}
            >
              {popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader
                className={cn(
                  'text-center pb-4 bg-gradient-to-br',
                  planGradients[plan.name]
                )}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={cn(
                      'p-3 rounded-full',
                      popular
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <CardTitle className="text-xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>

                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">
                      ${price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>

                  {billingCycle === 'yearly' && savings > 0 && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Save {savings}%
                    </p>
                  )}

                  {plan.trial_period_days > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.trial_period_days}-day free trial
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Projects
                    </span>
                    {formatFeature(plan.features.max_projects, 'count')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Storage
                    </span>
                    {formatFeature(plan.features.max_storage_mb, 'storage')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      API Calls
                    </span>
                    {formatFeature(plan.features.max_api_calls, 'count')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Team Members
                    </span>
                    {formatFeature(plan.features.team_members, 'count')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      PDF Export
                    </span>
                    {formatFeature(plan.features.export_pdf, 'boolean')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      AI Credits
                    </span>
                    {formatFeature(plan.features.ai_credits, 'count')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Slack Integration
                    </span>
                    {formatFeature(plan.features.slack_integration, 'boolean')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      White Labeling
                    </span>
                    {formatFeature(plan.features.white_labeling, 'boolean')}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Support
                    </span>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {plan.features.support_level.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Response Time
                    </span>
                    {formatFeature(plan.features.response_time_hours, 'time')}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => onSelectPlan(plan, billingCycle)}
                  className={cn(
                    'w-full',
                    popular
                      ? 'bg-primary/80 hover:bg-primary/90'
                      : 'bg-secondary hover:bg-primary'
                  )}
                  size="lg"
                >
                  {plan.trial_period_days > 0
                    ? 'Start Free Trial'
                    : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground">
          All plans include 24/7 support and can be upgraded or downgraded at
          any time.
        </p>
      </div>
    </div>
  );
}

export default SubscriptionPricing;
