import useSWR from 'swr';
import Axios from "axios";
import {useRouter} from "next/router";
import { useState } from 'react';

const axios1 = (url: string) => Axios.get(url).then((res) => res.data);
const AppPOS = () => {
    // const{ query:qr1 } = useRouter();
    const { data, error, isLoading } = useSWR("http://localhost:3000/api/230208user", axios1);
    const [ ipt1, setipt1 ] = useState("");
    const [ ipt2, setipt2 ] = useState("");
    const [ ipt3, setipt3 ] = useState("");

    if(error){return <>error!</>;}
    if(!data){return <>loading...</>;}

    return(
        <div>
                <h2>이름: {ipt1+" S2 "} 과 위치x,y: </h2>
                이름 : <input value={ipt1} onChange={(e)=>setipt1(e.target.value)}/>
                위치x: <input value={ipt2} onChange={(e)=>setipt2(e.target.value)}/>
                위치y: <input value={ipt3} onChange={(e)=>setipt3(e.target.value)}/>
                <button onClick={(e)=>{
                    Axios.get("http://localhost:3000/api/230208user?add="+ipt1+"&posx="+ipt2+"&posy="+ipt3);
                    alert("input: "+ipt1+" "+ipt2+" "+ipt3);
                }}>등록</button>

                <h2>Friends</h2>
                <ol>
                    {data.map((e:{Name:string, PosX:number, PosY:number, nFound:number})=>
                        {return <><li>Name: {e.Name} PosX: {e.PosX} PosY: {e.PosY} nFound: {e.nFound} </li></>})
                        //{return <><li>id:{e.id}</li></>})
                    }
                </ol>
        </div>
    );
};

const ReadPOS = () => {

}

export default AppPOS;