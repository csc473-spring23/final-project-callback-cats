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

type Messages = {
  owner_name: string;
  owner_email: string;
  owner_message: string;
};

function MessagePage() {
  const [adoptionId, setAdoptionId] = useState(0);

  const [open, setOpen] = useState(false);

  let auth_: any;

  auth_ = userAuth();
  const { auth } = auth_;

  const nav = useNavigate();

  const [ownerMessage, setOwnerMessage] = useState<Messages[]>([]);

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

  useEffect(() => {
    if (auth.dataEmail) {
      const body = {
        user_id: auth.user_id,
      };
      fetch('http://127.0.0.1:5000/buyer_adoption_confirm_view/', {
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
            const bodyData = data.body.map((message: any) => ({
              owner_name: message.owner_name,
              owner_email: message.owner_email,
              owner_message: message.owner_message,
            }));
            setOwnerMessage(bodyData);
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

  const confirm = () => {};

  const cancel = () => {};

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
              <div
                key={buyer.adoption_id}
                className={
                  buyer.buyer_message
                    ? 'p-4 flex-col bg-white'
                    : 'p-4 flex-col bg-transparent'
                }
              >
                {buyer.buyer_message ? (
                  <div className='my-4'>
                    <div>
                      Request sent by <strong>{buyer.buyer_name}</strong>
                    </div>
                    <div>
                      <strong>Adoption ID:</strong> {buyer.adoption_id}
                    </div>
                    <div>
                      <strong>Message:</strong> {buyer.buyer_message}
                    </div>
                    <div>
                      <strong>Contact:</strong> {buyer.buyer_contact}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <button
                  className='text-center px-20 py-3 border round-md hover:bg-red-400 shadow-md border-gray-400 hover:border-red-400 hover:text-white'
                  onClick={() => {
                    setOpen(true);
                    setAdoptionId(buyer.adoption_id);
                  }}
                >
                  Accept / Reject
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='h-full bg-pink-300 p-4 m-[20px]'>
          <div className='text-center p-2 text-5xl'>
            Message Response from Owners
          </div>
          <div className='grid md:grid-cols-3 grid-cols-2 gap-4  lg:mx-auto py-4'>
            {ownerMessage.map((owner, index) => (
              <div
                key={index}
                className={
                  owner.owner_message
                    ? 'p-4 flex-col bg-white'
                    : 'p-4 flex-col bg-transparent'
                }
              >
                {owner.owner_message ? (
                  <div className='my-4'>
                    <div>
                      Message sent by <strong>{owner.owner_name}</strong>
                    </div>
                    <div>
                      <strong>Message:</strong> {owner.owner_message}
                    </div>
                    <div>
                      <strong>Email:</strong> {owner.owner_email}
                    </div>
                  </div>
                ) : (
                  <div className='bg-transparent'></div>
                )}
                <div className='grid grid-cols-2 gap-3'>
                  <button className='py-2 bg-red-300' onClick={cancel}>
                    Cancel
                  </button>
                  <button className='py-2 bg-green-300' onClick={confirm}>
                    Confirm
                  </button>
                </div>
              </div>
            ))}
          </div>
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
