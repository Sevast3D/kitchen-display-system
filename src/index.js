import React from 'react';
import ReactDOM from 'react-dom/client';
// import styled from 'styled-components';
import './index.css';
import './assets/global.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';
import { AuthProvider } from './config/AuthContext';

registerLicense('Mgo+DSMBaFt+QHFqVkNrWU5BaV1CX2BZf1F8RmdTf1dgFChNYlxTR3ZbQlhiS31XdUJhXn1b;Mgo+DSMBPh8sVXJ1S0d+X1RPc0BHQmFJfFBmRGFTfFp6dFxWACFaRnZdQV1nSXtSdEZnWnhceH1Q;ORg4AjUWIQA/Gnt2VFhhQlJBfVpdWHxLflF1VWJbdV10flVPcDwsT3RfQF5jTX5Wd0dgXXxZc3RXQw==;MTYzMDYzM0AzMjMxMmUzMTJlMzMzNVhOb3RabGtDMEVqZlhlYXJOZklCeWlJMlB0Wk9kRGZzbFYvNU5xbVNZN009;MTYzMDYzNEAzMjMxMmUzMTJlMzMzNUk3bFFUdTIzcEVJYUcwcldGMnhoY2N2VlNWZVdBRVJMS2RWcENIT2ZJRlU9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RHQmZWfFN0RnNYfVRzcF9GaUwxOX1dQl9gSXpTc0RhWntdd3dQTmU=;MTYzMDYzNkAzMjMxMmUzMTJlMzMzNVlHVFBlanhKelFuSmlkcmNrWHhLOFhpS2tzemxXeTVaQmF2L05YcWxBanc9;MTYzMDYzN0AzMjMxMmUzMTJlMzMzNUdVN2o4VVFCQlhKTTZQa3o2a2xtbytZMzNuVjFWSXZ4U3FHSzZoNFlaMlU9;Mgo+DSMBMAY9C3t2VFhhQlJBfVpdWHxLflF1VWJbdV10flVPcDwsT3RfQF5jTX5Wd0dgXXxZdHVcQw==;MTYzMDYzOUAzMjMxMmUzMTJlMzMzNWU2TllacTVuRCt5N09tUHo3ZlhpSG4vVVNkeWVaVllZaDlpN0dsaHBKRGM9;MTYzMDY0MEAzMjMxMmUzMTJlMzMzNUkvSkozbEkvb0t6UnF2TGpNd1FiRnhSYzhGK0Z4aXpRUlN2NXVrNzd0NGM9;MTYzMDY0MUAzMjMxMmUzMTJlMzMzNVlHVFBlanhKelFuSmlkcmNrWHhLOFhpS2tzemxXeTVaQmF2L05YcWxBanc9');

const initialUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

