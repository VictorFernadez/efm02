import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import Clock from './Clock';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});

  const handleSave = (employee) => {
      if (employee.id) {
          // Editando un empleado existente
          setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
      } else {
          // Añadiendo un nuevo empleado
          setEmployees([...employees, { ...employee, id: Date.now() }]);
      }
      setNewEmployee({});
  };

  const handleEdit = (employee) => {
      setNewEmployee(employee); // Prepara el formulario para edición
  };

  const handleDelete = (employee) => {
      setEmployees(employees.filter(emp => emp.id !== employee.id));
  };

  return (
      <div className="container mt-5">
          <Clock />
          <h1>Gestión de Recursos Humanos</h1>
          <EmployeeForm onSave={handleSave} employee={newEmployee} />
          <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
  );
};

export default App;
