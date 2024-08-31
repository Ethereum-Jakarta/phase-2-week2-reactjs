import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Jacket from '../assets/img/jacket.jpg'
import axios from 'axios'

function TodayForYou() {
  const [product, setProduct] = useState([])

  const getProduct = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products/');
      setProduct(res.data)
      console.log(res.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getProduct() 
  }, [])
  return (
    <div className="todayForyou">
      <div className="todayForyou-container md:p-10 p-6">
        <div className="tfy-header flex flex-col md:flex-row md:justify-between">
            <h1 className='font-semibold text-2xl'>Todays For You!</h1>
            <div className="tfy-tab mt-4 md:mt-0 grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-5">
              <a href="" className='border rounded-md border-black px-3 py-1 font-semibold bg-black text-white hover:scale-105 transition-all text-md'>Best Seller</a>
              <a href="" className='border rounded-md border-black px-3 py-1 font-semibold text-black hover:scale-105 transition-all text-md'>Keep stylish</a>
              <a href="" className='border rounded-md border-black px-3 py-1 font-semibold text-black hover:scale-105 transition-all text-md'>Special Discount</a>
            </div>
        </div>
          <div className="product grid md:grid-cols-4 grid-cols-2 gap-6 overflow-y-auto py-10">
          {
          product.map((data, index) => {
              return (
                <>
                  <a href={`/detailsProduct/${data.id}`} className="bg-white rounded-lg shadow-md p-4 md:w-64 w-40 mb-5 hover:translate-y-2 transition-all flex-shrink-0">
                    <div className="relative group bg-costumGray">
                      <img  src={data.image} alt="Product"  className="rounded-t-lg md:h-56 h-36 w-full"/>
                      <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hidden group-hover:block transition-opacity z-10"><FontAwesomeIcon icon={faHeart} size="lg" /></button>
                    </div>
                    <div className="pt-4">
                      <h3 className="text-sm font-semibold text-gray-700">{data.title.substring(0,30)}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-lg font-bold text-black">${data.price}</span>
                        <span className="text-sm line-through text-gray-400 ml-2">$525.000</span>
                      </div>
                    </div>
                  </a>
                </>
              )
          })
        }  
        </div>
      </div>
    </div>
  )
}

export default TodayForYou