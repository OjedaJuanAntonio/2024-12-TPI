import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useToast,
  HStack,
  Input,
  Avatar,
  Button,
  Text,
} from "@chakra-ui/react";
import { BsQrCode } from "react-icons/bs";
import TabletView from "../../public_sesion/sculptors/TabletID"; 
import { useNavigate } from "react-router-dom";


const SculptorSculptureList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch esculturas
        const esculturasResponse = await fetch("http://localhost:8000/esculturas/");
        const esculturasData = await esculturasResponse.json();

        // Filtrar solo las esculturas con id_evento = "1"
        const filteredEsculturas = esculturasData.filter(
          (escultura) => escultura.id_evento === "1"
        );

        // Fetch escultores
        const escultoresResponse = await fetch("http://localhost:8000/escultores/");
        const escultoresData = await escultoresResponse.json();

        // Combinar solo los datos requeridos
        const combinedData = filteredEsculturas.map((escultura) => {
          const escultor = escultoresData.find(
            (e) => e.id === escultura.id_escultor
          );
          return {
            escultorId: escultor?.id || null,
            photo: escultor?.photo || null,
            nombre: escultor?.nombre || "Desconocido",
            apellido: escultor?.apellido || "",
            esculturaId: escultura.id,
            titulo: escultura.titulo,
            url_imagen_1: escultura.url_imagen_1,
          };
        });

        setFilteredData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = filteredData.filter((item) => {
      const escultorName = `${item.nombre} ${item.apellido}`.toLowerCase();
      const esculturaTitulo = item.titulo.toLowerCase();
      return escultorName.includes(query) || esculturaTitulo.includes(query);
    });
    setFilteredData(filtered);
  };
  console.log(filteredData)
 

  const handleNavigateToTablet = (item) => {
    navigate(`/tabletview/${item.esculturaId}`, { state: { data: item } });
  };

  return (
    <Box bg="gray.100" minH="100vh" w="100%" p={8}>
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
        w="100%"
        p={4}
        overflowX="auto"
      >
        <Heading textAlign="center" mb={4} fontSize="2xl" color="teal.600">
          Lista de Esculturas Bienal 2024
        </Heading>
        <HStack justifyContent="center" mb={5}>
          <Input
            placeholder="Buscar por escultor o escultura..."
            value={searchQuery}
            onChange={handleSearch}
            borderRadius="md"
            focusBorderColor="teal.400"
            w="100%"
          />
        </HStack>
        <Table variant="simple" w="100%">
          <Thead bg="teal.500">
            <Tr>
              <Th color="white"></Th>
              <Th color="white">Escultor</Th>
              <Th color="white">Título de la Escultura</Th>
              <Th color="white">Votación</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item) => (
              <Tr key={item.esculturaId}>
                <Td>
                  <Avatar src={item.photo} />
                </Td>
                <Td>
                  {item.nombre} {item.apellido}
                </Td>
                <Td>{item.titulo}</Td>
                <Td>
                <Button colorScheme="teal"
                  onClick={() => navigate(`/tabletview/${item.esculturaId}`, { state: { data: item } })}>
      <HStack>
        <Text>Ir al QR</Text>
        <BsQrCode />
      </HStack>
    </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SculptorSculptureList;
