import { useLogin } from '@refinedev/core';
import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import { ThemedTitleV2 } from '@refinedev/mui';
// {/* <ThemedTitleV2
//           collapsed={false}
//           wrapperStyles={{
//             fontSize: '22px',
//             justifyContent: 'center',
//           }}
//         /> */}

import { yariga } from 'assets';

import { CredentialResponse } from '../interfaces/google';

const GOOGLE_CLIENT_ID =
  '1003117598679-gu7fvobjsefcfb0fovpambq51sjcq8k5.apps.googleusercontent.com';

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography align="center" color={'text.secondary'} fontSize="12px">
          <img alt="yariga" src={yariga} />
        </Typography>

        <GoogleButton />
      </Box>
    </Container>
  );
};
