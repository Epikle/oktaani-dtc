import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './shared/components/UI/Header';
import Footer from './shared/components/UI/Footer';
import Dtcs from './dtc/pages/Dtcs';
import Auth from './user/Auth';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  const [dtcSearchValue, setDtcSearchValue] = useState();
  const [dtcListChanged, setDtcListChanged] = useState(false);

  const dtcListHandler = () => {
    setDtcListChanged((prevS) => !prevS);
  };

  const mainPage = (
    <React.Fragment>
      <Header setSearch={setDtcSearchValue} setIsChanged={dtcListHandler} />
      <Dtcs
        search={dtcSearchValue}
        isChanged={dtcListChanged}
        setIsChanged={dtcListHandler}
      />
      <Footer />
    </React.Fragment>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        isAdmin: isAdmin,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/admin" element={<Auth />} />
          <Route path="/dtc/:id" element={mainPage} />
          <Route path="*" element={mainPage} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
