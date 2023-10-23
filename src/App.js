import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/core/Header/Header';
import Home from './components/shared/Home/Home';
import Contact from './components/shared/Contact/Contact';
import Footer from './components/core/Footer/Footer';

function App() {
  return (
    <div className="content">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contacts" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
