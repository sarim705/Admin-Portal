import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, IconButton } from '@mui/material';
import UsersTable from './Users/UsersTable';  
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        console.log('Data from API:', response.data);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please check the console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleSelectAllRows = () => {
    const allIds = filteredUsers.slice((currentPage - 1) * 10, currentPage * 10).map(user => user.id);
    setSelectedRows(allIds);
  };

  const handleEditRow = (id) => {
    setEditingRow(id);
  };

  const handleSaveEdit = (id, updatedName, updatedEmail) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          name: updatedName,
          email: updatedEmail,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setEditingRow(null);
  };

  const handleDeleteRow = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Paper>
        <TextField
          label="Search"
          variant="outlined"
          placeholder="Enter..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        <UsersTable
          users={filteredUsers}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          selectedRows={selectedRows}
          onCheckboxChange={handleCheckboxChange}
          onSelectAllRows={handleSelectAllRows}
          onEditRow={handleEditRow}
          editingRow={editingRow}
          onSaveEdit={handleSaveEdit}
          onDeleteRow={handleDeleteRow} // Passing handleDeleteRow function
        />

        {selectedRows.length > 0 && (
          <IconButton onClick={() => handleDeleteRow(selectedRows[0])}>
            <DeleteIcon />
          </IconButton>
        )}
      </Paper>
    </Container>
  );
};

export default App;
