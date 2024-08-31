import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Jacket from '../assets/img/jacket.jpg'

function FlashSale() {
  const [product, setProduct] = useState([])

  const getProduct = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products/');
      const products = res.data.slice(0,6)
      setProduct(products)
      console.log(res.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    getProduct() 
  }, [])
  return (
    <>
    <div className="product bg-costumGray">
        <div className="product-container p-10">
            <h1 className='font-semibold text-2xl'><FontAwesomeIcon icon={faBolt} /> Flash Sale</h1>
        </div>
      <div className="product flex flex-row gap-6 overflow-auto px-10 max-w-screen">
        {
          product.map((data, index) => {
              return (
                <>
                  <a href={`/DetailsProduct/${data.id}`} className="bg-white rounded-lg shadow-md p-4 md:w-64 mb-5 hover:translate-y-2 transition-all flex-shrink-0 w-48">
                    <div className="relative group bg-costumGray">
                      <img  src={data.image} alt="Product"  className="rounded-t-lg md:h-56 w-full h-40"/>
                      <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 hidden group-hover:block transition-opacity z-10"><FontAwesomeIcon icon={faHeart} size="lg" /></button>
                    </div>
                    <div className="pt-4">
                      <h3 className="text-sm font-semibold text-gray-700">{data.title.substring(0,30)}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-lg font-bold text-black">${data.price}</span>
                        <span className="text-sm line-through text-gray-400 ml-2">$525.000</span>
                      </div>
                    </div>
                    <div className="relative pt-4">
                      <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                        <div style={{ width: '90%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-costumBar"></div>
                        <div className="text-xs text-gray-600">9/10 Sale</div>
                      </div>
                    </div>
                  </a>
                </>
              )
          })
        }  
      </div>
    </div>
   </>
  )
}

export default FlashSale