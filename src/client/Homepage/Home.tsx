import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './Home.css';
import aboutbanner from './aboutbanner.jpg';
import catsell from './catsell.png';
import catbuy from './catbuy.png';

const Home = () => {
  return (
    <div>
      <Sidebar />
      <div className='aboutcontainer'>
        <h1 className='big-heading'>Welcome Back to Callback Cats!</h1>
        <img src={aboutbanner} alt='aboutbanner' className='aboutbanner' />
        <div className='abouttext'>
          <p>
            We are Callback Cats, a cat-themed e-commerce platform. Our mission
            is to provide cat lovers around the world with the best experience
            with exploring cat breeds.
          </p>
          <p>
            At Callback Cats, we understand that cats are more than just pets -
            they are family members. That's why we only offer the most friendly
            user experience to meet the needs of both cats and their owners.
          </p>
          <p>
            Thank you for choosing Callback Cats for all your cat-related needs!
          </p>
        </div>
      </div>
      <div className='imagecontainer'>
        <img src={catbuy} alt='catbuy' className='catbuy' />
      </div>
      <div className='buycontainer'>
        <h1>Adopt:</h1>
        <p>
          You will be able to explore different options of cats that are for
          adoption from other users. You can read the cat's description based on
          the user's listing which can include the cat's breed, age, and
          personality! You can submit an application to donate the cat. You can
          keep track of your own applications on your account profile to view
          the statuses of your applications.
        </p>
      </div>
      <div className='imagecontainer'>
        <img src={catsell} alt='catsell' className='catbuy' />
      </div>
      <div className='buycontainer'>
        <h1>Donate:</h1>
        <p>
          You will be able to list your own cat for donation with an image of
          your cat. You can include a description of your fur buddy to make sure
          your cat goes to the perfect owner. You can keep track of new owners'
          submitted applications on your account profile.
        </p>
      </div>

      <div className='contactcontainer'>
        <div className='contact-elements'>
          <ul>
            <li>
              <h2>Contact:</h2>
            </li>
            <li>crystyang108@gmail.com</li>
            <li>asamiul101@gmail.com</li>
            <li>reaz.shakil2@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;