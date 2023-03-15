import useSWR from 'swr';
import Axios from "axios";
import {useRouter} from "next/router";
import { useState } from 'react';

const axios1 = (url: string) => Axios.get(url).then((res) => res.data);
const App3 = () => {
    // const{ query:qr1 } = useRouter();
    const { data, error, isLoading } = useSWR("http://localhost:3000/api/221229-user", axios1);
    const [ ipt1, setipt1 ] = useState("");

    if(error){return <>error!</>;}
    if(!data){return <>loading...</>;}

    return(
        <div>
                <h2>My Talk{ipt1+" S2 "}</h2>
                <input value={ipt1} onChange={(e)=>setipt1(e.target.value)}/>
                <button onClick={(e)=>{
                    Axios.get("http://localhost:3000/api/221229-user?add="+ipt1);
                    alert("input: "+ipt1);
                }}>Login</button>

                <h2>Friends</h2>
                <ol>
                    {data.map((e:{id:string, memo1:string})=>
                        {return <><li><a href={"user/"+e.id}>id:{e.id}</a></li><li>memo:{e.memo1}</li></>})
                        //{return <><li>id:{e.id}</li></>})
                    }
                </ol>
        </div>
    );
};

export default App3;