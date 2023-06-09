import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './pages/Waiter/Waiter.css'

import Sidebar from './components/UI/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Waiter from './pages/Waiter/Waiter';
import Members from './pages/Members/Members';
import Empty from './pages/EmptyDesks';
import Payment from './pages/ForPayments';
import Settings from './pages/Settings/Settings';


function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar)
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <RouteWithSidebar
          path="/w"
          component={Waiter}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <RouteWithSidebar
          path="/members"
          component={Members}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <RouteWithSidebar
          path="/empty"
          component={Empty}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <RouteWithSidebar
          path="/payment"
          component={Payment}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
        <RouteWithSidebar
          path="/settings"
          component={Settings}
          onToggleSidebar={handleToggleSidebar}
          showSidebar={showSidebar}
        />
      </Switch>
    </Router>
  );
}

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

export default App;
