import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import TypeContainer from '../components/TypeContainer';
import { Link } from 'react-router-dom';

function Watched() {
 
    const [pokemoneInfo, setPokemoneInfo] = useState([]);
    const [loading, setLoading] = useState(true);
   useEffect(() => {
    setLoading(true)
       axios.get("https://6571419409586eff66425b41.mockapi.io/watched").then((res)=>{
        res.data.find((poke,index)=>{
        
           if(poke.User_id===JSON.parse(localStorage.getItem("user")).id){
                setPokemoneInfo((state)=>{
                    state=[...state,poke]
                    return state
                })
            
          }
        })
       })
       setTimeout(()=>{
        setLoading(false) 
       },1200)
       
   },[])



  return (
    <div className='mainContainer min-h-screen p-10'>
        <Link to={`/`}>      <button className="loadMoreBtn absolute top-3 left-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>
</button>
</Link>  
<h1 className='text-center font-bold text-xl'>Watched:</h1>
{loading && (
           <div className='w-full flex justify-center'> <span className="loading loading-spinner text-error mt-5 text-center"></span></div>
          )}

   {loading === false ?  <div className="card-container flex flex-wrap justify-center items-center w-full">


        {pokemoneInfo.map((poke,index)=>{
          return(
            <div className="pokemoneCard" key={index}>
            <img
              src={`${poke.img}`}
              alt="somePokemone"
              className="pokemoneCardImg"
            ></img>
            <h3 className="pokemoneName">{`${
              poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
            }`}</h3>
            <small className="pokemoneNum">No. {poke.id}</small>
            <div className="typeRow">
              {poke.types.map((typeName, index) => {
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
)
        })}


    </div>:""}
    </div>
  )
    
 
}

export default Watched