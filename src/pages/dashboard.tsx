import { useState } from 'react';
import Box from '@mui/material/Box';
import { employeesMock } from '@/mocks/employees';
import { Alert, CircularProgress } from '@mui/material';

import EmployeeList from '@/components/EmployeeList';
import BirthdayList from '@/components/BirthdayList';
import TeamOverview from '@/components/TeamOverview';
import ExportButton from '@/components/ExportButton';
import Layout from '@/components/Layout';

interface DashboardPageProps {
  employees: any[];
  error?: string;
}

export default function DashboardPage({ employees, error }: DashboardPageProps) {
  if (error) {
    return (
      <Layout>
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load employee data: {error}
        </Alert>
      </Layout>
    );
  }

  if (!employees) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Employee Overview</h1>
        <ExportButton employees={employees} />
      </Box>

      <EmployeeList employees={employees} />
      <BirthdayList employees={employees} />
      <TeamOverview employees={employees} />
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const employees = employeesMock[0].result.data.employees;
    return { props: { employees } };
  } catch (error) {
    return {
      props: {
        employees: null,
        error: error instanceof Error ? error.message : 'Failed to fetch employee data'
      }
    };
  }
}