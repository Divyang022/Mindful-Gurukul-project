import { useState } from 'react';
import { useNavigate} from 'react-router-dom'; 
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { BASE_URL } from './helper';

function AddUser() {

const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = async () => {
    try {

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

      const formData = {
        name,
        email,
        phone,
        //gender,
       // hearAbout,
       // city,
       // state,
      };

      // Make a POST request to the backend
      await axios.post(`${BASE_URL}/api/saveFormData`, formData);


      alert("Succesfully added");

      navigate('/userList');

      // Use history.push to navigate to the /userList page
     // history.push("/userList");
      console.log('After redirect');

    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard
            className='bg-dark text-white my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Enter Details</h2>
              <br></br>

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Name'
                id='name'
                type='text'
                size='lg'
                onChange={(e) => setName(e.target.value)}
                value={name}
                pattern="[A-Za-z ]+"
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Email address'
                id='email'
                type='email'
                size='lg'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Phone'
                id='phone'
                type='tel'
                size='lg'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                pattern="[0-9]+"
              />

           

        <button onClick={handleSave} className='btn btn-primary'>
        Save
         </button>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default  AddUser;

