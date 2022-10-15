import { useState, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './shared/components/UI/Header';
import Footer from './shared/components/UI/Footer';
import Dtcs from './dtc/pages/Dtcs';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
  const { token, login, logout, userId, isAdmin } = useAuth();
  const [dtcSearchValue, setDtcSearchValue] = useState();

  const mainPage = (
    <Fragment>
      <Header setSearch={setDtcSearchValue} />
      <Dtcs search={dtcSearchValue} />
      <Footer />
    </Fragment>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: true,
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
          <Route path="/dtc/:id" element={mainPage} />
          <Route path="*" element={mainPage} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
