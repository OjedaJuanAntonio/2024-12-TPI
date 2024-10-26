import React, { useEffect, useState } from 'react'; 
import { getDocs, collection } from 'firebase/firestore'; 
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { db } from '../../../Firebase';
import { SwipperEventcardList } from '../Swippers';

function EventlistMain() {
    const [evento, setEventos] = useState([]);


    useEffect(() => {
        const obtenerEventos = async () => {
            const consulta = await getDocs(collection(db, "Eventos")); 
            const listaEventos = consulta.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setEventos(listaEventos);
        }; obtenerEventos(); }, []);

    return (
      <>
        <SwipperEventcardList evento={evento}/>
      </>
    );
}

export default EventlistMain;
