import React from 'react'
import { Route, Routes } from 'react-router-dom'
import InfoRender from './InfoRender'
import MainPage from '../pages/MainPage'
import LandingPage from '../pages/LandingPage'
import SignUp from '../pages/SignUp'
import Favorites from '../pages/Favorites'
import Watched from '../pages/Watched'
function Routing() {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
        <Route path='/pokemone/:id' element={<InfoRender/>}></Route>
        <Route path='/homepage' element={<LandingPage/>}></Route>
        <Route path='/signUp' element={<SignUp/>}></Route>
        <Route path='/favorites' element={<Favorites/>}></Route>
        <Route path='/watched' element={<Watched/>}></Route>
    </Routes>
  )
}

export default Routing