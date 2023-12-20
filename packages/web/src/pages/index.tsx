import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import Header from '../components/Header';

const IndexPage = () => (
  <Box>
    <Header />

    <Container maxW="container.xl">
      <Flex minH="100vh" justify="center" align="center">
        <VStack spacing={8}>
          <Heading fontSize="5xl">Next Auth Custom Backend Example</Heading>
          <Text fontSize="xl">
            This is and example site to demostrate how to use{' '}
            <Link href="https://next-auth.js.org" color="blue.500" isExternal>
              NextAuth.js
            </Link>{' '}
            with a separated backend from next js using the{' '}
            <Link
              href="https://authjs.dev/guides/adapters/creating-a-database-adapter"
              color="blue.500"
              isExternal
            >
              Custom Adapter Aproach.
            </Link>
          </Text>
        </VStack>
      </Flex>
    </Container>
  </Box>
);

export default IndexPage;
