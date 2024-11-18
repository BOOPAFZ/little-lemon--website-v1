import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import About from "./pages/About"
import Book from "./pages/Book"
import Menu from "./pages/Menu"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Reservation from "./pages/Reservation"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={
          <ProtectedRoute>
            
          </ProtectedRoute>
        }/> */}
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Menu" element={<Menu />}/>
        <Route path="/Book" element={<Book />}/>
        <Route path="/About" element={<About />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Reservation" element={<Reservation />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
