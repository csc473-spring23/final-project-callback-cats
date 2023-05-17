import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Custom_hook/UserAuth';
import LoginNavbar from '../Components/LogoutNavBar';

type BuyerInfo = {
  buyer_name: string;
  buyer_email: string;
  buyer_contact: string;
  buyer_message: string;
};

function MessagePage() {
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

  return auth?.dataEmail ? (
    <>
      {' '}
      <LoginNavbar />
      <>
        {buyers.map((buyer, index) => (
          <div key={index}>
            <ul>
              <li>Name: {buyer.buyer_name}</li>
              <li>Email: {buyer.buyer_email}</li>
              <li>Contact: {buyer.buyer_contact}</li>
              <li>Message: {buyer.buyer_message}</li>
            </ul>
          </div>
        ))}
      </>
    </>
  ) : (
    <>
      {alert('You can not access this page without logging in')}
      {nav('/login')}
    </>
  );
}

export default MessagePage;
