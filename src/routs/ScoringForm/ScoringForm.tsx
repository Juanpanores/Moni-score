import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ScoringForm.styles.css';
import Form from '../../components/Form/Form';
import CustomDialog from './Components/CustomDialog/CustomDialog';

const ScoringForm: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');
  const navigate = useNavigate();

  const handleDialogOpen = (message: string, status: string) => {
    setDialogMessage(message);
    setDialogStatus(status);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className="centered-container">
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/user-table')}
        style={{ position: 'absolute', top: 16, right: 16 }}
      >
        Ver Peticiones
      </Button>
      <Container maxWidth="sm" className='scoring-form__container'>
        <Typography variant="h4" component="h1" gutterBottom>
          Formulario de consulta
        </Typography>
        <Form onDialogOpen={handleDialogOpen} />
        <CustomDialog 
          open={dialogOpen} 
          onClose={handleClose} 
          title={"Resultado"}
          content={
            <Typography className={dialogStatus === 'approve' ? 'approved' : 'rejected'}>
              {dialogMessage}
            </Typography>
          }
          actions={
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          }
        />
      </Container>
    </div>
  );
};

export default ScoringForm;
