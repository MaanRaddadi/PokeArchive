import React, { useEffect, useState } from "react";
import TypeContainer from "./TypeContainer";

function PokemoneCard({ pokemone }) {
  return (
    <>
      <div className="pokemoneCard">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokemone.id}.png`}
          alt="somePokemone"
          className="pokemoneCardImg"
        ></img>
        <h3 className="pokemoneName">{`${
          pokemone.name.charAt(0).toUpperCase() + pokemone.name.slice(1)
        }`}</h3>
        <small className="pokemoneNum">No. {pokemone.id}</small>
        <div className="typeRow">
          {pokemone.types.map((typeName, index) => {
            return (
              <TypeContainer
                key={index}
                type={
                  typeName.type.name.charAt(0).toUpperCase() +
                  typeName.type.name.slice(1)
                }
              ></TypeContainer>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PokemoneCard;
