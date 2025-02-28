import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";

type Page = {
  title: string;
  resume: string;
}

const getRandomPage: () => Promise<Page | null> = async () => {
  try {
    const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const title = data.title;
    const resume = data.extract;

    const result = {
      title,
      resume,
    }

    return result;
    
  } catch (e) {
    console.error("Error fetching random page:", e);
  }
}

const App: Component = () => {

  const [page, setPage] = createSignal<Page | null>(null);
  const [words, setWords] = createSignal<string[]>([]);

  const wordsToCheck = ["the", "is"];

  const wordExists = (word: string) => {
    return wordsToCheck.some((checkWord) => word.toLowerCase() === checkWord.toLowerCase());
  };

  const splitString = (str: string) => {
    return str.match(/\w+|[^\w\s]/g) || [];
  }

  createEffect(() => {
    getRandomPage().then((data) => {
      if (data) {
        setPage(data)
        setWords(splitString(data.resume));
      }
    });
  });

  return (
    <div class="app">
      <div class="page">
        <h2 class="title">{page()?.title}</h2>
        <div class="resume">
          {words().map((word, index) => (
            <span key={index}>
              {wordExists(word) || /[^\w\s]/.test(word) ? (
                <span class="word">{word}</span> // Word found, display it
              ) : (
                <span class={`wordHidden${word.length}`}></span> // Word not found, display black div
              )}
            </span>
          ))}
        </div>
      </div>
      <input class="input" type="text" placeholder="Write something" />
    </div>
  );
};

export default App;
