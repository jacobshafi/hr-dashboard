'use client';

import {
  Button,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';

interface ExportButtonProps {
  employees: any[];
}

export default function ExportButton({ employees }: ExportButtonProps) {
  const [open, setOpen] = useState(false);

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

  const handleExport = () => {
    const csv = convertToCSV(employees);
    downloadCSV(csv);
    setOpen(true);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleExport}>
        Export Employees
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="CSV downloaded successfully"
      />
    </>
  );
}

