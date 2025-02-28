import type { Component } from "solid-js";

type WordProps = {
  word: string;
  isVisible: boolean;
};

const Word: Component<WordProps> = (props) => {
  return (
    <span>
      {props.isVisible ? (
        <span class="word">{props.word}</span>
      ) : (
        <span class={`wordHidden${props.word.length}`}></span>
      )}
    </span>
  );
};

export default Word;