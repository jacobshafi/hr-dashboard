'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  CircularProgress,
} from '@mui/material';
import dynamic from 'next/dynamic';

const DepartmentBreakdown = dynamic(() => import('./DepartmentBreakdown'), { ssr: false });

interface TeamOverviewProps {
  employees: any[];
}

export default function TeamOverview({ employees }: TeamOverviewProps) {
  const [employeesOnLeave, setEmployeesOnLeave] = useState(0);
  const [deptBreakdown, setDeptBreakdown] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    const today = new Date();
    const onLeave = employees.filter((emp: any) =>
      emp.leaves.some((leave: any) => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        return start <= today && today <= end;
      })
    ).length;
    setEmployeesOnLeave(onLeave);

    const breakdown = employees.reduce((acc: Record<string, number>, emp: any) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});
    setDeptBreakdown(breakdown);

    // Simulate loading state for better UX
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [employees]);

  if (isLoading) {
    return (
      <Box mt={6} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp: any) => emp.isActive).length;

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
