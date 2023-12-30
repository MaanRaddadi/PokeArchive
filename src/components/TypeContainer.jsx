import React from "react";

function TypeContainer({ type }) {
  let color;
 
  switch (type) {
    case "Fire":
      color = "#fd7d24";
      break;
    case "Water":
      color = "#4592c4";
      break;
    case "Bug":
      color = "#729f3f";
      break;
    case "Poison":
      color = "#b97fc9";
      break;
    case "Normal":
      color = "#a4acaf";
      break;
    case "Electric":
      color = "#eed535";
      break;
    case "Ground":
      color = "#ab9842";
      break;
    case "Fairy":
      color = "#fdb9e9";
      break;
    case "Grass":
      color = "#9bcc50";
      break;
    case "Fighting":
      color = "#d56723";
      break;
    case "Psychic":
      color = "#f366b9";
      break;
    case "Ice":
      color = "#51c4e7";
      break;
    case "Ghost":
      color = "#7b62a3";
      break;
    case "Flying":
      color = "#85aeff";
      break;
    case "Steel":
      color = "#bcbdc9";
      break;

    case "Rock":
      color = "#ded5d5";
      break;
    case "Dragon":
      color = "#85aeff";
      break;
    case "Dark":
      color = "#524a4a";
      break;
  }

  return (
    <div className="typeContainer" style={{ backgroundColor: color }}>
      {type}
    </div>
  );
}

export default TypeContainer;
