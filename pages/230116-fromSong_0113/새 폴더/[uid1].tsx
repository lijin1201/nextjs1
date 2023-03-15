import useSWR from 'swr';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
//http://localhost:3000/user/user100
//http://localhost:3000/user/user100?test1=kkk
// api/user.ts
//user/index.tsx
//user[uid1].tsx

const axios1 = (url: string) => Axios.get(url).then((res) => res.data);

const App1 = () => {
  const { query: qr1 } = useRouter();
  const { data, error } = useSWR(
    `http://localhost:3000/api/user?read=${qr1.uid1}`,
    axios1
  );

  if (error) {
    return <>error!</>;
  }
  if (error) {
    return <>loading...</>;
  }

  return (
    <div>
      <h2>예약자 : {qr1.uid1}</h2>
      <p>id : {data?.id}</p>
      <p>숙소 : {data?.숙소}</p>
      <p>예약일 : {data?.예약일}</p>
    </div>
  );
};

export default App1;
