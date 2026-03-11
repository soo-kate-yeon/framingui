export const DEFAULT_CHECKOUT_SUCCESS_PATH = '/settings/billing?checkout=success';

export function buildCheckoutSuccessUrl(
  origin: string,
  returnPath = DEFAULT_CHECKOUT_SUCCESS_PATH
) {
  return new URL(returnPath, origin).toString();
}
