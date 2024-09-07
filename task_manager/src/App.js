import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import LoginPge from './components/login';
import SignUp from './components/signup';
import RequireAuth from './components/common/RequireAuth';
import HomePage from './components/homepage';
import TaskDetailsPage from './components/taskDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='login' element={<LoginPge />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='/' element={<RequireAuth />}>
            <Route index element={<HomePage />} />
            <Route path='task/:id' element={<TaskDetailsPage />} />
            <Route path='task' element={<TaskDetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
