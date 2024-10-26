import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, HStack ,Text} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function FilterBar() {
  return (
    <HStack spacing={4} p={4} justifyContent="flex-end" alignItems="flex-start">
      <Text mt={2}>Filtros</Text>
      
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Categoria</MenuButton>
        <MenuList>
          <MenuItem>Madera</MenuItem>
          <MenuItem>Metal</MenuItem>
          <MenuItem>Minimalista</MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Ordenar</MenuButton>
        <MenuList>
          <MenuItem>Por nombre de Artista</MenuItem>
          <MenuItem>Por tipo de obra</MenuItem>
          <MenuItem>Por fecha de realizacion</MenuItem>
          <MenuItem>De la A-Z</MenuItem>
          <MenuItem>De la Z-A</MenuItem>
        </MenuList>
      </Menu>
    </HStack>

  );
}

export default FilterBar;
