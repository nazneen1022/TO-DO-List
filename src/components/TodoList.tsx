// src/components/TodoList.tsx
import React, { useState } from "react";

import { Item } from "../model"; // we need to import the type
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [list, setList] = useState<Item[]>([
    {
      id: 0,
      text: "Make this app",
      tags: ["react", "typescript"],
      isDone: true,
    },
    {
      id: 1,
      text: "Fall in love with TypeScript",
      tags: ["romantic", "typescript"],
      isDone: false,
    },
  ]);

  const [requiredTags, setRequiredTags] = useState<string[]>([]);
  const tags = Array.from(new Set(list.map((item) => item.tags).flat()));

  function toggle(id: number) {
    setList(
      list.map((listItem) => {
        let toggleItem;
        if (listItem.id === id) {
          toggleItem = { ...listItem, isDone: !listItem.isDone };
        } else {
          toggleItem = { ...listItem };
        }

        return toggleItem;
      })
    );
  }

  const toggleTagRequired = (tag: string) => {
    if (requiredTags.includes(tag)) {
      //console.log("Splice:", requiredTags.splice(requiredTags.indexOf(tag), 1));
      setRequiredTags(requiredTags.filter((reqTag) => reqTag !== tag));
    } else {
      setRequiredTags([...requiredTags, tag]);
    }
  };

  const filteredList = list.filter((item) => {
    for (let tag of requiredTags) {
      if (!item.tags.includes(tag)) {
        return false;
      }
    }
    return true;
  });

  //console.log("Nazneen:", filteredList);

  return (
    <div>
      <p>
        Filter by Tags :{" "}
        {tags.map((tag) => {
          return (
            <button key={tag} onClick={() => toggleTagRequired(tag)}>
              {requiredTags.includes(tag) ? <strong>{tag}</strong> : tag}
            </button>
          );
        })}
      </p>
      {filteredList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            toggleDone={() => toggle(item.id)}
          />
        );
      })}
    </div>
  );
}
