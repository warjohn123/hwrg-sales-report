export const CHICKY_OINK_BASE_SALES = 31000;
export const CHICKY_OINK_MAX_SALES = 200000;
export const CHICKY_OINK_STEP = 6000;
export const CHICKY_OINK_BASE_COMMISSION = 100;

export function getChickyOinkCommission(totalSales: number) {
  if (
    totalSales < CHICKY_OINK_BASE_SALES ||
    totalSales > CHICKY_OINK_MAX_SALES
  ) {
    return 0; // Outside of defined bracket
  }

  const bracketIndex = Math.floor(
    (totalSales - CHICKY_OINK_BASE_SALES) / CHICKY_OINK_STEP
  );
  return CHICKY_OINK_BASE_COMMISSION + bracketIndex * 100;
}
