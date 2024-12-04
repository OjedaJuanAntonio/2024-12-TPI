import { useRef, useEffect } from "react";

const Camara = (isOpen) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error al acceder a la cámara:", err);
        }
      };
      startCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isOpen]);

  return videoRef;
};

export default Camara;
