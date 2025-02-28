import type { Component } from "solid-js";
import { createSignal, createEffect } from "solid-js";

import styles from "../styles/App.module.css";

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

  createEffect(() => {
    getRandomPage()
      .then((data) => {
        if (data) {
          setPage(data)
        }
      })
  })

  return (
    <div class={styles.app}>
      <h2 class={styles.title}>{page()?.title}</h2>
      <p class={styles.resume}>{page()?.resume}</p>
    </div>
  );
};

export default App;
