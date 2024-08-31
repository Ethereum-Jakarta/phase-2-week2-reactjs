import React,{useState, useEffect} from 'react'
import woman from '../assets/img/woman.jpg'
import Jacket from '../assets/img/jacket.jpg'
import electronics from '../assets/img/electronic.jpg'
import Bag from '../assets/img/bag.jpg'
import jewelery from '../assets/img/jwely.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CategoryTab() {
  return (
    <div className="categoryTab-container ">
       <div className="categoryTab m-10 flex md:gap-20 gap-5 justify-center items-center">
            <div className="flex flex-col items-center hover:scale-105 transition-all">
                <Link to={`./Category/men's clothing`} className="block">
                    <img src={Jacket} className="md:w-20 md:h-20 rounded-full w-16 h-16" alt="T-Shirt" />
                </Link>
                <span className="font-semibold md:text-lg text-xs text-gray-700 mt-2 text-center">men's clothing</span>
            </div>
            <div className="flex flex-col items-center hover:scale-105 transition-all">
                <Link to={`./Category/women's clothing`} className="block">
                    <img src={woman} className="md:w-20 md:h-20 rounded-full w-16 h-16" alt="T-Shirt" />
                </Link>
                <span className="font-semibold md:text-lg text-xs text-gray-700 mt-2 text-center">women's clothing</span>
            </div>
            <div className="flex flex-col items-center hover:scale-105 transition-all">
                <Link to={`./Category/electronics`} className="block">
                    <img src={electronics} className="md:w-20 md:h-20 rounded-full w-16 h-16" alt="T-Shirt" />
                </Link>
                <span className="font-semibold md:md:text-lg text-xs text-gray-700 mt-2 text-center">electronics</span>
            </div>
            <div className="flex flex-col items-center hover:scale-105 transition-all">
                <Link to={`./Category/jewelery`} className="block">
                    <img src={jewelery} className="md:w-20 md:h-20 rounded-full w-16 h-16" alt="T-Shirt" />
                </Link>
                <span className="font-semibold md:text-lg text-xs text-gray-700 mt-2 text-center">jewelery</span>
            </div> 
        </div>
    </div>
  )
}

export default CategoryTab