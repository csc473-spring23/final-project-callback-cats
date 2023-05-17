import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Custom_hook/UserAuth';
import CatAcceptDialog from '../Components/CatAcceptDialog';
import LoginNavbar from '../Components/LogoutNavBar';
import Footer from '../Components/footer';

type BuyerInfo = {
  adoption_id: number;
  buyer_name: string;
  buyer_email: string;
  buyer_contact: string;
  buyer_message: string;
};

function MessagePage() {
  const [adoptionId, setAdoptionId] = useState(0);

  const [open, setOpen] = useState(false);

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const nav = useNavigate();

  const [ownerMessage, setOwnerMessage] = useState('');

  const [buyers, setBuyers] = useState<BuyerInfo[]>([]);

  useEffect(() => {
    if (auth.dataEmail) {
      const body = {
        user_id: auth.user_id,
      };
      fetch('http://127.0.0.1:5000/owner_adoption_view/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          if (data.code === 400) {
            alert(data.body);
          } else {
            console.log(data.body);
            const bodyData = data.body.map((buyer: any) => ({
              adoption_id: buyer.adoption_id,
              buyer_name: buyer.buyer_name,
              buyer_email: buyer.buyer_email,
              buyer_contact: buyer.buyer_contact,
              buyer_message: buyer.buyer_message,
            }));
            setBuyers(bodyData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('You need to Login to access this page');
      nav('/login');
    }
  }, []);

  const adoptionConfirm = () => {};

  return auth?.dataEmail ? (
    <>
      {' '}
      <LoginNavbar />
      <>
        <div className='h-full bg-pink-300 p-4 m-[20px]'>
          <div className='text-center p-2 text-5xl'>
            Message Request for Adoptions
          </div>
          <div className='grid md:grid-cols-3 grid-cols-2 gap-4  lg:mx-auto py-4'>
            {buyers.map((buyer) => (
              <div key={buyer.adoption_id} className='p-4 flex-col bg-white'>
                <div className='my-4'>
                  <div>
                    Request sent by <strong>{buyer.buyer_name}</strong>
                  </div>
                  <div>
                    <strong>Adoption Id:</strong> {buyer.adoption_id}
                  </div>
                  <div>
                    <strong>Message:</strong> {buyer.buyer_message}
                  </div>
                  <div>
                    <strong>Contact:</strong> {buyer.buyer_contact}
                  </div>
                </div>
                <button
                  className='px-20 py-3 border round-md mb-5 hover:bg-red-400 shadow-md border-gray-400 hover:border-red-400 hover:text-white'
                  onClick={() => {
                    setOpen(true);
                    setAdoptionId(buyer.adoption_id);
                  }}
                >
                  Accept
                </button>
                <button className='px-20 py-3 border round-md mb-5 hover:bg-red-400 shadow-md border-gray-400 hover:border-red-400 hover:text-white'>
                  Reject
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>Message Response from Owners</div>
          <div></div>
        </div>
      </>
      {open ? (
        <CatAcceptDialog
          adoptionId={adoptionId}
          open={open}
          setOpen={setOpen}
        />
      ) : null}
      {/* footer  */}
      <Footer />
    </>
  ) : (
    <>
      {alert('You can not access this page without logging in')}
      {nav('/login')}
    </>
  );
}

export default MessagePage;
