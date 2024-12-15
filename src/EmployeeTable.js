import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Tipo de Documento</th>
                    <th>Número de Documento</th>
                    <th>Centro de Estudios</th>
                    <th>Institución</th>
                    <th>Habilidades Técnicas</th>
                    <th>Hora</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.idType}</td>
                        <td>{employee.documentNumber}</td>
                        <td>{employee.educationCenter}</td>
                        <td>{employee.educationCenterDescription}</td>
                        <td>{employee.skills.join(', ')}</td>
                        <td>{employee.hora}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => onEdit(employee)}>Editar</button>
                            <button className="btn btn-danger" onClick={() => onDelete(employee)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
