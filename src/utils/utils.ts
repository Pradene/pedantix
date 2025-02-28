// utils/api.ts
export type Page = {
  title: string;
  resume: string;
};

export const getRandomPage = async (): Promise<Page | null> => {
  try {
    const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return { title: data.title, resume: data.extract };
  } catch (e) {
    console.error("Error fetching random page:", e);
    return null;
  }
};

// utils/helpers.ts
export const splitString = (str: string) => {
  return str.match(/(\p{L}+|\d+|['’]| - |[^\p{L}\d\s])/giu) || [];
};