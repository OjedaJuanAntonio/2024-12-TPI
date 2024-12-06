// este modulo importa las credenciales de auth0 desde un archivo json que debe estar ubicado en esta misma carpeta 
import configJson from "./auth_config.json";

export function getConfig() {
  const audience =
    configJson.audience && configJson.audience !== "YOUR_API_IDENTIFIER"
      ? configJson.audience
      : null;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
}