'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '@/graphql/queries';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import dynamic from 'next/dynamic';

const DepartmentBreakdown = dynamic(() => import('./DepartmentBreakdown'), { ssr: false });

export default function TeamOverview() {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [employeesOnLeave, setEmployeesOnLeave] = useState(0);
  const [deptBreakdown, setDeptBreakdown] = useState<Record<string, number>>({});

  const theme = useTheme();

  useEffect(() => {
    if (data?.employees) {
      const today = new Date();
      const onLeave = data.employees.filter((emp: any) =>
        emp.leaves.some((leave: any) => {
          const start = new Date(leave.startDate);
          const end = new Date(leave.endDate);
          return start <= today && today <= end;
        })
      ).length;
      setEmployeesOnLeave(onLeave);

      const breakdown = data.employees.reduce((acc: Record<string, number>, emp: any) => {
        acc[emp.department] = (acc[emp.department] || 0) + 1;
        return acc;
      }, {});
      setDeptBreakdown(breakdown);
    }
  }, [data]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const totalEmployees = data.employees.length;
  const activeEmployees = data.employees.filter((emp: any) => emp.isActive).length;

  const metrics = [
    { label: 'Total Employees', value: totalEmployees },
    { label: 'Active Employees', value: activeEmployees },
    { label: 'On Leave Today', value: employeesOnLeave },
  ];

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Team Overview
      </Typography>
      <Grid container spacing={2}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={4} key={metric.label}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {metric.label}
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {metric.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <DepartmentBreakdown deptBreakdown={deptBreakdown} />
    </Box>
  );
}
