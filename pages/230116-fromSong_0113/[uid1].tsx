import useSWR from 'swr'
import Axios from "axios";
import { useRouter } from 'next/router';

const axios1 = (url: string) => Axios.get(url).then((res) => res.data)

const App1 = () => {
    const {query: qr1} = useRouter();
    const {data, error} = useSWR("http://localhost:3000/api/user?read=" + qr1.uid1,axios1);

    if(error){return <>error!</>;}
    if(error){return <>loading...</>;}

    return(
        <div>
            llll
            <h2>uidmmm1:{qr1.uid1}</h2>
            <p>id:{data?.id}</p>
            <p>memo:{data?.memo1}</p>
            <p>test1:{qr1.test1}</p>
        </div>
    );
};

export default App1;