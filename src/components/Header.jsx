import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h2>
        <img
          height={50}
          src="https://cdn.freebiesupply.com/logos/large/2x/job-logo-png-transparent.png"
        />
        <span>JOB STATUS TRACER</span>
      </h2>
      <nav>
        <NavLink to={'/'}>Job List </NavLink>
        <NavLink to={'/add-job'}>Add New Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
