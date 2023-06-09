import { React, useState } from 'react'

import "./Settings.css"

import DeskMenu from "../../components/UI/SettingDeskInfo/DeskMenu"

import toggleIcon from '../../components/UI/Sidebar/assets/icons/sidebar-toggle.png'
import iconSettings from './assets/iconSetting.png'

function Settings({ onToggleSidebar }) {
  const [isDeskMenuOpen, setDeskMenuOpen] = useState(false);

  const handleOpenDeskMenu = () => {
    setDeskMenuOpen(!isDeskMenuOpen);
  }
  const handleProductsMenu = () => {

  }

  return (
    <div>
      <div className='top-bar'>
        <button onClick={onToggleSidebar} className='btn-brown btn-hide-sidebar'>
          <img src={toggleIcon} className="icon" alt=''></img>
        </button>
      </div>
      <div className='container-settings'>
        <div className="font-size-42 bold title-settings">
          <img src={iconSettings} className='icon'></img>Settings
        </div>
        <div className='container-menu'>
          <h3 className='font-size-20 gray-color'>Desks</h3>
          <div className='gray-line'></div>
          <div className='title-settings'>
            <div className='font-size-32'> Currently: </div>
            <div className='font-size-32 bold'>28</div>
          </div>
          <div>
            <div className='flex-start gap-18'>
              <div className='title-settings'>
                <div className='font-size-20 gray-color'> Empty </div>
                <div className='font-size-20 bold'>8</div>
              </div>
              <div className='title-settings'>
                <div className='font-size-20 gray-color'> Busy </div>
                <div className='font-size-20 bold'>145</div>
              </div>
            </div>
          </div>
          <button className='action-btn' onClick={handleOpenDeskMenu}> 
            <div className='font-size-16 bold text-white'>Open Desk Menu</div>
          </button>
          <DeskMenu showPopup={isDeskMenuOpen} onClose={handleOpenDeskMenu} />
        </div>
        <div className='container-menu'>
          <h3 className='font-size-20 gray-color'>Menu</h3>
          <div className='gray-line'></div>
          <div className='title-settings'>
            <div className='font-size-32'> Available Products: </div>
            <div className='font-size-32 bold'>28</div>
          </div>
          <button className='action-btn' onClick={handleProductsMenu}>
            <div className='font-size-16 bold text-white'>Open Product's Menu</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
