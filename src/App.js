import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Header } from "./Header";
import { Footer } from "./Footer";

const initialItemsList = [90, 101, 4, 200, 3, 0, 18, 2, 6];

export default function App() {
  const [itemsList, setItemsList] = useState(initialItemsList);
  const [speed, setSpeed] = useState(1000);
  const [minItem, setMinItem] = useState(0);
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

  const swapItems = (oldValue) => {
    setItemsList(
      itemsList.map((item, index) =>
        index === 0 ? itemsList[minItem] : index === minItem ? oldValue : item
      )
    );
    console.log("swap called!\n " + itemsList);
  };

  return (
    <div className="App container">
      <Header />
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
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Start the interval when the component renders
  useEffect(() => {
    const updateValue = () => {
      setSelectedItemIndex((prevIndex) => {
        let currentIndex = (prevIndex + 1) % itemsList.length;
        let old = itemsList[currentIndex];
        console.log("minIndexItem: " + minItem);

        if (itemsList[currentIndex] < itemsList[minItem]) {
          changeMinItem(currentIndex);
        }

        selectedItemIndex === itemsList.length - 1 && swapItems(old);
        selectedItemIndex === 0 && changeMinItem(0);
        console.log(itemsList);
        return currentIndex;
      });
    };
    const intervalId = playPause && setInterval(updateValue, speed);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [
    speed,
    playPause,
    itemsList,
    minItem,
    changeMinItem,
    selectedItemIndex,
    swapItems,
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
      {item}
    </span>
  );
}
