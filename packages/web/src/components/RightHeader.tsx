import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const RightHeader = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;

  if (data?.user) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
        >
          <Avatar size={'sm'} src={data.user.image} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push('account')}>Account</MenuItem>
          <MenuItem onClick={() => router.push('secret-page')}>
            Secret Page
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
  return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default RightHeader;
