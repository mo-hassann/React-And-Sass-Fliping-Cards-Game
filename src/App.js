import React, { useState, useEffect } from "react";
import { setting } from "./setting";

import Card from "./Card";
import Timer from "./Timer";
import Confetti from "react-confetti";

export default function Main() {
  const [isStart, setIsStart] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  // getting new cards randomly and seting cardsData to the new cards
  function getCards() {
    let myCardsData = setting.data.slice(0, setting.cards).map((content) => {
      const id = Math.random();
      return {
        id: id,
        content: content,
        status: undefined /* right , wrong , check */,
      };
    });
    myCardsData = [...myCardsData, ...myCardsData]
      .map((card) => {
        const uniqueId = Math.random();
        return {
          ...card,
          uniqueId: uniqueId,
        };
      })
      .sort(() => 0.5 - Math.random());

    setCardsData(myCardsData);
  }

  // handle card clicks
  function cardClicked(uniqueId, id) {
    const currentCard = cardsData.find((card) => card.uniqueId === uniqueId);
    console.log(currentCard);
    if (currentCard.status === "right") return;

    setCardsData((prCardData) => {
      const cardsCheck = prCardData.find((card) => card.status === "check");

      if (cardsCheck && cardsCheck.id === id) {
        return prCardData.map((card) => (card.id === id ? { ...card, status: "right" } : card));
      }

      if (cardsCheck && cardsCheck.id !== id) {
        return prCardData.map((card) => (card.status === "check" || card.uniqueId === uniqueId ? { ...card, status: "wrong" } : card));
      }

      return prCardData.map((card) => (card.uniqueId === uniqueId ? { ...card, status: "check" } : card));
    });
  }

  // starting new game by geting new cards and seting is start to true
  function startNewGame() {
    getCards();
    setIsStart(true);
    setIsFinish(false);
  }

  // flipping wrong cards
  function flipWrongCards() {
    if (cardsData.some((card) => card.status === "wrong")) {
      setTimeout(() => {
        setCardsData((prCardData) => {
          return prCardData.map((card) => (card.status === "wrong" ? { ...card, status: undefined } : card));
        });
      }, setting.timeToShowWrong * 1000);
    }
  }

  // checking the end of game when all cards data status equal "right"
  function checkGameEnd() {
    if (cardsData.length !== 0 && cardsData.every((card) => card.status === "right")) {
      console.log("done");
      setIsFinish(true);
    }
  }

  // checking the end of the game and flip wrong cards when cardsData changes
  useEffect(() => {
    flipWrongCards();
    checkGameEnd();
  });

  // set start to false after seconds to flip the cards and start the timer
  useEffect(() => {
    if (isStart === true) {
      setTimeout(() => setIsStart(false), setting.timeToShowAllCards * 1000);
    }
  }, [isStart]);

  // geting new random cards when the game starts
  useEffect(() => {
    getCards();
  }, []);
  return (
    <div className="app">
      <Timer isStart={isStart} />
      <div className="cards">
        {cardsData?.map((card) => (
          <Card key={card.uniqueId} isStart={isStart} cardClicked={cardClicked} uniqueId={card.uniqueId} id={card.id} content={card.content} status={card.status} />
        ))}
      </div>
      <button onClick={startNewGame} className={`btn ${isStart ? "hidden" : ""}`}>
        {isFinish ? "play again" : "reset game"}
      </button>
      {isFinish && <Confetti />}
    </div>
  );
}

/* 
    function cardClicked(uniqueId, id) {
    if (cardsData.find((card) => card.uniqueId === uniqueId).status === "right") return;
    setCardsData((prCardData) => {
      if (prCardData.find((card) => card.status === "check")) {
        if (prCardData.find((card) => card.status === "check").id === id) {
          return prCardData.map((card) => (card.id === id ? { ...card, status: "right" } : card));
        } else {
          return prCardData.map((card) => (card.status === "check" || card.uniqueId === uniqueId ? { ...card, status: "wrong" } : card));
        }
      } else {
        return prCardData.map((card) => (card.uniqueId === uniqueId ? { ...card, status: "check" } : card));
      }
    });
  }
  */
