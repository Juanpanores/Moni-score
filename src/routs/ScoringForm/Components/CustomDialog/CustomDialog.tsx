import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
  actions: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({ open, onClose, title, content, actions }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
      <DialogActions>
        {actions}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
