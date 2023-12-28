import Signup from './signup';
import Login from './login';
import UserList from './UserList';
import UserDetails from './FullUserDetail';
import AddNewUser from './addNewUser';  
import Footer from './footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Login />} />
        <Route path="/userList" element={<UserList />} />
        <Route path="/userDetails/:userId" element={<UserDetails />} />
        <Route path="/addUser" element={<AddNewUser />} />  {/* Updated component name */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
