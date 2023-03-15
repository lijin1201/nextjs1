import useSWR from 'swr'
import Axios from "axios";
import {useState} from "react";
import { useRouter } from "next/router";

const axios1 = (url: string) => Axios.get(url).then((res) => res.data)

const App3 = () => {
        // const {query:qr1} = useRouter();
        const { data, error, isLoading} = useSWR("http://localhost:3000/api/221229-user", axios1);
        const [ipt1, setIpt1] = useState("test1");

        if (error) {return <> error! </>;}
        if (!data) {return <>loading...</>;}

        return (
            <div>
            <h2> USER ADD {ipt1+" text"} </h2>
            <input value={ipt1} onChange= {(e)=>setIpt1(e.target.value)} />
            <button onClick={(e)=>{
                Axios.get("http://localhost:3000/api/221229-user?add="+ipt1);
                // alert("input: "+ipt1);

            }}>Btn1</button>
            

            <h2>USER LIST</h2>
            <ol>
                {data.map((e:{id:string, memo1:string}) =>
                    {return <><li><a href={"http://localhost:3000/api/221229-user?read="+e.id}> id: {e.id}</a></li><li>memo:{e.memo1}</li></>;}) 
                    }
            </ol>
            </div>
        );
}

const App2=()=> {
    return (
        <div>
            <a href="http://naver.com">
                MyHome
            </a>
        </div>
    );
}

export default App3;
