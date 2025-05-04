'use client';

import { Box, Container, Typography } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          HR Dashboard
        </Typography>
        {children}
      </Container>
    </Box>
  );
}
