import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { getConfig } from "./config";
import history from './utils/history';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



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
    cacheLocation: "localstorage", 
    useRefreshTokens: true, 
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Auth0Provider {...providerConfig}>
    <ChakraProvider>
            <App />
    </ChakraProvider>
</Auth0Provider>
    );

serviceWorkerRegistration.register();


