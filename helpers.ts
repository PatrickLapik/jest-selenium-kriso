  export function parsePrice(price: string) {
    const cleanPrice = price.match(/\d+,\d+/g);
    if (!cleanPrice) return;
    const float = parseFloat(cleanPrice[0].replace(",", "."));
    if (!float) return;
    return float;
  }
