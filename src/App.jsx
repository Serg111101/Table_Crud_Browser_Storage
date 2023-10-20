import React from 'react';
import { Routes,Route } from 'react-router-dom';
import {Home} from "./pages/Home";
import {Add} from "./pages/Add";
import { Edit } from './pages/Edit';
import {Detail} from "./pages/Detail";
import {NotFound} from "./components/NotFound"

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>

    </div>
  );
}

export default App