import React from 'react';

import Sidebar from '../Navbar/Sidebar';
import './Home.css';
import aboutbanner from './aboutbanner.jpg';
import catsell from './catsell.png';
import catbuy from './catbuy.png';
import catcover from "../../../public/animated-cat.png"
import NavbarCustom from "../components/NavbarCustom"
const Home = () => {
  return (
    <div>
      <NavbarCustom/>
      
      <div className='about-container w-[100%] md:h-[95vh] h-[50vh] ' style={{backgroundImage: 'url("../../../public/cat-cover.png")',   backgroundRepeat: "no-repeat"
 }}>
       <div className='title-container md:pt-[30vh] md:px-[2%]'>
       <h1 className='home-title big-heading text-[#394867] py-4 align-middle  bg-gray-100 md:rounded-lg opacity-75 mt-[50px] lg:w-[650px] shadow-lg'>Welcome Back to Callback Cats!</h1>
       <div className='mt-10 w-[50%] h-[300px] mini-container opacity-[.68] bg-gray-100 p-5 rounded-lg shadow-lg shadow-[#F99B7D]'>
        <div>
        <p className='w-[350px] lg:inline-block text-left mr-2 lg:text-2xl text-xl text-black font-[Montserrat]'>There are numerous cat breeds, each with their unique characteristics. You can either trade or adopt a cat of your liking.</p>
        <button className=' p-5 inline-block lg:align-top mt-4 lg:mt-8 text-black rounded-sm  shadow-md  shadow-red-400 hover:bg-red-400 hover:text-white'>Get Started</button>
        </div>
       </div>
       </div>
        <div className='w-[100%] h-[100vh]'>
          
          {/* <img  src={catcover} alt='aboutbanner' className='about-banner ' /> */}
        </div>
        
        
      </div>
      <h1 className='bottom-title big-heading text-[#394867] py-4 align-middle  bg-white md:rounded-lg opacity-70 mt-[50px] lg:w-[650px] shadow-lg'>Welcome Back to Callback Cats!</h1>
      <div className=' middle-container h-[400px] w-full '>
            <div className='about-text font-[Montserrat] text-xl p-5 w-[50%] mx-auto mt-[100px]'>
              <h1 className='big-heading text-red-400  mb-[50px]'>About Us</h1>
                <p className='my-5'>
                  We are Callback Cats, a cat-themed e-commerce platform. Our mission
                  is to provide cat lovers around the world with the best experience
                  with exploring cat breeds.
                </p>
                <p className='my-5'>
                  At Callback Cats, we understand that cats are more than just pets -
                  they are family members. That's why we only offer the most friendly
                  user experience to meet the needs of both cats and their owners.
                </p>
                <p className='my-5'>
                  Thank you for choosing Callback Cats for all your cat-related needs!
                </p>
              </div>

              {/* displaying buying container */}
              <div  className="grid lg:grid-cols-2 buy-cat-container  ">
                  
                 <div className=' grid lg:grid-cols-2 pl-[100px]'>
                  <div></div>
                  <img className='w-[50%]'  src={catcover} alt="" />
                 </div>
                 <div className='rounded-md bg-red-400'>
                    <p className='p-10 md:text-xl text-white '>
                      You will be able to explore different options of cats that are for
                      adoption from other users. You can read the cat's description based on
                      the user's listing which can include the cat's breed, age, and
                      personality! You can submit an application to donate the cat. You can
                      keep track of your own applications on your account profile to view
                      the statuses of your applications.
                    </p>
                 </div>
                 
              </div>
              {/*  */}
      </div>

    </div>
  );
};

export default Home;
