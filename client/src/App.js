// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Swap, NotFound } from './pages'
import { Navbar } from './components'
import './assets/css/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/mytoken" element={<MyToken />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
