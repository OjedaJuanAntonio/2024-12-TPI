import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import SculptorCardMain from "./SculptorCardMain";
import { db } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Box, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom"; 
import 'animate.css';

function AutoPlay() {
    const [escultores, setEscultores] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); 

    useEffect(() => {
        const obtenerEscultores = async () => {
            const consultaSnapshot = await getDocs(collection(db, "Escultores"));
            const listaEscultores = consultaSnapshot.docs.map(doc => ({id: doc.id,...doc.data() }));
            setEscultores(listaEscultores);
            setLoading(false);
        }; 
        obtenerEscultores();
    }, []);

    const configuracion = {
        dots: true,
        infinite: true,
        slidesToShow: 4, // Mostrar 4 por defecto
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
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
