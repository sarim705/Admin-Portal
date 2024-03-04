import React, { useState } from 'react';
import { Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper, Checkbox, IconButton, TextField, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersTable = ({ users = [], currentPage, setCurrentPage, selectedRows = [], onCheckboxChange, onSelectAllRows, onEditRow, onSaveEdit, editingRow, onDeleteRow }) => {

  const itemsPerPage = 8;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (event, id) => {
    onCheckboxChange(event, id);
  };

  const handleSelectAllRows = () => {
    onSelectAllRows();
  };

  const handleEditRow = (id, name, email) => {
    onEditRow(id);
    setEditedName(name);
    setEditedEmail(email);
  };

  const handleSaveEdit = (id) => {
    onSaveEdit(id, editedName, editedEmail);
    onEditRow(null);
    setEditedName('');
    setEditedEmail('');
  };

  const handleDeleteRow = (id) => {
    onDeleteRow(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                onChange={handleSelectAllRows}
                indeterminate={selectedRows.length > 0 && selectedRows.length < itemsPerPage}
                checked={selectedRows.length === itemsPerPage}
              />
            </TableCell>
            <TableCell><Typography  variant="h6">ID</Typography> </TableCell>
            <TableCell><Typography  variant="h6">NAME</Typography> </TableCell>
            <TableCell><Typography  variant="h6">EMAIL</Typography> </TableCell>
            <TableCell><Typography  variant="h6">ACTION</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((user) => (
              <TableRow key={user.id} style={{ background: selectedRows.includes(user.id) ? '#c1c1c1' : '#e3f2fd' }}>
                <TableCell>
                  <Checkbox
                    onChange={(event) => handleCheckboxChange(event, user.id)}
                    checked={selectedRows.includes(user.id)}
                  />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editingRow === user.id ? (
                    <TextField
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === user.id ? (
                    <TextField
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === user.id ? (
                    <Button variant="contained" color='secondary' onClick={() => handleSaveEdit(user.id)}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={() => handleEditRow(user.id, user.name, user.email)}>
                      Edit
                    </Button>
                  )}
                  {selectedRows.includes(user.id) && (
                    <IconButton onClick={() => handleDeleteRow(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      
      <div>
        <Button variant='contained' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
          First Page
        </Button>
        <Button variant='contained' color="secondary" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span> Page {currentPage} of {totalPages} </span>
        <Button variant='contained' color="primary" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next Page
        </Button>
        <Button variant='contained' color="secondary" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          Last Page
        </Button>
      </div>
    </TableContainer>
  );
};

export default UsersTable;
