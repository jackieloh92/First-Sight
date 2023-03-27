import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Moderator from "./pages/Moderator";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/onboarding"} element={<Onboarding />} />
        <Route path={"/moderator"} element={<Moderator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
