import { Box, Container } from '@mui/material';
import AppHeader from './AppHeader';

const AppLayout = ({ children }) => {
  return (
    <Box className="app-layout">
      <AppHeader />
      <Container maxWidth={false}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout; 