import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'

function CategoryComponent() {
    const [product, setProducts] = useState([])
    const { category } = useParams()

    const getProducts = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
            setProducts(res.data)
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [category])

    return (
        <div className="product grid md:grid-cols-4 grid-cols-2 gap-6 overflow-y-auto p-5">
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
    )
  }

export default CategoryComponent