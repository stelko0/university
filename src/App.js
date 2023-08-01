import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/core/Header/Header';
import Home from './components/shared/Home/Home';

function App() {
  return (
    <div className="content">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
