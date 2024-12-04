import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { getConfig } from "./config";
import history from './utils/history';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthProvider} from "./layouts/AuthContext";

//Aqui es donde importamos la configuracion para nuestras credenciales de auth0 al momento de iniciar la aplicación

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
    cacheLocation: "localstorage", // Almacena tokens en localStorage
    useRefreshTokens: true, // Permite mantener la sesión activa
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Auth0Provider {...providerConfig}>
    <ChakraProvider>
            <App />
    </ChakraProvider>
</Auth0Provider>
    );

//esto se encarga registrar el service worker encargado de manejar el cache de la aplicacion
//Añadi una nueva configuracion que segun tengo entendido utiliza la estrategia web first(solicita datos en la web y de no conseguirlos muestra los datos almacenados en caché)
serviceWorkerRegistration.register();


