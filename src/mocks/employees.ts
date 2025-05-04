import { GET_EMPLOYEES } from '@/graphql/queries';
import { createMockFor } from './utils';
import { mockEmployees } from './data';

console.log("Mock query ref:", GET_EMPLOYEES);

export const employeesMock = createMockFor(GET_EMPLOYEES, { employees: mockEmployees }, {}, 5);
