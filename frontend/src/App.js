import React,{useState} from "react";

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/context/Notes/NoteState'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  
  return (
    <div className="App">
      <NoteState>
      <Router>
     <Navbar/>
    
     <Routes>
      <Route path='/' element={<Home/>} ></Route>
      
      <Route path='/about' element={<About/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/signup' element={<Signup/>} ></Route>
     </Routes>
     
     
     </Router>
   </NoteState>
    </div>
  );
}

export default App;
