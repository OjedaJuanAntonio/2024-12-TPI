
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

function FilterBar({ onFilterChange }) {
  return (
    <HStack spacing={4} p={4} justifyContent="flex-end" alignItems="flex-start">
      <Text mt={2}>Filtros</Text>

      {/* Filtro por categoría */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Categoría
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onFilterChange("categoria", "Madera")}>
            Madera
          </MenuItem>
          <MenuItem onClick={() => onFilterChange("categoria", "Piedra")}>
           Piedra
          </MenuItem>
          <MenuItem
            onClick={() => onFilterChange("categoria", "Minimalista")}
          >
            Minimalista
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Ordenar */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Ordenar
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onFilterChange("orden", "Artista")}>
            Por Artista
          </MenuItem>
          <MenuItem onClick={() => onFilterChange("orden", "Fecha")}>
            Por fecha de realización
          </MenuItem>
          <MenuItem onClick={() => onFilterChange("orden", "AZ")}>
            De la A-Z
          </MenuItem>
          <MenuItem onClick={() => onFilterChange("orden", "ZA")}>
            De la Z-A
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}

export default FilterBar;
