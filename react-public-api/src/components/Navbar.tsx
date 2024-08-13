import logo from '@/assets/akatsuki.png';

function Navbar() {
  return (
    <header className="h-16 w-full px-10 py-2 flex font-custom sticky top-0 z-50">
      <div className="flex flex-row items-center gap-4">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <p className="text-[#ab1b21]">Akatsuki</p>
      </div>
      <div></div>
    </header>
  );
}

export default Navbar;
