import React, { useEffect } from 'react';

function Adoptpage() {

  useEffect(() => {
    fetch('http://127.0.0.1:5000/all_cats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.code === 400) {
          alert('Not cat found');
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log('error');
      });

  },[])

  return <div>

  </div>;
}

export default Adoptpage;
