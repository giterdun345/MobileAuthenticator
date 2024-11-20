import React from "react";

export default function formatCondensedAddress(address: string) {
  if (!address) return undefined;

  const firstSix = address.slice(0, 6);
  const lastFour = address.slice(-4);

  return `${firstSix}...${lastFour}`;
}
