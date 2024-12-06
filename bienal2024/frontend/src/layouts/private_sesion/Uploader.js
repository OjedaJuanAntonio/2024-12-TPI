import React, { useState } from "react";
import { Box, FormControl, FormLabel, Text, Image, Spinner } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";

const Uploader = ({ setPhoto, label, isRequired }) => {
  const [isUploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".png, .jpg, .jpeg",
    maxSize: 5 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      handleUpload(file);
    },
  });

  const handleUpload = async (file) => {
    setUploading(true);
    const uniqueName = `${Date.now()}-${file.name}`;
    const fileRef = ref(storage, uniqueName);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      setUploadedImage(downloadURL);
      if (setPhoto) setPhoto(downloadURL); 
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormControl id="photo" isRequired={isRequired} mb={6}>
      <FormLabel color="teal.500">{label}</FormLabel>
      {uploadedImage ? (
        <Box textAlign="center">
          <Image
            src={uploadedImage}
            alt="Imagen subida"
            borderRadius="md"
            boxSize="200px"
            objectFit="cover"
            mx="auto"
          />
          <Text color="gray.500" fontSize="sm" mt={2}>
            Imagen cargada correctamente
          </Text>
        </Box>
      ) : (
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor="teal.300"
          p={6}
          textAlign="center"
          _hover={{ borderColor: "teal.400", cursor: "pointer" }}
          bg="gray.50"
          borderRadius="md"
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <Spinner size="lg" color="teal.500" />
          ) : (
            <>
              <Text color="teal.500" fontSize="lg" fontWeight="semibold">
                Arrastra y suelta la imagen aquí, o haz clic para seleccionar
              </Text>
              <Text color="gray.500" fontSize="sm">
                Archivos permitidos: .png, .jpg hasta 5MB
              </Text>
            </>
          )}
        </Box>
      )}
    </FormControl>
  );
};

export default Uploader;
