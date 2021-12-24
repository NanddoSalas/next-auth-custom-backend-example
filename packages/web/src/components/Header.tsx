import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import ClientOnly from './ClientOnly';
import NavLink from './NavLink';
import RightHeader from './RightHeader';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      position="fixed"
      w="full"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <NavLink href="/">Main Page</NavLink>
              <NavLink href="https://github.com/NanddoSalas/next-auth-custom-backend-example">
                Source Code
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <ClientOnly>
              <RightHeader />
            </ClientOnly>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink href="/">Main Page</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Header;
