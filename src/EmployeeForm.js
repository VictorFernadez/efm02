// EmployeeForm.jsx

import React, { useState, useEffect } from 'react';
import Alert from './Alert'; // Importas el componente Alert aquí
import './styles.css';

const EmployeeForm = ({ onSave, employee }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        idType: 'DNI',
        documentNumber: '',
        educationCenter: '',
        skills: [],
        hora: new Date().toLocaleTimeString()
    });
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (employee && employee.id) {
            setFormData(employee);
        }
    }, [employee]);

    const handleSkillsChange = (e) => {
        const value = e.target.value;
        const newSkills = value.split(',').map(skill => skill.trim());
        setFormData({ ...formData, skills: newSkills });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveClick = () => {
        const validationErrors = validateForm();
        if (validationErrors.length === 0) {
            onSave(formData);
            setSuccessMessage('Operación exitosa');
            clearForm();
            setTimeout(() => setSuccessMessage(null), 3000); // Ocultar mensaje después de 3 segundos
        } else {
            setErrors(validationErrors);
        }
    };

    const clearForm = () => {
        setFormData({
            name: '',
            lastName: '',
            phone: '',
            idType: 'DNI',
            educationCenter: '',
            skills: []
        });
        setErrors([]);
    };

    const validateForm = () => {
        const { name, lastName, phone } = formData;
        const namePattern = /^[A-Za-z\s]+$/;
        const phonePattern = /^\d{10}$/;
        const errors = [];

        if (!namePattern.test(name)) {
            errors.push('El nombre debe contener solo letras y espacios.');
        }
        if (!namePattern.test(lastName)) {
            errors.push('El apellido debe contener solo letras y espacios.');
        }
        if (!phonePattern.test(phone)) {
            errors.push('El teléfono debe tener 10 dígitos.');
        }

        return errors;
    };

    return (
        <div className="form">
            <div className="alert-container">
                {errors.map((error, index) => <Alert key={index} message={error} />)}
                {successMessage && <Alert message={successMessage} success />}
            </div>
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    pattern="^[A-Za-z\s]+$"
                    title="El nombre debe contener solo letras y espacios."
                    required
                />
            </div>
            <div className="form-group">
                <label>Apellido</label>
                <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    pattern="^[A-Za-z\s]+$"
                    title="El apellido debe contener solo letras y espacios."
                    required
                />
            </div>
            <div className="form-group">
                <label>Teléfono</label>
                <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="\d{10}"
                    title="El teléfono debe tener 10 dígitos."
                    required
                />
            </div>
            <div className="form-group">
                <label>Tipo de Documento</label>
                <select
                    name="idType"
                    className="form-control"
                    value={formData.idType}
                    onChange={handleChange}
                >
                    <option value="DNI">DNI</option>
                    <option value="PASAPORTE">PASAPORTE</option>
                    <option value="CARNET DE EXTRANJERÍA">CARNET DE EXTRANJERÍA</option>
                </select>
                <input
                        type="text"
                        name="documentNumber"
                        className="form-control"
                        placeholder="Número de documento"
                        value={formData.documentNumber}
                        onChange={handleChange}
                        pattern="\d{8}"
                        title="El DNI debe tener 8 dígitos."
                        required
                    />
            </div>
            <div className="form-group">
                <label>Centro de Estudios</label>
                <select
                    name="educationCenter"
                    className="form-control"
                    value={formData.educationCenter}
                    onChange={handleChange}
                >
                    <option value="">Seleccione</option>
                    <option value="Universidad">Universidad</option>
                    <option value="Instituto Superior">Instituto Superior</option>
                    <option value="Otros">Otros</option>
                </select>
                <input
                        type="text"
                        name="educationCenterDescription"
                        className="form-control"
                        placeholder="Descripción de Centro de Estudios"
                        value={formData.educationCenterDescription}
                        onChange={handleChange}
                    />
            </div>
            <div className="form-group">
                <label>Habilidades Técnicas</label>
                <input
                    type="text"
                    name="skills"
                    className="form-control"
                    value={formData.skills.join(', ')}
                    onChange={handleSkillsChange}
                />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSaveClick}>Guardar</button>
        </div>
    );
};

export default EmployeeForm;
