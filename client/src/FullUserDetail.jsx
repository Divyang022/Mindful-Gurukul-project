import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { BASE_URL } from './helper';


const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getUserDetails/${userId}`);
        console.log(response.data);

        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]); // Fetch details whenever userId changes

  return (
    <Container className="mt-4">
      <h1 className="text-center" style={{ color: 'white', fontFamily: 'Dancing Script' }}>User Details</h1>
      <br></br>

      {userDetails ? (
        <Card>
          <Card.Body>
            <Card.Title>{userDetails.name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Email:</strong> {userDetails.email}</ListGroup.Item>
              <ListGroup.Item><strong>Phone:</strong> {userDetails.phone}</ListGroup.Item>
              <ListGroup.Item><strong>Gender:</strong> {userDetails.gender}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Hear About:</strong> {userDetails.hearAbout.join(', ')}
              </ListGroup.Item>
              <ListGroup.Item><strong>City:</strong> {userDetails.city}</ListGroup.Item>
              <ListGroup.Item><strong>State:</strong> {userDetails.state}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading user details...</p>
      )}
    </Container>
  );
};

export default UserDetails;
