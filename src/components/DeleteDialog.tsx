import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, Box } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
  deleteResult: string | null;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, deleting, deleteResult }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Cliente</DialogTitle>
      <DialogContent>
        {deleting ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : deleteResult ? (
          <DialogContentText>
            {deleteResult}
          </DialogContentText>
        ) : (
          <DialogContentText>
            ¿Está seguro que desea borrar este usuario?
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {!deleting && !deleteResult && (
          <>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={onConfirm} color="primary">
              Confirmar
            </Button>
          </>
        )}
        {deleteResult && (
          <Button onClick={onClose} color="primary">
            Cerrar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
