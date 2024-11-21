import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import SculptorCardMain from "./SculptorCardMain";
import { Box, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom"; 
import 'animate.css';
function AutoPlay() {
    const [escultores, setEscultores] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const obtenerEscultores = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/escultores/');
                if (!response.ok) {
                    throw new Error('Error al obtener los escultores');
                }
                const data = await response.json();
                setEscultores(data.map(escultor => ({ id: escultor.id, ...escultor })));
            } catch (error) {
                console.error("Error fetching escultores:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerEscultores();
    }, []);

    const configuracion = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 },
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 },
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
                <Slider {...configuracion}>
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
