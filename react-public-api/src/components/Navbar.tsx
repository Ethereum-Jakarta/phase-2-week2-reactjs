import logo from '@/assets/akatsuki.png';

function Navbar() {
  return (
    <div className="h-16 w-full px-10 py-2 flex font-custom">
      <div className="flex flex-row items-center gap-4">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <p>Akatsuki</p>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
