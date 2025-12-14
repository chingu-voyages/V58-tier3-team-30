import Logo from './Logo';
import MobileNav from './MobileNav';
import Navbar from './Navbar';

function Header() {
  return (
    <header className="bg-chingu-green-600 flex flex-row justify-between items-center py-3 pl-3 pr-5 border-b border-chingu-green-400 z-20">
      <Logo />
      <MobileNav />
      <Navbar />
    </header>
  );
}

export default Header;
