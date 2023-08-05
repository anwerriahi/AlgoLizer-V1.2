import React, { useState, useEffect } from "react";
import { Item } from "./Item";

export function Main({
  itemsList,
  speed,
  minItem,
  changeMinItem,
  playPause,
  setPlayPause,
  swapItems,
}) {
  // eslint-disable-next-line no-unused-vars
  let [startLoopIndex, setStartLoopIndex] = useState(0); //  state variable to track the starting index of the loop
  const [selectedItemIndex, setSelectedItemIndex] = useState(startLoopIndex);

  // Start the interval when the component renders
  useEffect(() => {
    const updateValue = () => {
      setSelectedItemIndex((prevIndex) => {
        let currentIndex = (prevIndex + 1) % itemsList.length;

        console.log("previous Index: " + prevIndex);
        console.log("start loop: " + startLoopIndex);
        console.log("current Index: " + currentIndex);

        // start Swapping
        {
          let old = itemsList[currentIndex];
          if (old < itemsList[minItem]) {
            changeMinItem(currentIndex);
          }

          selectedItemIndex === itemsList.length - 1 &&
            swapItems(old, startLoopIndex);
          selectedItemIndex === 0 && changeMinItem(startLoopIndex);
        }
        // end Swapping

        // if (currentIndex === itemsList.length - 1) {
        //   setStartLoopIndex((s) => s + 1);
        // }

        // if (currentIndex === itemsList.length) {
        //   currentIndex = startLoopIndex;
        // }

        return currentIndex;
      });
    };

    const intervalId =
      playPause &&
      startLoopIndex < itemsList.length &&
      setInterval(updateValue, speed);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [
    speed,
    playPause,
    itemsList,
    minItem,
    changeMinItem,
    selectedItemIndex,
    swapItems,
    startLoopIndex,
  ]);

  return (
    <main>
      {itemsList.map((item, index) => (
        <Item
          item={item}
          index={index}
          minItem={minItem}
          selectedItemIndex={selectedItemIndex}
          key={index}
        />
      ))}
    </main>
  );
}
