'use client';

import { useLazyQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '@/graphql/queries';
console.log("Button query ref:", GET_EMPLOYEES); // 🔍 log this

import {
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';


export default function ExportButton() {
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [getEmployees, { loading }] = useLazyQuery(GET_EMPLOYEES, {
      onCompleted: (data) => {
        const csv = convertToCSV(data.employees);
        downloadCSV(csv);
        setOpen(true);
      },
      onError: (error) => {
        setErrorMsg(error.message);
      },
      fetchPolicy: 'network-only',
    });
  
    const convertToCSV = (employees: any[]) => {
      const headers = ['Name', 'Department', 'Date of Birth', 'Active', 'Leave Types'];
      const rows = employees.map(emp => [
        emp.name,
        emp.department,
        emp.dateOfBirth,
        emp.isActive ? 'Yes' : 'No',
        emp.leaves.map((l: any) => l.type).join('; '),
      ]);
      return [headers, ...rows].map(row => row.map(value => `"${value}"`).join(',')).join('\n');
    };
  
    const downloadCSV = (csv: string) => {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees.csv';
      a.click();
      URL.revokeObjectURL(url);
    };
  
    return (
      <>
        <Button variant="contained" color="primary" onClick={() => getEmployees({variables: {}})} disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Export Employees'}
        </Button>
  
        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Failed to fetch employee data: {errorMsg}
          </Alert>
        )}
  
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="CSV downloaded successfully"
        />
      </>
    );
  }

