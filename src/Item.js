import React from "react";

export function Item({ item, index, minItem, selectedItemIndex }) {
  return (
    <span
      className={
        selectedItemIndex === index
          ? "grid-item slected-grid-item"
          : minItem === index
          ? "grid-item slected-min-grid-item"
          : "grid-item normal-grid-item-animation"
      }
      key={index}
    >
      <span>{item}</span>
      <span className="index">i = {index}</span>
    </span>
  );
}
