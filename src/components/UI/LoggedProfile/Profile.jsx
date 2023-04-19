import React from 'react'
import * as ReactDom from 'react-dom';
import { enableRipple } from '@syncfusion/ej2-base';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';

import './Profile.css'
import downIcon from './assets/DownArrow.png'
import profilePic from "./assets/ProfileImage.jpg"
import account from "./assets/user.png"
import logout from "./assets/log-out.png"
enableRipple(true);

function profile() {
  let items = [
    {
        iconCss: 'user-icon',
        text: 'Account Settings',
        url: '/account'
    },
    {
        iconCss: logout,
        text: 'Log Out',
        url: '/'
    }
];
function itemBeforeEvent(args) {
    args.element.getElementsByTagName('a')[0].setAttribute('target', '_blank');
}
  return (
    <div className='container'>
      <div className='circular-container'>
      <img className='profile-image' src={profilePic} alt=''></img>
      </div>
      <p className='text-black font-size-16'>Andrei Cristian</p>
      <DropDownButtonComponent items={items} beforeItemRender={itemBeforeEvent} alt='button'>
        <img src={downIcon} className='arrow'></img>
      </DropDownButtonComponent>
    </div>
  )
}

export default profile;
// ReactDom.render(<profile />, document.getElementById('button'));
