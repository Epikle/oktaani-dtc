import { useState, Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './shared/components/UI/Header';
import Footer from './shared/components/UI/Footer';
import Dtcs from './dtc/pages/Dtcs';
import ProtectedRoute from './shared/components/UI/ProtectedRoute';
import { Auth0ProviderWithConfig } from './auth0-provider-with-config';

const queryClient = new QueryClient();

function App() {
  const MainPage = () => {
    const [dtcSearchValue, setDtcSearchValue] = useState('');
    return (
      <Fragment>
        <Header setSearch={setDtcSearchValue} search={dtcSearchValue} />
        <Dtcs search={dtcSearchValue} />
        <Footer />
      </Fragment>
    );
  };

  return (
    <Auth0ProviderWithConfig>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/dtc/:id" element={<MainPage />} />
            <Route
              path="/admin"
              element={<ProtectedRoute component={MainPage} />}
            />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Auth0ProviderWithConfig>
  );
}

export default App;
