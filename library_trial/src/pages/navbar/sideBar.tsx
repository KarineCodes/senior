import * as AiIcons from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import "./sideBar.css";

interface SidebarItem {
  title: string;
  path: string;
  icon: JSX.Element;
  cName: string;
}

export const SidebarData: SidebarItem[] = [
  {
    title: 'Books',
    path: '/Inventory/Books',
    icon: <AiIcons.AiFillBook />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/Inventory/Users',
    icon: <FaUser />,
    cName: 'nav-text'
  }
];

import { useState } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

interface SidebarItem {
  title: string;
  path: string;
  icon: JSX.Element;
  cName: string;
}

interface UserProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
const Navbar: React.FC<UserProps> = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          {/* <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link> */}
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            {SidebarData.map((item: SidebarItem, index: number) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <div className="icon-background">{item.icon}</div>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
