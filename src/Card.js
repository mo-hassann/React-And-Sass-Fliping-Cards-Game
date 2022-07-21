import { React } from "react";

export default function Card({ id, uniqueId, content, cardClicked, status, isStart }) {
  return (
    <div className={`card${status || isStart ? " flip" : ""}`} onClick={() => cardClicked(uniqueId, id)}>
      <div className="card__side card__side--front">
        <span>{content}</span>
      </div>
      <div className="card__side card__side--back">
        <span>😀</span>
      </div>
    </div>
  );
}
