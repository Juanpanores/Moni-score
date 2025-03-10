import React from 'react';
import './UserTable.styles.css';
import { Button, Box, Typography } from '@mui/material';
import Form from '../../components/Form/Form';
import UserTableComponent from './components/UserTableComponent';
import CustomDialog from '../ScoringForm/Components/CustomDialog/CustomDialog';
import {useClientContext} from './ClientContextProvider';
import DeleteDialog from '../../components/DeleteDialog';

function UserTable() {
  const {
    users,
    filteredUsers,
    page,
    rowsPerPage,
    loading,
    editingUser,
    deleteDialogOpen,
    deleting,
    deleteResult,
    customDialogOpen,
    dialogMessage,
    setFilteredUsers,
    setCustomDialogOpen,
    setDialogMessage,
    setEditingUser,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
    openDeleteDialog,
    closeDeleteDialog,
    fetchData
  } = useClientContext();

  return (
    <Box className="user-table">
      <UserTableComponent
        users={filteredUsers}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit}
        openDeleteDialog={openDeleteDialog}
        setFilteredUsers={setFilteredUsers}
        usersData={users}
        loading={loading}
      />
      {editingUser && (
        <Box className="user-table__form-dialog">
          <Form 
            user={editingUser} 
            onCancel={() => setEditingUser(null)} 
            onDialogOpen={(message) => {
              setDialogMessage(message);
              setEditingUser(null)
              fetchData()
              setCustomDialogOpen(true);
            }} 
          />
        </Box>
      )}
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        deleting={deleting}
        deleteResult={deleteResult}
      />
      <CustomDialog
        open={customDialogOpen}
        onClose={() => setCustomDialogOpen(false)} 
        title={"Resultado"}
        content={
          <Typography>
            {dialogMessage}
          </Typography>
        }
        actions={
          <Button onClick={() => setCustomDialogOpen(false)} color="primary">
            Cerrar
          </Button>
        }
      />
    </Box>
  );
}

export default UserTable;
