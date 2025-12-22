/**
 * Routes Constants
 * @readonly
 *
 * Specific naming convention to ensure consistency and readability:
 *
 * 1. Single underscore (_):
 *    It acts as a visual separator to enhance the readability of compound names.
 *    Example: BUSINESS_DETAILS maps to "business-details" in the URL.
 *
 * 2. Double underscore (__):
 *    Indicates a nested route or a sub-route within a route.
 *    Example: ONBOARDING__BUSINESS represents the "business" sub-route nested within the "onboarding" route
 *
 * Convention Guide for Future Developers:
 * - Use uppercase letters for route constants for consistency and distinction.
 * - Apply a single underscore to represent spaces or hyphens in compound names.
 * - Utilize double underscores to express nesting of routes and subpages.
 * - When introducing new routes, adhere to these conventions for uniformity.
 * - Structure new routes logically, mirroring the nested nature of the application's UI and URL paths.
 *
 */

export const ROUTES = Object.freeze({
  ROOT: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  SIGNOUT: '/signout',
  OTP: '/otp',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
  PAYMENT_SUCCESSFUL: '/payment-successful',
  PRICING: '/pricing',
});
