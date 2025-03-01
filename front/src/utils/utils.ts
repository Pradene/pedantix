// utils/api.ts
export type Page = {
  title: string;
  content: string;
};

export const getRandomPage = async (): Promise<Page | null> => {
  try {
    const response = await fetch("http://localhost:5000/page");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return { title: data.title, content: data.content };
  } catch (e) {
    console.error("Error fetching random page:", e);
    return null;
  }
};

// utils/helpers.ts
export const splitString = (str: string) => {
  return str.match(/(\p{L}+|\d+|['’]| - |[^\p{L}\d\s])/giu) || [];
};