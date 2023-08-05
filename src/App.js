import React, { useState } from "react";
import "./index.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";

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
        setPlayPause={setPlayPause}
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
