import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={ <RegisterPage /> } />
        </Route> 
    </Routes>
</div>
  );
}

export default App;
