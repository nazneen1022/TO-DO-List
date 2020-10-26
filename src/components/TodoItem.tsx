// src/components/TodoItem.tsx
import React from "react";
import { Item } from "../model";

type Props = {
  // we should receive a todo item object
  item: Item;

  // and a function that we don't have to give
  //  anything, and doesn't return anything either
  //  (it "just does" something)
  toggleDone: () => void;

  // ..and maybe we'll add some more stuff later,
  //  this will be enough for now
};

export default function TodoItem(props: Props) {
  return (
    <p>
      {/*<button>[{props.item.isDone ? "X" : " "}]</button>*/}
      <button onClick={props.toggleDone}>
        [{props.item.isDone ? "X" : " "}]
      </button>
      {"   "}
      {props.item.isDone ? (
        <strong>{props.item.text}</strong>
      ) : (
        <s>{props.item.text}</s>
      )}
      (
      {props.item.tags.map((tag) => {
        return `${tag},`;
      })}
      )
    </p>
  );
}
