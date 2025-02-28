import type { Component } from "solid-js";
import Word from "./Word";

type PageViewProps = {
  title?: string;
  words: string[];
  guessed: Set<string>;
};

const PageView: Component<PageViewProps> = (props) => {
  const isPunctuation = (word: string): boolean => {
    return /^[^\p{L}\d\s'’]$/u.test(word);
  };

  return (
    <div class="page">
      <h2 class="title">{props.title}</h2>
      <div class="resume">
        {props.words.map((word, index) => (
          <Word
            key={index}
            word={word}
            isVisible={props.guessed.has(word.toLowerCase()) || isPunctuation(word)}
          />
        ))}
      </div>
    </div>
  );
};

export default PageView;