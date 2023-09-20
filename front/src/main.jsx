import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PrivacyPolicies from './components/PrivacyPolicies';
import "./index.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path='/' exact/>
        <Route element={<PrivacyPolicies/>} path='/privacy_policies'/>
      </Routes>
    </BrowserRouter>,
)
