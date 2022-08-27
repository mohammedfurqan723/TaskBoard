// import { useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  // const navigate = useNavigate();

  // useEffect( () => {
  //   navigate('/home');
  // },[]);

  
  
  return (
    <div className="App">
      <Routes>
        <Route path='/home/*' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
