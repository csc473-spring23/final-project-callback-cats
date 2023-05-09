import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Navbar/Sidebar';
import './Catfactspage.css';

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
  const apiKey = 'live_vqlyJCE6h1vvBnP98Vu9Ympn46eZRxJgKIPNYYDn10kGLOlaJbkalShJRUIQgnDV';

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': apiKey
      }
    })
    .then(response => response.json())
    .then(data => {
      const breedData = data.map((breed: any) => ({
        id: breed.id,
        name: breed.name,
        origin: breed.origin,
        life_span: breed.life_span,
        energy_level: breed.energy_level,
        affection_level: breed.affection_level,
        description: breed.description,
        image: breed.image?.url
        
      }));
      getBreeds(breedData);
    })
    .catch(error => console.log(error));
  }, [apiKey]);

  return (
    <div>
      <Sidebar />
      <div className="header">
        <h1>Cat Facts</h1>
        <h2>Read below about the different cat breeds and learn about which furry friend is right for you!</h2>
      </div>
      
      <div className="cat-breeds-container">
      
      {breeds.map(breed => (
        <div key={breed.id} className="breed-container">
          <img src={breed.image} alt={breed.name} />
          <div className="breed-info">
            <h2>{breed.name}</h2>
            <p><strong>Origin:</strong> {breed.origin}</p>
            <p><strong>Life Span:</strong> {breed.life_span}</p>
            <p><strong>Energy Level:</strong> {breed.energy_level}</p>
            <p><strong>Affection Level:</strong> {breed.affection_level}</p>
            <p><strong>Fact:</strong> {breed.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
    
  );
}

export default Catfactspage;