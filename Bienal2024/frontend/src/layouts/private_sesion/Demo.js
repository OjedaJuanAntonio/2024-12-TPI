import { useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

const Demo = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 4) {
      alert("Solo 4 fotos maximo");
      return;
    }
    setFiles(selectedFiles);
  };

  return (
    <VStack spacing={4}>
      <Button
        as="label"
        leftIcon={<HiUpload />}
        variant="outline"
        size="xl"
        cursor="pointer"
      >
        Subir imagenes
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Button>
      <VStack align="start">
        {files.map((file, index) => (
          <Text key={index}>{file.name}</Text>
        ))}
      </VStack>
    </VStack>
  );
};

export default Demo;
