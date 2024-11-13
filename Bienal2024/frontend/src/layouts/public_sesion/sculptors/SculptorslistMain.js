import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import SculptorCardMain from "./SculptorCardMain";
import { Box, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom"; 
import 'animate.css';
import axios from 'axios';


function AutoPlay() {
    const [escultores, setEscultores] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); 

    useEffect(() => {
        const obtenerEscultores = async () => {
        const consultaSnapshot = await axios.get('http://127.0.0.1:8000/escultores/');
        const listaEscultores = consultaSnapshot.data.map(escultor => ({ id: escultor.id, ...escultor }));
        setEscultores(listaEscultores);
            setLoading(false);
        }; 
        obtenerEscultores();
    },[]);

    const configuracion = {
        dots: true,
        infinite: true,
        slidesToShow: 4, // Mostrar 4 por defecto
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 1500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768, // Tamaño en píxeles para móviles
                settings: {
                    slidesToShow: 2, // Mostrar 2 en móviles
                },
            },
            {
                breakpoint: 1024, // Tamaño en píxeles para pantallas más grandes
                settings: {
                    slidesToShow: 3, // Mostrar 3 en tabletas o pantallas medianas
                },
            },
        ],
    };

    return (
        <div className="contenedor-slider" style={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
            {loading ? (
                <Box display="flex" height="200px" justifyContent="center" alignItems="center">
                    <Spinner size="xl" />
                </Box>
            ) : (
                <Slider {...configuracion} style={{ width: '100%', padding: 0, margintop: 20 }}>
                    {location.pathname === "/" ? (
                        escultores.map(escultor => (
                            <div key={escultor.id} className="animate__animated animate__zoomIn">
                                <SculptorCardMain escultor={escultor} showAvatar={false} />
                            </div>
                        ))
                    ) : (
                        <SculptorCardMain showAvatar={true} />
                    )}
                </Slider>
            )}
        </div>
    );
}

export default AutoPlay;
