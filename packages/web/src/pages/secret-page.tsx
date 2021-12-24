import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from '@chakra-ui/react';
import Header from '../components/Header';

const SecretPage = () => (
  <Box>
    <Header />

    <Flex minH="100vh" justify="center" align="center">
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          This is a Secret Page
          <br />
          You can see this because you are signed in!
        </Heading>
      </Box>
    </Flex>
  </Box>
);

export default SecretPage;
