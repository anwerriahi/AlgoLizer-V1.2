import React from "react";

export function Header({ initialList }) {
  return (
    <header>
      Selection Sort
      <p className="unsorted">
        Unsorted List: [
        {initialList.map((i, index) => (
          <span key={index}> {i}, </span>
        ))}
        ]
      </p>
    </header>
  );
}
