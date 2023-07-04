import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { auth, getUserData } from './firebase';

import './pages/Waiter/Waiter.css'


import Sidebar from './components/UI/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Waiter from './pages/Waiter/Waiter';
import Members from './pages/Members/Members';
import Empty from './pages/EmptyDesks';
import Payment from './pages/ForPayments';
import Settings from './pages/Settings/Settings';
import Kitchen from './pages/Kitchen/Kitchen';


function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />

        <PrivateRouteWithSidebar
          path="/w"
          component={Waiter}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <PrivateRouteWithSidebar
          path="/members"
          component={Members}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <PrivateRouteWithSidebar
          path="/empty"
          component={Empty}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <PrivateRouteWithSidebar
          path="/payment"
          component={Payment}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <PrivateRouteWithSidebar
          path="/settings"
          component={Settings}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <PrivateRouteWithSidebar
          path="/kitchen"
          component={Kitchen}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
      </Switch>
    </Router>
  );
}

// Route for no login perm page
function RouteWithSidebar({ path, component: Component, onToggleSidebar, showSidebar }) {
  return (
    <>
      <div className={`sidebar-frame ${showSidebar ? '' : 'hide'} `}><Sidebar /></div>
      <div className={showSidebar ? 'page-container' : 'page-container-full'}>
        <Route path={path} render={(props) => <Component {...props} onToggleSidebar={onToggleSidebar} />} />
      </div>
    </>
  );
}

// Custom PrivateRouteWithSidebar component for authenticated routes
function PrivateRouteWithSidebar({ path, component: Component, onToggleSidebar, showSidebar }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {

    getUserData()
      .then((userData) => {
        // Access and use the userData here
        // console.log(userData);
        setUserInfo(userData);
        setUserRole(userData.role)
        // console.log("user role:" + userRole);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(true)
        console.error(error);
      })

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {

    // Display a loading state while checking the authentication state
    return (
      <div className='spinner-wrapper flex-row gap-10'>
        <div className="spinner-border text-warning">
        </div>
        <span className='text-orange h4'>
          Loading..
        </span>
      </div>
    )
  }

  return (
    <>
      <div className={`sidebar-frame ${showSidebar ? '' : 'hide'} `}><Sidebar /></div>
      <div className={showSidebar ? 'page-container' : 'page-container-full'}>
        <Route path={path} render={(props) => {
          if (!user) {
            return <Redirect to="/" />
          }

          if (userRole === "WAITER") {
            if (path === '/w' || path === '/empty'|| path === '/payment'|| path === '/members') {
              return <Component {...props} onToggleSidebar={onToggleSidebar} />
            } {
              return <Redirect to="/w" />
            }
          }
          if (userRole === "CHEF") {
            if (path !== '/settings') {
              return <Component {...props} onToggleSidebar={onToggleSidebar} />
            } else {
              return <Redirect to="/kitchen" />
            }
          }
          if (userRole === "ADMIN") {
              return <Component {...props} onToggleSidebar={onToggleSidebar} />
          }
          if (userRole === "GUEST") {
            if (path === '/members') {
              return <Component {...props} onToggleSidebar={onToggleSidebar} />
            } else {
              return <Redirect to="/members" />
            }
          }
        }
        } />
      </div>
    </>
  );
}


export default App;
