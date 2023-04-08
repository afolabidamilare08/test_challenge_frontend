import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import { HomePage } from './container/homePage';
import { EditPage } from './container/EditPage';


function App() {


  Axios.defaults.baseURL = "http://localhost:5000/"; 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={ <HomePage/> } />
        <Route path="/edit_user/:name" exact element={ <EditPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
