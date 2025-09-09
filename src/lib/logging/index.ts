/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const isProduction = process.env.NODE_ENV === 'production';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdditionalAttributes = { message?: string } & Record<string, any>;
declare global {
  interface Window {
    newrelic: {
      noticeError: (
        error: Error,
        customAttributes?: AdditionalAttributes
      ) => void;
      log: (message: string, customAttributes?: AdditionalAttributes) => void;
    };
  }
}

function logToNewRelic(error: Error, customAttributes?: AdditionalAttributes) {
  if (
    typeof window.newrelic !== 'undefined' &&
    typeof window.newrelic.noticeError === 'function'
  ) {
    window.newrelic.noticeError(error, customAttributes);
  } else {
    console.error('New Relic not initialized or unavailable');
    console.error(error);
  }
}

function logMessageToNewRelic(
  message: string,
  customAttributes?: AdditionalAttributes
) {
  if (
    typeof window.newrelic !== 'undefined' &&
    typeof window.newrelic.log === 'function'
  ) {
    window.newrelic.log(message, customAttributes);
  } else {
    console.error('New Relic not initialized or unavailable');
    console.error(message);
  }
}

function logError(
  error: Error,
  additionalAttributes?: AdditionalAttributes
): void {
  const issues = error && 'issues' in error ? error.issues : undefined;

  const attrs: AdditionalAttributes | undefined = issues
    ? { ...additionalAttributes, issues }
    : (additionalAttributes ?? undefined);

  if (isProduction) {
    logToNewRelic(error, attrs);
  } else {
    console.error(error, attrs);
  }
}

function logMessage(
  message: string,
  additionalAttributes?: AdditionalAttributes
): void {
  if (isProduction) {
    logMessageToNewRelic(message, additionalAttributes);
  } else {
    console.error(message, additionalAttributes);
  }
}

export { logError, logMessage };
