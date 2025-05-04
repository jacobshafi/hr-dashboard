'use client';

import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

type Props = {
  deptBreakdown: Record<string, number> | undefined;
};

export default function DepartmentBreakdown({ deptBreakdown = {} }: Props) {
  const theme = useTheme();

  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Department Breakdown
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(deptBreakdown).map(([dept, count]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dept}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[2],
              }}
            >
              <WorkIcon color="primary" fontSize="medium" />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {dept}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {count} employee{count !== 1 ? 's' : ''}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
