import React from "react";
import { useLocation } from "react-router-dom";
import CardVote from "./CardVote";

const Votacion = () => {
  const location = useLocation();

  const extractIdFromUrl = (url) => {
    const match = url.match(/%22([^%]*)%22/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const idEscultura = extractIdFromUrl(location.pathname + location.search);

  return idEscultura ? (
    <CardVote idEscultura={idEscultura} />
  ) : (
    <div>No se encontró un ID válido en la URL.</div>
  );
};

export default Votacion;
