import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface SharedDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  status: string;
}

const SharedDialog: React.FC<SharedDialogProps> = ({ open, onClose, message, status }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Resultado</DialogTitle>
      <DialogContent>
        <Typography className={status === 'approve' ? 'approved' : 'rejected'}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharedDialog;
