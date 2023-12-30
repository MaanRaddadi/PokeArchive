import React, { useEffect } from "react";
import { useState } from "react";
import TypeContainer from "./TypeContainer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function InfoRender() {
  const [pokeData, setPokeData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [previousFav, setPreviousFav] = useState([]);
  const [alet, setAlert] = useState(false);
  useEffect(() => {
    setLoading(true);

    getSelectedPokemone();

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  const getSelectedPokemone = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      setPokeData(res.data);
    });
  };

  const addToFavorites = () => {
    setAlert(false);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    axios
      .post(`https://655895c4e93ca47020a97c19.mockapi.io/Favorites`, {
        User_id: currentUser.id,
        name: pokeData.name,
        id: pokeData.id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokeData.id}.png`,
        types: pokeData.types,
      })
      .then((res) => {
        console.log("added");

        setAlert(true);
      });
  };

  const addToWatched = () => {
    setAlert(false);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    axios
      .post(`https://6571419409586eff66425b41.mockapi.io/watched`, {
        User_id: currentUser.id,
        name: pokeData.name,
        id: pokeData.id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokeData.id}.png`,
        types: pokeData.types,
      })
      .then((res) => {
        console.log("added");
        setAlert(true);
      });
  };

  return (
    <>
      <div className="bg-[#f6f8fc] w-full">
        {alert && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Message sent successfully.</span>
            </div>
          </div>
        )}
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle shadow modal-open infoRender"
        >
          <div className="modal-box bg-white flex flex-col items-center p-3 max-w-sm gap-0">
            {loading === true ? (
              <span className="loading loading-spinner text-error mt-5"></span>
            ) : (
              ""
            )}
            {}
            {loading === false ? (
              <>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeData.id}.gif`}
                  className="selectedPokeImg "
                  loading="eager"
                ></img>
                <h3 className="font-bold text-lg mt-2">
                  {pokeData.name.charAt(0).toUpperCase() +
                    pokeData.name.slice(1)}
                </h3>
                <p className="py-4"></p>
                <div className="typeRowInfo">
                  {pokeData.types.map((typeName, index) => {
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
                <div className="heightWeightRow flex justify-around w-full">
                  <div className="height text-center font-bold">
                    Height
                    <h3 className="text-center rounded-xl px-5 py-2 text-wrap w-36">
                      {pokeData.height / 10}m
                    </h3>
                  </div>
                  <div className="weight text-center font-bold">
                    Weight
                    <h3 className="text-center  px-5 py-2 text-wrap rounded-xl w-36">
                      {pokeData.weight / 10}Kg
                    </h3>
                  </div>
                </div>
                <h3 className="text-center font-bold mt-3">Abilities</h3>
                <div className="abilitiesRow flex justify-around w-full mt-3 flex-wrap gap-2">
                  {pokeData.abilities.map((abilityName, index) => {
                    return (
                      <h3
                        className="text-center px-5 py-2 text-wrap rounded-xl w-36 whitespace-nowrap"
                        key={index}
                      >
                        {abilityName.ability.name}
                      </h3>
                    );
                  })}
                </div>
                <div className="flex justify-center items-center mt-3 w-full">
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="geneImg"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${pokeData.id}.png`}
                    ></img>
                    <small className="font-bold text-center">
                      Generation Vii
                    </small>
                  </div>
                  <div className="flex flex-col justify-center items-center ml-5">
                    <img
                      className="geneImg"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokeData.id}.png`}
                    ></img>
                    <small className="font-bold text-center">
                      Generation V
                    </small>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="geneImg w-32"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png`}
                    ></img>
                    <small className="font-bold text-center">Default</small>
                  </div>
                </div>

                <div className="modal-action">
                  <form method="dialog">
                    <Link to={`/`}>
                      {" "}
                      <button className="loadMoreBtn absolute top-3 left-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                          />
                        </svg>
                      </button>
                    </Link>
                    <button
                      className="btn btn-ghost btn-circle"
                      onClick={addToFavorites}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-red-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-ghost btn-circle "
                      onClick={addToWatched}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-red-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </dialog>
      </div>
    </>
  );
}

export default InfoRender;
