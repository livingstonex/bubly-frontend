// import { SubscriptionPricing } from './components/subscription-pricing';
// import { PlanNameEnum, type Plan } from '@/lib/types/plan';

// // Your plans data
// const plans: Plan[] = [
//   {
//     name: PlanNameEnum.BASIC,
//     stripe_prices: {
//       monthly: 'price_1S71IiJHF9VJW8gfcgmBJcKq',
//       yearly: 'price_1S71QfJHF9VJW8gfjZK6yjs9',
//     },
//     stripe_product_id: 'prod_T37Xd04iMTK234',
//     trial_period_days: 7,
//     features: {
//       max_projects: 1,
//       max_storage_mb: 100,
//       max_api_calls: 5000,
//       team_members: 1,
//       export_pdf: false,
//       ai_credits: 100,
//       slack_integration: false,
//       white_labeling: false,
//       support_level: 'email_only',
//       response_time_hours: 72,
//     },
//   },
//   {
//     name: PlanNameEnum.PRO,
//     stripe_prices: {
//       monthly: 'price_1S71KBJHF9VJW8gfHmPyB1FS',
//       yearly: 'price_1S71RgJHF9VJW8gfBK0G3ZuS',
//     },
//     stripe_product_id: 'prod_T37Zf7gKZJzyy9',
//     trial_period_days: 0,
//     features: {
//       max_projects: 10,
//       max_storage_mb: 1000,
//       max_api_calls: 100000,
//       team_members: 5,
//       export_pdf: true,
//       ai_credits: 2000,
//       slack_integration: true,
//       white_labeling: false,
//       support_level: 'chat',
//       response_time_hours: 24,
//     },
//   },
//   {
//     name: PlanNameEnum.PREMIUM,
//     stripe_prices: {
//       monthly: 'price_1S71LRJHF9VJW8gfZd23PryJ',
//       yearly: 'price_1S71SUJHF9VJW8gfa1DFryey',
//     },
//     stripe_product_id: 'prod_T37a9RBrCqht62',
//     trial_period_days: 0,
//     features: {
//       max_projects: 50,
//       max_storage_mb: 10000,
//       max_api_calls: 500000,
//       team_members: 20,
//       export_pdf: true,
//       ai_credits: 10000,
//       slack_integration: true,
//       white_labeling: true,
//       support_level: 'priority_chat',
//       response_time_hours: 12,
//     },
//   },
//   {
//     name: PlanNameEnum.ENTERPRISE,
//     stripe_prices: {
//       monthly: 'price_1S71OQJHF9VJW8gfpP3HpCSF',
//       yearly: 'price_1S71TUJHF9VJW8gf4dfA7n9X',
//     },
//     stripe_product_id: 'prod_T37dHgZ8K1NUpD',
//     trial_period_days: 0,
//     features: {
//       max_projects: Infinity,
//       max_storage_mb: 100000,
//       max_api_calls: Infinity,
//       team_members: Infinity,
//       export_pdf: true,
//       ai_credits: Infinity,
//       slack_integration: true,
//       white_labeling: true,
//       support_level: 'dedicated_manager',
//       response_time_hours: 1,
//     },
//   },
// ];

// export function PricingDemo() {
//   const handleSelectPlan = (plan: Plan, billingCycle: 'monthly' | 'yearly') => {
//     console.log('Selected plan:', plan.name, 'Billing cycle:', billingCycle);
//     console.log('Price ID:', plan.stripe_prices[billingCycle]);
//     // Here you would typically:
//     // 1. Call your Stripe checkout API
//     // 2. Redirect to Stripe checkout
//     // 3. Handle the payment flow
//   };

//   return (
//     <div className="min-h-screen bg-background py-12">
//       <SubscriptionPricing plans={plans} onSelectPlan={handleSelectPlan} />
//     </div>
//   );
// }

import { CheckIcon } from '@heroicons/react/20/solid';
import { useCreateCheckoutSession } from '@/lib/queries/useCreateCheckoutSession';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';

// const frequencies = [
//   { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
//   { value: 'annually', label: 'Annually', priceSuffix: '/year' },
// ]
const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '#',
    price: { monthly: '$49.99', annually: '$539.99' },
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics'],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '$99.99', annually: '$1,079.99' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      '5 products',
      'Up to 1,000 subscribers',
      'Basic analytics',
      '48-hour support response time',
    ],
    featured: false,
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#',
    price: { monthly: '$299.99', annually: '$3,239.99' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '$999.99', annually: '$10,799.99' },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools',
    ],
    featured: false,
  },
];

export function PricingDemo() {
  const navigate = useNavigate();
  const { mutateAsync: createCheckoutSession, status } = useCreateCheckoutSession();

  const subscribe = async () => {
    try {
      const payload = {
        priceId: ""
      };
      
      const url = await createCheckoutSession(payload);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : 'An error occurred';

      toast.error(`${errorMessage} Please try again.`);
    }
  }
  return (
    <form className="group/tiers bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl dark:text-white">
            Pricing that grows with you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="mt-16 flex justify-center">
          <fieldset aria-label="Payment frequency">
            <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold inset-ring inset-ring-gray-200 dark:inset-ring-white/10">
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                <input
                  defaultValue="monthly"
                  defaultChecked
                  name="frequency"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                />
                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">
                  Monthly
                </span>
              </label>
              <label className="group relative rounded-full px-2.5 py-1 has-checked:bg-indigo-600 dark:has-checked:bg-indigo-500">
                <input
                  defaultValue="annually"
                  name="frequency"
                  type="radio"
                  className="absolute inset-0 appearance-none rounded-full"
                />
                <span className="text-gray-500 group-has-checked:text-white dark:text-gray-400">
                  Annually
                </span>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {tiers.map(tier => (
            <div
              key={tier.id}
              data-featured={tier.featured ? 'true' : undefined}
              className="group/tier rounded-3xl p-8 ring-1 ring-gray-200 data-featured:ring-2 data-featured:ring-indigo-600 dark:bg-gray-800/50 dark:ring-white/15 dark:data-featured:ring-indigo-400"
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={`tier-${tier.id}`}
                  className="text-lg/8 font-semibold text-gray-900 group-data-featured/tier:text-indigo-600 dark:text-white dark:group-data-featured/tier:text-indigo-400"
                >
                  {tier.name}
                </h3>
                <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600 group-not-data-featured/tier:hidden dark:bg-indigo-500 dark:text-white">
                  Most popular
                </p>
              </div>
              <p className="mt-4 text-sm/6 text-gray-600 dark:text-gray-300">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=monthly]:checked]/tiers:hidden">
                <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {tier.price.monthly}
                </span>
                <span className="text-sm/6 font-semibold text-gray-600 dark:text-gray-400">
                  /month
                </span>
              </p>
              <p className="mt-6 flex items-baseline gap-x-1 group-not-has-[[name=frequency][value=annually]:checked]/tiers:hidden">
                <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {tier.price.annually}
                </span>
                <span className="text-sm/6 font-semibold text-gray-600 dark:text-gray-400">
                  /year
                </span>
              </p>
              <button
                // href={tier.href}
                // aria-describedby={tier.id}
                className="cursor-pointer mt-6 block w-full rounded-md px-3 py-2 text-center text-sm/6font-semibold text-indigo-600 inset-ring-1 inset-ring-indigo-200 group-data-featured/tier:bg-indigo-500 group-data-featured/tier:text-white group-data-featured/tier:shadow-xs group-data-featured/tier:inset-ring-0 hover:inset-ring-indigo-300 group-data-featured/tier:hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white/10 dark:text-white dark:inset-ring dark:inset-ring-white/5 dark:group-data-featured/tier:bg-indigo-500 dark:group-data-featured/tier:shadow-none dark:hover:bg-white/20 dark:hover:inset-ring-white/5 dark:group-data-featured/tier:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 dark:group-not-data-featured/tier:focus-visible:outline-white/75"
              >
                Get started
              </button>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-600 dark:text-gray-300"
              >
                {tier.features.map(feature => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
