import React, { ReactNode, useEffect, useState } from 'react';
import './Adoptpage.css';
import Navbar from '../Components/Navbar';
import LoginNavbar from '../Components/LogoutNavBar';
import CatInfoCard from '../Components/CatInfoCard';
import userAuth from '../Custom_hook/UserAuth';
import Footer from '../Components/footer';
import { Link, useNavigate } from 'react-router-dom';
import CatMessageDialogbox from '../Components/CatMessageDialogbox';

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
  const [disableBtn, setDisableBtn] = useState(false);

  const [catId, setCatId] = useState(0);

  const [open, setOpen] = useState(false);

  const nav = useNavigate();

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const [cats, setCats] = useState<Cats[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/all_cats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        //console.log(data);
        if (data.code === 400) {
          alert('Not cat found');
        } else {
          //console.log(data.body);
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
        console.log('error');
      });
  }, []);

  return (
    <>
      {auth?.dataEmail ? <LoginNavbar /> : <Navbar />}
      <div className='my-[100px] text-center text-[#394867]'>
        <h1 className='big-heading'>Choose Your Favourite Cat</h1>
      </div>
      <div className=' lg:w-[70%] lg:mx-auto w-[90%] grid md:grid-cols-3 grid-cols-2 gap-4 mx-[5%] p-4'>
        {cats.map((cat) => (
          <div key={cat.id} className='shadow-md bg-white p-4 rounded-lg'>
            <CatInfoCard cat={cat} />
            <div>
              Donated by <strong>{cat.seller_name}</strong>
            </div>
            {auth.name == cat.seller_name ? null : (
              <button
                disabled={disableBtn}
                onClick={() => {
                  setOpen(true);
                  setCatId(cat.id);
                  setDisableBtn(true);
                }}
                className={
                  disableBtn
                    ? 'cursor-pointer content-center mt-4 px-10 py-3 border-2 hover:border-grey-300 hover:bg-grey-300 rounded-md text-center hover:text-black'
                    : 'cursor-pointer content-center mt-4 px-10 py-3 border-2 hover:border-red-400 hover:bg-red-400 rounded-md text-center hover:text-white'
                }
              >
                Request For Adoption
              </button>
            )}
          </div>
        ))}
      </div>
      {open ? (
        auth?.dataEmail ? (
          <CatMessageDialogbox cat_id={catId} open={open} setOpen={setOpen} />
        ) : (
          <>
            {alert('You need to login to request for Adoption')}
            {nav('/login')}
          </>
        )
      ) : null}

      {/* footer  */}
      <Footer />
    </>
  );
}

export default Adoptpage;
