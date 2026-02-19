import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'


function DetailsProduct() {
    const [quantity, setQuantity] = useState(1)

    const plusquantity = () => {
        setQuantity(quantity + 1)
    }

    const minquantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }


    const [product, setProduct] = useState([])
  const {id} = useParams();

  const getProduct = async () => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(res.data)
    } catch (e) {
        console.log(e.message)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])
  return (
    <>
        <div className="DetailsProduct">
            <div className="grid md:grid-cols-2 overflow-auto max-w-screen">
                <div className="md:m-10 mt-5 p-10">
                <img className="w-full max-w-xs md:max-w-md -mt-10 mx-auto" src={product.image} alt="Product" />
            </div>
                <div className="mt-10 md:mt-20 p-4 md:p-5">
                    <div className="Content">
                        <h1 className="font-semibold text-xl md:text-2xl">{product.title}</h1>
                        <h3 className="text-sm md:text-base">{product.description}</h3>
                        <h1 className="font-semibold text-3xl md:text-5xl pt-2">${product.price}</h1>
                    <div className="size flex flex-wrap py-5 gap-3">
                        <button className="w-12 h-12 flex items-center justify-center border rounded-lg bg-black text-white">39</button>
                        <button className="w-12 h-12 flex items-center justify-center border rounded-lg">40</button>
                        <button className="w-12 h-12 flex items-center justify-center border rounded-lg">41</button>
                        <button className="w-12 h-12 flex items-center justify-center border rounded-lg">42</button>
                    </div>
                        <div className="countCart flex flex-wrap gap-5">
                            <button onClick={minquantity} className='btnmin py-1 md:px-5 px-10 rounded-md border-2 border-black font-semibold text-lg'>-</button>
                            <h1 className='pt-2 font-semibold'>{quantity}</h1>
                            <button onClick={plusquantity} className='btnplus py-1 md:px-5 px-10 rounded-md border-2 border-black font-semibold text-lg'>+</button>                 
                            <div className="buttonBuy flex flex-row gap-5">
                                <button className='py-1 md:px-10 px-5 rounded-md border-2 border-green-600 font-semibold text-lg text-green-600 hover:scale-105 transition-all'><FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon></button>
                                <button className='py-1 md:px-20 px-24 rounded-md border-2 border-none font-semibold text-lg bg-green-600 text-white hover:scale-105 transition-all'>Buy Now!</button>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailsProduct