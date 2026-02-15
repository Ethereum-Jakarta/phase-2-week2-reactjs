export const numToPrice = (num: number) => num.toLocaleString("id-ID", {style: "currency", currency: "IDR" });

export const calculateDiscount = (price: number, discount: number) => Math.round(price / (1-discount));

export const pickBgColorBasedOnString = (str: string) => ["bg-rose-400", "bg-green-400", "bg-blue-400"][str.charCodeAt(0) % 3];
