

export const paidAmount = (amount: string, percentage = 10) => {
  let parseAmount;
  if (typeof amount !== 'number') {
    parseAmount = parseFloat(amount.replace(',', '').replace(' ', ''));
  } else {
    parseAmount = amount;
  }
  return (parseAmount - (parseAmount * percentage) / 100);
};

export const percentagePay = (amount: number | string, percentage = 1) => {
  let parseAmount;
  if (typeof amount !== 'number') {
    parseAmount = parseFloat(amount.replace(',', '').replace(' ', ''));
  } else {
    parseAmount = amount;
  }
  return (parseAmount * percentage) / 100;
};

export const convertToCurrency = (value: number) => {
  let parseAmount;
  if (typeof value !== 'number') {
       parseAmount = parseFloat((value as string).replace(',', '').replace(' ', ''));
  } else {
       parseAmount = value;
  }
  return new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
}).format(parseAmount);
};

export const nairaToKobo = (amount:number) => {
      return parseFloat((amount * 100).toFixed(0));
};

export const koboToNaira = (amount:number) => {
      return parseFloat((amount / 100).toFixed(2));
};


export const calculateTransferFee = (amount: number): number => {
  if (amount <= 5000) {
    return 10;
  } else if (amount > 5000 && amount <= 50000) {
    return 25;
  } else {
    return 50;
  }
};
