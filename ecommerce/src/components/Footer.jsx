import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <>
    <div className="footer md:p-10 p-5 bg-costumFoot ">
        <div className="footerContainer flex justify-between ">
            <div className="footerBrand p-5">
                <h1 className='text-white font-semibold text-3xl'>Ecommerce</h1>
                <div className="icons flex flex-row gap-5 text-gray-300 py-10">
                    <a href="" className='hover:scale-110 transition-all'><FontAwesomeIcon icon={faInstagram} size='2xl'/></a>
                    <a href="" className='hover:scale-110 transition-all'><FontAwesomeIcon icon={faFacebook} size='2xl'/></a>
                    <a href="" className='hover:scale-110 transition-all'><FontAwesomeIcon icon={faYoutube} size='2xl'/></a>
                </div>
            </div>
            <div className="FooterMenus grid md:grid-cols-2 md:gap-10 gap-5 p-5">
                <div className="footerDetail">
                    <h1 className='text-gray-300 font-semibold'>Ecommerce</h1>
                    <div className="menu grid">
                        <a href="" className='text-white hover:scale-105 transition-all'>About Ecommerce</a>
                        <a href=""className='text-white hover:scale-105 transition-all'>Career</a>
                    </div>
                </div>
                <div className="footerGuideandHelp">
                    <h1 className='text-gray-300  font-semibold'>Guide & Help</h1>
                    <div className="menu grid">
                        <a href="" className='text-white hover:scale-105 transition-all'>Ecommerce Care</a>
                        <a href=""className='text-white hover:scale-105 transition-all'>Term and confition</a>
                        <a href=""className='text-white hover:scale-105 transition-all'>Privacy</a>
                    </div>
                </div>
            </div>
        </div>
        <hr className='border-white '/>
        <div className="copyright md:pt-2 h-2">
            <h1 className='text-center text-white '>&copy; Ecommerce</h1>
        </div>
    </div>
    </>
  )
}

export default Footer