import { useState, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './shared/components/UI/Header';
import Footer from './shared/components/UI/Footer';
import Dtcs from './dtc/pages/Dtcs';

const queryClient = new QueryClient();

function App() {
  const [dtcSearchValue, setDtcSearchValue] = useState();

  const mainPage = (
    <Fragment>
      <Header setSearch={setDtcSearchValue} />
      <Dtcs search={dtcSearchValue} />
      <Footer />
    </Fragment>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={mainPage} />
          <Route path="/dtc/:id" element={mainPage} />
          <Route path="*" element={mainPage} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
