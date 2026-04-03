import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Login from './member/Login';
import Register from './member/Register';
import CarWrite from './admin/CarWrite';
import CarList from './admin/CarList';
import LeaseConsultList from './admin/LeaseConsultList';
import QuickConsultList from './admin/QuickConsultList';
import EasyConsultList from './admin/EasyConsultList';
import EasyConsultView from './admin/EasyConsultView';
import LeaseConsultView from './admin/LeaseConsultView';
import QuickConsultView from './admin/QuickConsultView';

import ConsultCarSelect from './page/ConsultCarSelect';
import ConsultCarInquery from './page/ConsultCarInquery';
import './css/default.css';
import './css/common.css';

function App() {
  const [loginUser, setLoginUser] = useState<string | null>(null);

  useEffect(() => {
    const loginck = localStorage.getItem('login');
    if(loginck){
      setLoginUser(loginck)
    }
  }, [])

  return (
    <BrowserRouter>
      <Header loginUser={loginUser} setLoginUser={setLoginUser}/>
      <main>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/admin/cars/write" element={<CarWrite loginUser={loginUser} />}></Route>
        <Route path="/admin/cars/write/:carid" element={<CarWrite loginUser={loginUser} />}></Route>
        <Route path="/admin/cars/list" element={<CarList loginUser={loginUser} />}></Route>

        <Route path="/admin/consult/lease/list" element={<LeaseConsultList loginUser={loginUser} />}></Route>
        <Route path="/admin/consult/quick/list" element={<QuickConsultList loginUser={loginUser} />}></Route>
        <Route path="/admin/consult/easy/list" element={<EasyConsultList loginUser={loginUser} />}></Route>

        <Route path="/admin/consult/easy/view/:consultid" element={<EasyConsultView loginUser={loginUser} />}></Route>
        <Route path="/admin/consult/lease/view/:consultid" element={<LeaseConsultView loginUser={loginUser} />}></Route>
        <Route path="/admin/consult/quick/view/:consultid" element={<QuickConsultView loginUser={loginUser} />}></Route>

        <Route path="/consult/carselect" element={<ConsultCarSelect />}></Route>
        <Route path="/consult/carselect/:carid" element={<ConsultCarInquery />}></Route>

        <Route path="/login" element={<Login setLoginUser={setLoginUser} />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
