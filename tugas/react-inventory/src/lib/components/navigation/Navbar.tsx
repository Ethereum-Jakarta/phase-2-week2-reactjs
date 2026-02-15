import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../../../routes/Profile";
import CartIcon from "../../icons/outline/CartIcon";
import ShopIcon from "../../icons/outline/ShopIcon";

type NavbarPropsItem = {
  path: string;
  name: string;
  icon: JSX.Element;
}

const NavsItem: NavbarPropsItem[] = [
  { path: "/", name: "Home", icon: <div /> },
  { path: "cart", name: "Cart", icon: <CartIcon /> },
  { path: "products", name: "Products", icon: <ShopIcon /> },
];

const UlChild: FC<{ children: JSX.Element }> = ({ children }) =>
  <li className="hover:underline hover:text-rose-500 underline-offset-8 transition-colors">
    {children}
  </li>


const createNavs = (list: NavbarPropsItem[]) => list.map(x =>
  <UlChild>
    <Link to={x.path}>
      <span className="max-sm:hidden">{x.name}</span>
      <span className="max-sm:block hidden">{x.icon}</span>
    </Link>
  </UlChild>);

const Navbar: FC<{}>
  = () => {
    const [showProfile, setShowProfile] = useState(false);

    return <>
      <nav className="py-3 px-5 flex flex-row justify-between border-b-2">
        <Link to="/">
          <span className="text-3xl">Manga<span className="text-rose-500">.js</span></span>
        </Link>
        <ul className="flex flex-row items-center gap-5 text-2xl">
          {createNavs(NavsItem)}
          <UlChild><button onClick={_ => setShowProfile(!showProfile)}>Profile</button></UlChild>
        </ul>
      </nav>
      <div className="fixed top-0 right-0 max-sm:left-0 mr-20 max-sm:mx-auto mt-[3.85rem] animate-slideup w-fit h-fit" style={{ display: showProfile ? "inherit" : "none" }}>
        <Profile />
      </div>
    </>
  }

export default Navbar;
