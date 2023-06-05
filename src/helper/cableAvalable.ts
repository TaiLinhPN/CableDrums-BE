export const cablesAvailable = (contract) => {
  return (
    (contract.cableDrumCount as number) -
    (contract.cableDelivered as number) -
    (contract.cableRequired as number)
  );
};
