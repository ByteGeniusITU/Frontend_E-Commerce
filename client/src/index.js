import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ltnc4wqr1q2lyk78.us.auth0.com"
      clientId="UzYz2rF2IH4N0jTBw0ahhmQA3nmk1VEX"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-ltnc4wqr1q2lyk78.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
