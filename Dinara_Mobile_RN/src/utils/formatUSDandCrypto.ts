const formatCryptoAndUsd = (
  num: number,
  type: string,
  withoutComma?: boolean
) => {
  if (num === undefined || num === null) {
    return "0.00";
  }

  if (type === "USD" || type?.includes("USDC")) {
    const numFormatterUSD = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    if (withoutComma) {
      const formattedUsdWithoutComma = Number.isNaN(num)
        ? "0.00"
        : Number(num?.toFixed(2));
      return formattedUsdWithoutComma;
    }
    const formattedUsd = Number.isNaN(num)
      ? "0.00"
      : numFormatterUSD.format(num);
    return formattedUsd;
  }

  const cryptoFormatterUSD = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: 6,
  });
  const formattedCryptoResult = Number.isNaN(num)
    ? "???????"
    : cryptoFormatterUSD.format(num);
  return formattedCryptoResult;
};

export default formatCryptoAndUsd;
