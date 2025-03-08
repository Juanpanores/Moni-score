import React, { useState } from 'react';
import { Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './ScoringForm.styles.css';
import Form from './Components/Form/Form';

const ScoringForm: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogStatus, setDialogStatus] = useState('');

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
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom>
          Formulario de Usuario
        </Typography>
        <Form onDialogOpen={handleDialogOpen} />
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>Resultado</DialogTitle>
          <DialogContent>
            <Typography className={dialogStatus === 'approve' ? 'approved' : 'rejected'}>
              {dialogMessage}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ScoringForm;
