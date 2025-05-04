import { useState } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { employeesMock } from '@/mocks/employees';
import Box from '@mui/material/Box';

import EmployeeList from '@/components/EmployeeList';
import BirthdayList from '@/components/BirthdayList';
import TeamOverview from '@/components/TeamOverview';
import ExportButton from '@/components/ExportButton';
import Layout from '@/components/Layout';

export default function DashboardPage({ employees }: { employees: any[] }) {
  const [departmentFilter, setDepartmentFilter] = useState('');

  const filteredEmployees = departmentFilter
    ? employees.filter((emp: any) => emp.department === departmentFilter)
    : employees;

  const departments = [...new Set(employees.map((emp: any) => emp.department))] as string[];

  return (
    <MockedProvider mocks={employeesMock} addTypename={false}>
      <Layout>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h1>Employee Overview</h1>
          <ExportButton />
        </Box>

        <EmployeeList />
        <BirthdayList />
        <TeamOverview />
      </Layout>
    </MockedProvider>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      employees: employeesMock[0].result.data.employees,
    },
  };
}