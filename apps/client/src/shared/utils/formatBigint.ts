export const formatBigint = (
  value: bigint,
  symbol = 'sETH',
  decimals = 18,
  slice = 4,
): string => {
  const isNegative = value.toString()?.[0] === '-';
  const val = value.toString().replace('-', '');

  let formatted = '';
  if (val.length <= decimals) {
    formatted = `0.${val.padStart(decimals, '0')}`;
  } else {
    formatted = `${val.slice(0, val.length - decimals)}.${val.slice(val.length - decimals)}`;
  }

  if (slice) {
    const sliced = formatted.split('.');
    formatted = `${sliced[0]}.${sliced[1].slice(0, slice)}`;
  }

  return `${isNegative ? '-' : ''}${formatted} ${symbol}`;
};
