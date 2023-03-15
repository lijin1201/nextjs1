import useSWR from 'swr'
import Axios from "axios";
import { useRouter } from "next/router";

const axios1 = (url: string) => Axios.get(url).then((res) => res.data)

const App3 = () => {
        const {query:qr1} = useRouter();
        const { data, error, isLoading} = useSWR("http://localhost:3000/api/221229-user", axios1);

        if (error) {return <> error! </>;}
        if (!data) {return <>loading...</>;}

        return (
            <ul>
                <h2>USER LIST</h2>
                {data.map((e:{id:string, memo1:string}) =>
                    {return <><li>id: {e.id}</li><li>memo:{e.memo1}</li></>;}) 
                    }
            </ul>
        );
}

export default App3;
