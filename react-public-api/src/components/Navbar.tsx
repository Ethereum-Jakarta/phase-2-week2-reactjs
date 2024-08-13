import logo from '@/assets/logo.png';

function Navbar() {
  return (
    <header className="h-16 w-full px-10 py-2 flex font-custom sticky top-0 z-20 bg-white bg-opacity-75">
      <div className="flex flex-row items-center gap-4">
        <img src={logo} alt="logo" className="w-full h-full" />
      </div>
      <div></div>
    </header>
  );
}

export default Navbar;
