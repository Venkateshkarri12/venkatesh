// src/components/EmployeeList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Employee } from '../types';
import EmployeeDetails from './EmployeeDetails';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('data/employees.json');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} onClick={() => handleEmployeeClick(employee)}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>

      {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
    </div>
  );
};

export default EmployeeList;