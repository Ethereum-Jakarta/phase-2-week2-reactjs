import React, {useState} from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch } from '@fortawesome/free-solid-svg-icons'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
function Navbar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };
  return (
    <>
    <header>
        <div className="navbarHead flex p-5 justify-between">
          <div className="navbarBrand"> 
            <h1 className='font-semibold md:text-2xl'>Ecommerce</h1>
          </div>
          <div className="navbarSearch hidden md:flex flex-1 px-10">
            <div className="search-container border border-grey-500 rounded-md md:w-full flex">
              <select name="" id="" className="category-select py-1 px-2 border-none rounded-md">
                <option value="all" className="catergory">Category</option>
              </select>
              <input type="text" class="search-input flex-1 ml-2 py-1 px-2 border-none rounded-md md:w-full sm:w-20" placeholder="Search product or brand here."></input>
            </div>
          </div>
          <div className="navbarUsers flex items-center gap-5">
                    <button onClick={toggleSearch} className="md:hidden focus:outline-none"><FontAwesomeIcon icon={faSearch} /></button>
                    <a href="" className="hover:scale-105"><FontAwesomeIcon icon={faCartShopping} /></a>
                    <a href="" className="hover:scale-105"><FontAwesomeIcon icon={faUser} /></a>
                </div>
            </div>
            {isSearchVisible && (
                <div className='md:hidden px-5 pb-5'>
                    <div className="search-container border border-grey-500 rounded-md w-full flex"> 
                        <input type="text" className="search-input flex-1 ml-2 py-1 px-2 border-none rounded-md" placeholder="Search product or brand here." />
                    </div>
                </div>
            )}
        <hr />
    </header>
    </>
  )
}

export default Navbar