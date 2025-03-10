import { useState, useEffect } from 'react';
import API_URL from '../../config'

interface User {
  id: number;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  gender: string;
  status: string;
}

const useClientContext = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState<string | null>(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`api/scoring/users/`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      setDeleting(true);
      try {
        const response = await fetch(`/api/v4/scoring/users/${userToDelete.dni}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setDeleteResult('Delete successful');
        fetchData();
      } catch (error) {
        console.error('Error deleting user:', error);
        setDeleteResult('Error deleting user');
      } finally {
        setDeleting(false);
      }
    }
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    setDeleteResult(null);
  };

  return {
    users,
    filteredUsers,
    page,
    rowsPerPage,
    loading,
    editingUser,
    deleteDialogOpen,
    userToDelete,
    deleting,
    deleteResult,
    customDialogOpen,
    dialogMessage,
    setFilteredUsers,
    setCustomDialogOpen,
    setDialogMessage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEdit,
    handleDelete,
    openDeleteDialog,
    closeDeleteDialog,
    fetchData,
    setEditingUser
  };
};

export { useClientContext };