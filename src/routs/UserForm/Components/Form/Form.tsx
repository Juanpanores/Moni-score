import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, CircularProgress } from '@mui/material';
import './Form.styles.css';

interface FormProps {
  onDialogOpen: (message: string, status: string) => void;
}

const Form: React.FC<FormProps> = ({ onDialogOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    dni: '',
    email: '',
    gender: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    lastname: false,
    dni: false,
    email: false,
    gender: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: false
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = false;
    if (name === 'name' || name === 'lastname') {
      error = !/^[a-zA-Z]+$/.test(value);
    } else if (name === 'dni') {
      error = !/^\d+$/.test(value);
    } else if (name === 'email') {
      error = !/@/.test(value);
    }
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name === '' || !/^[a-zA-Z]+$/.test(formData.name),
      lastname: formData.lastname === '' || !/^[a-zA-Z]+$/.test(formData.lastname),
      dni: formData.dni === '' || !/^\d+$/.test(formData.dni),
      email: formData.email === '' || !/@/.test(formData.email),
      gender: formData.gender === ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onDialogOpen('Por favor complete todos los campos correctamente.', 'error');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/v4/scoring/pre-score/${formData.dni}`, {
        method: 'GET'
      });
      const result = await response.json();
      const statusMessage = result.status === 'approve' ? '¡Exito! Puede acceder a un prestamo personal.' : 'Rechazado, no puede acceder a un prestamo personal.';

      const postResponse = await fetch('/api/v4/scoring/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          status: result.status
        })
      });

      if (!postResponse.ok) {
        const errorData = await postResponse.json();
        onDialogOpen(`Error: ${errorData.error}`, 'error');
      } else {
        onDialogOpen(statusMessage, result.status);
      }
    } catch (error) {
      onDialogOpen('Error fetching data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name !== '' &&
      /^[a-zA-Z]+$/.test(formData.name) &&
      formData.lastname !== '' &&
      /^[a-zA-Z]+$/.test(formData.lastname) &&
      formData.dni !== '' &&
      /^\d+$/.test(formData.dni) &&
      formData.email !== '' &&
      /@/.test(formData.email) &&
      formData.gender !== ''
    );
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <Box className="form-container">
        <Box className="form-row">
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={errors.name}
            helperText={errors.name ? 'Este campo es obligatorio y debe contener solo letras' : ''}
          />
          <TextField
            label="Apellido"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={errors.lastname}
            helperText={errors.lastname ? 'Este campo es obligatorio y debe contener solo letras' : ''}
          />
        </Box>
        <Box className="form-row">
          <TextField
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            margin="normal"
            error={errors.dni}
            helperText={errors.dni ? 'Este campo es obligatorio y debe contener solo números' : ''}
          />
          <TextField
            label="Género"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            select
            fullWidth
            margin="normal"
            error={errors.gender}
            helperText={errors.gender ? 'Este campo es obligatorio' : ''}
          >
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="female">Femenino</MenuItem>
            <MenuItem value="other">Otro</MenuItem>
          </TextField>
        </Box>
        <TextField
          label="Correo Electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          margin="normal"
          error={errors.email}
          helperText={errors.email ? 'Este campo es obligatorio y debe contener un @' : ''}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isFormValid() || loading}>
          {loading ? <CircularProgress size={24} /> : 'Enviar'}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
