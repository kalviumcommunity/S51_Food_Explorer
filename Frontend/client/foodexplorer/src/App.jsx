import React from 'react'
import List from './Components/List'
import InsertData from './Components/InsertData'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<List/>}></Route>
        <Route path = '/insertData' element = {<InsertData/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
