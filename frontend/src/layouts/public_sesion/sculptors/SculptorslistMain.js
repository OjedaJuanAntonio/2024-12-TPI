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
        }; obtenerEscultores();
    }, []);

    const configuracion = { dots: true,infinite: true,slidesToShow: 4,slidesToScroll: 1,autoplay: true,speed: 2000,autoplaySpeed: 2000,cssEase: "linear"};

    return (
        <div className="contenedor-slider" style={{ margin: '8vh' }}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
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
