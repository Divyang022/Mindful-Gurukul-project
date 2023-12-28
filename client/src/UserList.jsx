import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, ListGroup, Modal, Form } from 'react-bootstrap';
import noDataImage from './No_Data_Found.jpeg';

import { BASE_URL } from './helper';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [editedUser, setEditedUser] = useState(null);

  const initialSortOption = localStorage.getItem('userListSortOption') || 'nameAsc';
  const [sortOption, setSortOption] = useState(initialSortOption);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getAllUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    

    fetchData();
  }, [showEditDialog, editedUser, sortOption]);

   // Retrieve the saved search term from local storage on component mount
   useEffect(() => {
    const savedSearchTerm = localStorage.getItem('userListSearchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []); // Run only on component mount

  // Save the search term to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('userListSearchTerm', searchTerm);
  }, [searchTerm]);

  // Save the sort option to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('userListSortOption', sortOption);
  }, [sortOption]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!userToDelete) {
        console.error('User to delete is null');
        return;
      }

      await axios.delete(`${BASE_URL}/api/deleteUser/${userToDelete._id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id));

      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleEditClick = (user) => {
    setEditedUser(user);
    setShowEditDialog(true);
    setEditedUserData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleEditSave = async () => {
    try {

      
      const { name, email, phone } = editedUserData;

    if (!name || !email || !phone) {
      alert('Name, Email, and Phone are required fields.');
      return;
    }

    if (!name.match(/^[A-Za-z ]+$/)) {
      alert('Name should contain only alphabets.');
      return;
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      alert('Invalid email format.');
      return;
    }

    if (!phone.match(/^[0-9]+$/)) {
      alert('Phone should contain only numbers.');
      return;
    }

    // Continue with the save operation if all validations pass
    await axios.put(`${BASE_URL}/api/updateUser/${editedUser._id}`, editedUserData);

    setShowEditDialog(false);
  } catch (error) {
    console.error('Error updating user:', error);
  }
  };

  const handleEditCancel = () => {
    setShowEditDialog(false);
  };

  // Sort users based on the selected option
 // Sort users based on the selected option
// Sort users based on the selected option
const sortedUsers = [...users];
if (sortOption === 'nameAsc') {
  sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
} else if (sortOption === 'nameDesc') {
  sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
} else if (sortOption === 'lastModified') {
  sortedUsers.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
} else if (sortOption === 'lastInserted') {
  sortedUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}



  // Filter users based on search criteria
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  return (
    <Container className="mt-4">
      <h1 className="text-center" style={{ color: 'white', fontFamily: 'Dancing Script' }}>
      Users List
      </h1>

      <br></br>

      {/* Search input */}
      <Form.Control
        type="text"
        placeholder="Search by Name, Email, or Phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      {/* Sort options */}
      <Form.Group controlId="formSort">
        <Form.Label><h6>Sort By:</h6></Form.Label>
        <Form.Control
          as="select"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="lastModified">Last Modified</option>
          <option value="lastInserted">Last Inserted</option>
        </Form.Control>
      </Form.Group>

      <br></br>

      <ListGroup>
  {filteredUsers.length === 0 ? (
    // Display placeholder image and message when no users are found
    <div style={{ textAlign: 'center', marginTop: '50px' ,marginBottom: '50px'}}>
            <img src={noDataImage} alt="No Data Found" style={{ width: '50%', height: 'auto' }} />
          </div>
  ) : (
    // Display the list of users
    filteredUsers.map((user) => (
      <ListGroup.Item key={user._id}>
        <strong>Name:</strong> {user.name}<br />
        <strong>Email:</strong> {user.email}<br />
        <strong>Phone:</strong> {user.phone}<br />
        
        <div className="mt-3">
      <Link to={`/userDetails/${user._id}`} className="btn btn-primary me-2">
        View Details
      </Link>
      <Button variant="danger" onClick={() => handleDeleteClick(user)} className="me-2">
        Delete
      </Button>
      <Button variant="info" onClick={() => handleEditClick(user)}>
        Edit
      </Button>
    </div>
  </ListGroup.Item>
    ))
  )}
</ListGroup>


      <Button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        as={Link}
        to="/addUser"
      >
        Add User
      </Button>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {userToDelete && userToDelete.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit user data modal */}
      <Modal show={showEditDialog} onHide={handleEditCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editedUserData.name}
                onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editedUserData.email}
                onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={editedUserData.phone}
                onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
