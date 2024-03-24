export const isAddress = (str: string) => !!str.toLowerCase().match(/(\b0x[a-f0-9]{40}\b)/g);
