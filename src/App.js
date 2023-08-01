import React, { useState, useEffect } from "react";
import "./index.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

const initialItemsList = [90, 101, 4, 200, 3, 18, 2, 100, 1, 10, 6, 11];

export default function App() {
  const [itemsList, setItemsList] = useState(initialItemsList);
  const [speed, setSpeed] = useState(1000);
  const [minItem, setMinItem] = useState();
  const [playPause, setPlayPause] = useState(false);

  function handlePlay() {
    setPlayPause(!playPause);
  }
  function changeMinItem(i) {
    setMinItem(i);
  }

  function handleSpeed(e) {
    setSpeed(1000 - Number(e.target.value));
  }

  const swapItems = (oldValue, slectedItem) => {
    setItemsList(
      itemsList.map((item, index) =>
        index === slectedItem
          ? itemsList[minItem]
          : index === minItem
          ? oldValue
          : item
      )
    );
    console.log("swap called!\n " + itemsList);
  };

  return (
    <div className="App container">
      <Header initialList={initialItemsList} />
      <Main
        itemsList={itemsList}
        speed={speed}
        minItem={minItem}
        changeMinItem={changeMinItem}
        playPause={playPause}
        swapItems={swapItems}
      />
      <Footer
        handleSpeed={handleSpeed}
        speed={speed}
        playPause={playPause}
        handlePlay={handlePlay}
      />
    </div>
  );
}

function Main({
  itemsList,
  speed,
  minItem,
  changeMinItem,
  playPause,
  swapItems,
}) {
  let [startLoopIndex, setStartLoopIndex] = useState(0); //  state variable to track the starting index of the loop
  const [selectedItemIndex, setSelectedItemIndex] = useState(startLoopIndex);

  // Start the interval when the component renders
  useEffect(() => {
    const updateValue = () => {
      setSelectedItemIndex((prevIndex) => {
        let currentIndex = (prevIndex + 1) % itemsList.length;
        if (currentIndex === itemsList.length) currentIndex = startLoopIndex;

        console.log("previous Index: " + prevIndex);
        console.log("start loop: " + startLoopIndex);
        console.log("current Index: " + currentIndex);

        // start Swapping
        {
          let old = itemsList[currentIndex];
          if (itemsList[currentIndex] < itemsList[minItem]) {
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

function Item({ item, index, minItem, selectedItemIndex }) {
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
