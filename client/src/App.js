import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//components
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Create from './pages/Create';
import Home from './pages/Home';

//redux actions
import { dispatchAccessToken, dispatchLogin, dispatchUserAuth, fetchUserInfo, dispatchUserDetailsData, dispatchUserPersonalTasksData, fetchUserDetails, fetchUserPersonalTasks } from './redux/actions/userActions';

import './App.css';

function App() {
  const dispatch = useDispatch();

  let userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {

    let userData = {
      isLoggedIn:false,
      userAuthId:'',
      userDetailsId:'',
      userPersonalTasksId:'',
      userActivitiesId:'',
      requiredData:false
    };

    localStorage.setItem('userInfo', JSON.stringify(userData));
    
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
  };

  const { isLoggedIn } = userInfo;

  const { accessToken } = useSelector((state) => state.userReducer);
  const { userAuth, userDetails } = useSelector(state => state.userReducer);

  console.log('App');

  useEffect(() => {
    if (isLoggedIn) {
      const getAccessToken = async () => {
        const resp = await axios.get('/api/refresh_token');
        dispatch(dispatchAccessToken(resp.data.accessToken));
      };
      getAccessToken();
    };

  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (accessToken) {
      dispatch(dispatchLogin());
      fetchUserInfo(accessToken).then((resp) => dispatch(dispatchUserAuth(resp.data)));
    };
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (userAuth) {
      fetchUserDetails(userAuth?.userDetails).then(res => dispatch(dispatchUserDetailsData(res.data)));
      fetchUserPersonalTasks(userAuth?.personalTasks).then(res => dispatch(dispatchUserPersonalTasksData(res.data)));
    };
  }, [userAuth, dispatch]);

  useEffect(() => {
    if (userAuth) {
      
      userInfo.userAuthId = userAuth?._id;
      userInfo.userDetailsId = userAuth?.userDetails;
      userInfo.userPersonalTasksId = userAuth?.personalTasks;
      userInfo.userActivitiesId = userAuth?.activities;

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

  }, [userAuth, userInfo]);

  useEffect( () => {
      if(userDetails?.requiredData){
        userInfo.requiredData = true;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      }
  },[userDetails, userInfo])


  return (
    <div className="App">
      <Routes>
        <Route path='/taskboard' >
          <Route path='/taskboard/home/*' element={isLoggedIn ? <Home /> : <Navigate to='/taskboard/welcome' />} />
          <Route path='/taskboard/welcome' element={<WelcomePage />} />
          <Route path='/taskboard/login' element={<Login />} />
          <Route path='/taskboard/registration' element={<Create />} />
          <Route path='/taskboard/registration/activation-token/:activationToken' element={<Create />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to="/taskboard/home" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
