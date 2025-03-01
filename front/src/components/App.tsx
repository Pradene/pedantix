import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";
import PageView from "./Page";
import InputField from "./InputField";
import { Page, splitString, getRandomPage } from "../utils/utils";

const App: Component = () => {
  const [page, setPage] = createSignal<Page | null>(null);
  const [guessed, setGuessed] = createSignal<Set<string>>(new Set());
  const [words, setWords] = createSignal<string[]>([]);
  const [inputValue, setInputValue] = createSignal<string>("");

  const handleGuess = (value: string) => {
    const trimmedValue = value.trim().toLowerCase();
    if (trimmedValue) {
      setGuessed(prev => new Set([...prev, trimmedValue]));
      setInputValue("");
    }
  };

  createEffect(() => {
    getRandomPage().then((data) => {
      if (data) {
        setPage(data);
        setWords(splitString(data.content));
      }
    });
  });

  return (
    <div class="app">
      <PageView
        title={page()?.title}
        words={words()}
        guessed={guessed()}
      />
      <InputField
        value={inputValue()}
        onInput={setInputValue}
        onEnter={handleGuess}
      />
    </div>
  );
};

export default App;