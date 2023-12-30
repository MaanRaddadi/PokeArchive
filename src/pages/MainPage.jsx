import React from "react";
import PokemoneCard from "../components/PokemoneCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
function MainPage() {
  const [pokemoneInfo, setPokemoneInfo] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
 const [user, setUser]= useState(JSON.parse(localStorage.getItem("user")))

if(!user){
navigate("/homepage")
}


  const getPoke = async () => {
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemone(res.data.results);
  };

  const getPokemone = async (data) => {
    data.map(async (p) => {
      const res = await axios.get(p.url);
      setPokemoneInfo((state) => {
        state = [...state, res.data];
        return state;
      });
    });
  };
  useEffect(() => {
    getPoke();
  }, [url]);

  const search = (e) => {
    setSearchText(e.target.value);
  };

  const fetchData = async () => {
    if (!searchText.trim()) {
      setLoading(false);
      setError(false);
      setSearchResult({});
      return;
    }
    setLoading(true);
    try {
      const data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`
      );
      setSearchResult(data.data);
      setError(false);
    } catch (err) {
      setError(true);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
    <NavBar/>
      <div className="flex justify-center gap-3 p-5">
        <input
          type="text"
          placeholder="Name or ID"
          className="input w-full max-w-xs bg-white text-black placeholder:text-gray-400 shadow-lg "
          onChange={search}
        />
        <button
          className=" searchBtn text-white font-extrabold p-2 px-3"
          onClick={fetchData}
        >
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="mainContainer min-h-screen p-10">
        <div className="cardContainer flex flex-wrap justify-center items-center gap-5">
          {loading && (
            <span className="loading loading-spinner text-error mt-5"></span>
          )}
          {error && (
            <span className="text-black text-center font-bold text-xl mt-5">
              Not Found !!
            </span>
          )}

          {Object.keys(searchResult).length === 0 && !loading && !error ? (
            <>
              {pokemoneInfo.map((p, index) => {
                return  <Link to={`/pokemone/${p.id}`} key={index} ><PokemoneCard pokemone={p} /></Link>;
              })}
            </>
          ) : (
            ""
          )}

          {searchResult &&
            Object.keys(searchResult).length !== 0 &&
            !loading &&
            !error && <Link to={`/pokemone/${searchResult.id} `}><PokemoneCard pokemone={searchResult} /></Link> }
        </div>
        {Object.keys(searchResult).length === 0 && !loading && !error ? (
          <div className="buttonRow mt-10 pb-5">
            <button
              className="loadMoreBtn"
              onClick={() => {
                setUrl(nextUrl);
              }}
            >
              Show More
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default MainPage;
