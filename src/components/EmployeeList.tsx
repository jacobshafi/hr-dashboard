'use client';

import {
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import { parseISO, format } from 'date-fns';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

interface EmployeeListProps {
  employees: any[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  const today = new Date();
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const colors = ['#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E1F5FE'];
  const getColor = (index: number) => colors[index % colors.length];

  const departments = [...new Set(employees.map((emp: any) => emp.department))];

  const filteredEmployees = departmentFilter
    ? employees.filter((emp: any) => emp.department === departmentFilter)
    : employees;

  const employeesOnLeaveToday = filteredEmployees.filter((emp: any) =>
    emp.leaves.some((leave: any) => {
      const start = parseISO(leave.startDate);
      const end = parseISO(leave.endDate);
      return start <= today && today <= end;
    })
  );

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setDepartmentFilter(e.target.value);
    // Simulate loading state for the sake of the demo
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Box mb={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Employees on Leave Today
      </Typography>

      <TextField
        select
        label="Filter by Department"
        value={departmentFilter}
        onChange={handleDepartmentChange}
        fullWidth
        sx={{ mb: 3 }}
        disabled={isLoading}
      >
        <MenuItem value="">All Departments</MenuItem>
        {departments.map((dept) => (
          <MenuItem key={dept} value={dept}>
            {dept}
          </MenuItem>
        ))}
      </TextField>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : employeesOnLeaveToday.length === 0 ? (
        <Box mt={2} p={3} borderRadius={2} bgcolor="background.paper" boxShadow={1}>
          <Typography variant="body1" color="text.secondary" align="center">
            No employees are currently on leave in this department.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {employeesOnLeaveToday.map((emp: any, idx: number) => {
            const currentLeave = emp.leaves.find((leave: any) => {
              const start = parseISO(leave.startDate);
              const end = parseISO(leave.endDate);
              return start <= today && today <= end;
            });

            return (
              <Grid item xs={12} md={6} lg={4} key={emp.id}>
                <Paper sx={{ p: 3, backgroundColor: getColor(idx), borderRadius: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {emp.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {emp.department}
                  </Typography>
                  <Chip label={currentLeave.type} color="primary" size="small" sx={{ mt: 1 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>From:</strong> {format(parseISO(currentLeave.startDate), 'MMM dd, yyyy')}
                  </Typography>
                  <Typography variant="body2">
                    <strong>To:</strong> {format(parseISO(currentLeave.endDate), 'MMM dd, yyyy')}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}
