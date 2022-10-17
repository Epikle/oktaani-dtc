import { withAuthenticationRequired } from '@auth0/auth0-react';

import { URLS } from '../../util/urls';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingSpinner />,
    returnTo: URLS.pageUrl,
  });

  return <Component />;
};

export default ProtectedRoute;
