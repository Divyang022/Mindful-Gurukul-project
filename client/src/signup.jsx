import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { BASE_URL } from './helper';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

  
      console.log(response.data);

      
    if (response.data.message === 'Email not registered') {
      alert('Email not registered');
    } else if (response.data.message === 'Password is incorrect') {
      alert('Password is incorrect');
    } else if (response.data.message === 'Login successful') {
      navigate('/userList');
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Email or password is incorrect');
    } else if (error.response && error.response.status === 400 && error.response.data.error === 'Email is already in use') {
      alert('Email is already in use');
    } else {
      console.error('Error during login:', error);
    }
  }
};

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your Email and Password!</p>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />
              <button onClick={handleLogin} className='btn btn-primary'>
                Login
              </button>
              <br></br>
              <div>
                <p className="mb-0">Do not have an account? <Link to='/signup' className="text-white-50 fw-bold">Sign Up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
