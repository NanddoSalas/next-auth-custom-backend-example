import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import ClientOnly from '../components/ClientOnly';
import Header from '../components/Header';
import {
  useMeQuery,
  useUnlinkProviderMutation,
} from '../graphql/types-and-hooks';

const Account = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const { data: queryData, loading } = useMeQuery();
  const [unlinkProvider] = useUnlinkProviderMutation();

  if (status === 'unauthenticated') router.push('/signin');

  const providers = queryData?.me?.connectedProviders as string[];

  const handleClick = (provider: string) => {
    if (providers?.includes(provider)) {
      unlinkProvider({ variables: { provider }, refetchQueries: ['Me'] });
    } else {
      signIn(provider);
    }
  };

  return (
    <Box>
      <Header />
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl' }}
            textAlign="center"
          >
            Account
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={data?.user.image} />
              </Center>
              <Flex direction="column" justify="center">
                <Heading fontSize="xl">{data?.user.name}</Heading>
                <Text fontSize="lg">{data?.user.email}</Text>
              </Flex>
            </Stack>
          </FormControl>

          <VStack spacing={8}>
            {/* <Button
              w="full"
              colorScheme="red"
              leftIcon={<FaGoogle />}
              isLoading={loading}
              isDisabled={
                providers?.includes('google') && providers?.length === 1
              }
              onClick={() => handleClick('google')}
            >
              {providers?.includes('google') ? 'Disconnect' : 'Connect'}
            </Button> */}

            <Button
              w="full"
              colorScheme="blue"
              leftIcon={<FaTwitter />}
              isLoading={loading}
              isDisabled={
                providers?.includes('twitter') && providers?.length === 1
              }
              onClick={() => handleClick('twitter')}
            >
              {providers?.includes('twitter') ? 'Disconnect' : 'Connect'}
            </Button>

            <Button
              w="full"
              colorScheme="gray"
              leftIcon={<FaGithub />}
              isLoading={loading}
              isDisabled={
                providers?.includes('github') && providers?.length === 1
              }
              onClick={() => handleClick('github')}
            >
              {providers?.includes('github') ? 'Disconnect' : 'Connect'}
            </Button>

            <Button
              w="full"
              colorScheme="gray"
              variant="outline"
              leftIcon={<ArrowBackIcon />}
              onClick={() => router.push('/')}
            >
              Go Back
            </Button>
          </VStack>
        </Stack>
      </Flex>
    </Box>
  );
};

const AccountPage = () => {
  return (
    <ClientOnly>
      <Account />
    </ClientOnly>
  );
};

export default AccountPage;
