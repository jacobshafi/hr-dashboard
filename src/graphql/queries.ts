import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      department
      dateOfBirth
      isActive
      leaves {
        type
        startDate
        endDate
      }
    }
  }
`;