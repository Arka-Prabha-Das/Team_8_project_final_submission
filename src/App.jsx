import Home from './components/Home';
import Login from './components/Login';
import Car from './components/Car';
import Admin from './components/Admin';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import CarDetails from './components/CarDetails';
import Bookings from './components/Bookings';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import CheckAuth from './utils/CheckAuth';
import SuccessPage from './components/SuccessPage';
import Team from './components/Team';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LicenseForm from './components/LicenseForm';


function App() {
  // const  requestPermission = async ()=> {
  //   console.log('Requesting permission...');
  //   const permission = await Notification.requestPermission();
  //     if (permission === 'granted') {
  //       const messaging = getMessaging();
      
  //     const token = await getToken(messaging, {vapidKey: "BCHtOhKneoCmYqllVHq4QoIpnA3o7Nmaek3_KcYbpdbzi6rsiMIhmLXOOV7NKfjAja8tY_ZMvVR7rlhTA5HcyyA"});
  //     if (token) {
  //       localStorage.setItem("token", token);
  //       console.log('Token:', token);
  //       // Listen for messages when the app is in the foreground
  //       onMessage(messaging, (payload) => {
  //         console.log('Message received. ', payload);
  //         // Handle the message. For example, show a notification
  //         // This is optional: you might want to handle messages in a different part of your app
  //       });
  //     }
  //     }
  // }
  // useEffect(()=>{
  //   requestPermission();
  // },[])
  return (
    <Provider store={appStore} >
      <Router>
        <div>
          <CheckAuth />
          <section>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route path="/cars" element={<Car />} />
              <Route path="/cars/:carID" element={<CarDetails />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path='/success/:sessionId' element={<SuccessPage />} />
              <Route path="/team" element={<Team />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/license" element={<LicenseForm />} />
            </Routes>
          </section>
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
