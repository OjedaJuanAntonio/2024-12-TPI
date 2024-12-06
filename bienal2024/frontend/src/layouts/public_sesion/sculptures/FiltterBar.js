import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

function FilterBar({ onFilterChange }) {
  const location = useLocation();

  return (
    <HStack spacing={4} p={4} justifyContent="flex-end" alignItems="flex-start">
      <Text mt={2}>Filtros</Text>

      {location.pathname === "/esculturas" && (
        <>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Categoría
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onFilterChange("categoria", "Madera")}>Madera </MenuItem>
              <MenuItem onClick={() => onFilterChange("categoria", "Piedra")}>Piedra </MenuItem>
              <MenuItem onClick={() => onFilterChange("categoria", "Metales")}>Metales</MenuItem>
              <MenuItem onClick={() => onFilterChange("categoria", "Plastico")}>Plastico</MenuItem>
              <MenuItem onClick={() => onFilterChange("categoria", "Yeso")}>Yeso</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Ordenar
            </MenuButton>
            <MenuList>
            
              <MenuItem onClick={() => onFilterChange("orden", "AZ")}>
                De la A-Z
              </MenuItem>
              <MenuItem onClick={() => onFilterChange("orden", "ZA")}>
                De la Z-A
              </MenuItem>
              <MenuItem onClick={() => onFilterChange("orden", "Bienal 2024")}>
                Bienal 2024 (actual)
              </MenuItem>
              <MenuItem onClick={() => onFilterChange("orden", "Otras Ediciones")}>
               Otras Ediciones 
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      )}

      {location.pathname === "/actividades" && (
        <>

    

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Fecha
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => onFilterChange("fecha", "Hoy")}>
                Hoy
              </MenuItem>
              <MenuItem onClick={() => onFilterChange("fecha", "Mañana")}>
                Mañana
              </MenuItem>
              <MenuItem
                onClick={() => onFilterChange("fecha", "Esta semana")}>
                Esta semana
              </MenuItem>
              <MenuItem
                onClick={() => onFilterChange("fecha", "Esta Edicion (2024)")}>
                Esta Edicion (2024)
              </MenuItem>
              <MenuItem
                onClick={() => onFilterChange("fecha", "Otras Ediciones")}>
                Otras Ediciones
              </MenuItem>

            </MenuList>
          </Menu>
        </>
      )}
    </HStack>
  );
}

export default FilterBar;
