import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const NavBar = ({ onLogout }) => {
  return (
    <nav className="navbar bg-base-100 px-4 shadow-md">
      <div className="flex-1">
        <a className="text-xl font-bold">ChatApp</a>
      </div>
      <div className="flex-none gap-4">
        {/* Notifications Icon */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle">
            <FaBell className="text-xl" />
          </div>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">3 Notifications</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-sm">View</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Icon */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <FaUserCircle className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
          </ul>
        </div>

        {/* Logout Button */}
        <button className="btn btn-outline btn-error" onClick={onLogout}>
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
