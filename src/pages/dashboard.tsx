import { useState } from 'react';
import Box from '@mui/material/Box';
import { employeesMock } from '@/mocks/employees';

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
  const employees = employeesMock[0].result.data.employees;
  return { props: { employees } };
}