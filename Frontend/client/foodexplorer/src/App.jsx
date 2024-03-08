import React from 'react'
import List from './Components/List'
import InsertData from './Components/InsertData'
import UpdateData from './Components/UpdateData'
import LoginPage from './Components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<List/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path = '/insertData' element = {<InsertData/>}></Route>
        <Route path='/updateData/:id' element = {<UpdateData/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
