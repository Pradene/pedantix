import type { Component } from "solid-js";

type InputFieldProps = {
  value: string;
  onInput: (value: string) => void;
  onEnter: (value: string) => void;
};

const InputField: Component<InputFieldProps> = (props) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      props.onEnter(props.value);
    }
  };

  return (
    <div class="inputField">
      <input
        class="input"
        type="text"
        value={props.value}
        onInput={(e) => props.onInput(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        aria-label="Guess a word"
        placeholder="Guess a word"
      />
    </div>
  );
};

export default InputField;