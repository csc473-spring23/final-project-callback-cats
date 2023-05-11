import React, { useEffect, useState } from 'react';
import './Catfactspage.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/footer';
type Breed = {
  id: string;
  name: string;
  origin: string;
  life_span: string;
  energy_level: string;
  affection_level: string;
  description: string;
  image: string;
};

function Catfactspage() {
  const [breeds, getBreeds] = useState<Breed[]>([]);
  const apiKey =
    'live_vqlyJCE6h1vvBnP98Vu9Ympn46eZRxJgKIPNYYDn10kGLOlaJbkalShJRUIQgnDV';

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const breedData = data.map((breed: any) => {
          let image;
          if (breed.name === 'European Burmese') {
            image = '/src/client/Catfacts_page/european-burmese.png';
          } else if (breed.name === 'Malayan') {
            image = '/src/client/Catfacts_page/malayan.jpg';
          } else {
            image = breed.image?.url;
          }
          return {
            id: breed.id,
            name: breed.name,
            origin: breed.origin,
            life_span: breed.life_span,
            energy_level: breed.energy_level,
            affection_level: breed.affection_level,
            description: breed.description,
            image: image,
          };
        });

        getBreeds(breedData);
      })
      .catch((error) => console.log(error));
  }, [apiKey]);

  return (
    <div>
      <Navbar />
      <div className='text-center lg:w-[70%] w-[90%] mx-auto'>
        <h1 className='big-heading text-[#394867]'>Cat Facts</h1>
        <h2 className='text-3xl mt-5'>
          Read below about the different cat breeds and learn about which furry
          friend is right for you!
        </h2>
      </div>

      <div className='cat-breeds-container bg-transparent'>
        {breeds.map((breed) => (
          <div
            key={breed.id}
            className='breed-container border-b-4 border-black py-3'
          >
            <img
              className='rounded-lg shadow-md w-[250px] h-[250px] object-cover object-center'
              src={breed.image}
              alt={breed.name}
            />
            <div className='breed-info text-xl my-3'>
              <h2>{breed.name}</h2>
              <p className='font-[Poppins]'>
                <strong className='font-[Merriweather]'>Origin:</strong>{' '}
                {breed.origin}
              </p>
              <p className='font-[Poppins]'>
                <strong className='font-[Merriweather]'>Life Span:</strong>{' '}
                {breed.life_span}
              </p>
              <p className='font-[Poppins]'>
                <strong className='font-[Merriweather]'>Energy Level:</strong>{' '}
                {breed.energy_level}
              </p>
              <p className='font-[Poppins]'>
                <strong className='font-[Merriweather]'>
                  Affection Level:
                </strong>{' '}
                {breed.affection_level}
              </p>
              <p className='font-[Poppins]'>
                <strong className='font-[Merriweather]'>Fact:</strong>{' '}
                {breed.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Catfactspage;
