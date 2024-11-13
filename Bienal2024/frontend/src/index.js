import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { getConfig } from "./config";
import history from './utils/history';

const config = getConfig();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
        redirect_uri: window.location.origin,
    },
    onRedirectCallback: (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider {...providerConfig}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Auth0Provider>
);

// Registro del service worker para PWA
serviceWorkerRegistration.register();
