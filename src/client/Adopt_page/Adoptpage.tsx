import React, { ReactNode, useEffect, useState } from "react";
import "./Adoptpage.css";
import Navbar from "../Navbar/Navbar";
type Cats = {
  age: number;
  breed: string;
  description: string;
  gender: string;
  id: number;
  img_url: string;
  is_available: boolean;
  name: string;
  seller_email: string;
  seller_id: number;
  seller_name: string;
};

function Adoptpage() {
  const [cats, setCats] = useState<Cats[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/all_cats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.code === 400) {
          alert("Not cat found");
        } else {
          console.log(data.body);
          const catData = data.body.map((cat: any) => ({
            age: cat.age,
            breed: cat.breed,
            description: cat.description,
            gender: cat.gender,
            id: cat.id,
            img_url: cat.img_url,
            is_available: cat.is_available,
            name: cat.name,
            seller_email: cat.seller_email,
            seller_id: cat.seller_id,
            seller_name: cat.seller_name,
          }));
          setCats(catData);
        }
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);

  return (
    <>
      <Navbar email="" password="" />
      <div className="adoptTitle">
        <h1>Choose Your Favourite Cat</h1>
      </div>
      <div className="adoptBody">
        {cats.map((cat) => (
          <div key={cat.id} className="each-cat">
            <img src={cat.img_url} alt={cat.img_url} />
            <div className="cat-info">
              <p>
                <p>Donating by {cat.seller_name.toUpperCase()}</p>
                <article>
                  <strong>Name : </strong>
                  {cat.name}
                </article>
                <article>
                  <strong>Age : </strong>
                  {cat.age}
                </article>
                <article>
                  <strong>Breed : </strong>
                  {cat.breed}
                </article>
                <article>
                  <strong>Gender : </strong>
                  {cat.gender}
                </article>
                <article>
                  <strong>Is it available? : </strong>
                  {cat.is_available ? <>Yes</> : <>No</>}
                </article>
                <article>
                  <strong>Description : </strong>
                  <>{cat.description}</>
                </article>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Adoptpage;
