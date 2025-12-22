/* eslint-disable no-unused-vars */
export enum PlanNameEnum {
  BASIC = 'BASIC',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}

// Plan type definition
export interface Plan {
  name: PlanNameEnum;
  stripe_prices: {
    monthly: string;
    yearly: string;
  };
  stripe_product_id: string;
  trial_period_days: number;
  features: {
    max_projects: number | typeof Infinity;
    max_storage_mb: number | typeof Infinity;
    max_api_calls: number | typeof Infinity;
    team_members: number | typeof Infinity;
    export_pdf: boolean;
    ai_credits: number | typeof Infinity;
    slack_integration: boolean;
    white_labeling: boolean;
    support_level: string;
    response_time_hours: number;
  };
}
