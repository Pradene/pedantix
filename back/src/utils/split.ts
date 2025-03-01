export const splitString = (str: string) => {
  return str.match(/(\p{L}+|\d+|['’]| - |[^\p{L}\d\s])/giu) || [];
};
