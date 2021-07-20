import logo from '../assets/images/logo.svg';

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="Animal Lovers" />
    </header>
  );
};

export default Header;
