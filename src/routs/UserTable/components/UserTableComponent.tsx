import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, TablePagination, IconButton, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  gender: string;
  status: string;
}

interface UserTableComponentProps {
  users: User[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (user: User) => void;
  openDeleteDialog: (user: User) => void;
  setFilteredUsers: (users: User[]) => void;
  usersData: User[];
  loading: boolean;
}

const UserTableComponent: React.FC<UserTableComponentProps> = ({
  users,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleEdit,
  openDeleteDialog,
  setFilteredUsers,
  usersData,
  loading
}) => {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    filterUsers(value);
  };

  const filterUsers = (filter: string) => {
    const filtered = usersData.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastname.toLowerCase().includes(filter.toLowerCase()) ||
      user.dni.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.gender.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      <Box className="user-table__header">
        <Typography className='user-table__title' variant="h4" component="h1" >
          Base de clientes
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#3f51b5', color: 'white' }}
        >
          Formulario
        </Button>
      </Box>
      <Box className="user-table__container">
        <Box className="user-table__filters">
          <Box className="user-table__filters-input">
            <TextField label="Buscar por nombre, apellido o DNI" value={filter} onChange={handleFilterChange}  />
          </Box>
          <Box className="user-table__pagination">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página"
            />
          </Box>
        </Box>
        <Box className="user-table__table-container">
          {loading ? (
            <Box className="user-table__loading">
              <CircularProgress />
            </Box>
          ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="user-table__table-header">Name</TableCell>
                <TableCell className="user-table__table-header">Lastname</TableCell>
                <TableCell className="user-table__table-header">DNI</TableCell>
                <TableCell className="user-table__table-header">Email</TableCell>
                <TableCell className="user-table__table-header">Gender</TableCell>
                <TableCell className="user-table__table-header">Score</TableCell>
                <TableCell className="user-table__table-header"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.dni}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.status === 'approve' ? 'Aprobado' : user.status === 'rejected' ? 'Rechazado' : undefined}</TableCell>
                    <TableCell className='user-table__actions'>
                      <Box className="user-table__actions-buttons">
                        <Button variant="contained" onClick={() => handleEdit(user)} style={{backgroundColor: '#80bfff'}}>
                          <Typography style={{ color: 'black' }}>Editar</Typography>
                        </Button>
                        <Button variant="contained" onClick={() => openDeleteDialog(user)} style={{backgroundColor: '#80bfff'}}>
                          <Typography style={{ color: 'black' }}>Borrar</Typography>
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No hubo resultados encontrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
          
        </Box>
      </Box>
    </>
  );
};

export default UserTableComponent;
