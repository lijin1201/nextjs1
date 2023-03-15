import useSWR from 'swr'
import Axios from "axios";
import {useState} from "react";
import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";


const axios1 = (url: string) => Axios.get(url).then((res) => res.data)

const App3 = (req: NextApiRequest, res: NextApiResponse) => {
        
        const {query:qr1} = useRouter();
        const { data, error, isLoading} = useSWR("http://localhost:3000/api/BicycleDao", axios1);
        const [ipt1, setIpt1] = useState("test1");
        const [fav, setFav] = useState("test2");
        
        
        if (error) {return <> error! </>;}
        if (!data) {return <>loading...</>;}
        

        return (
            <div>
                <h2>대구 자전거 공기주입기</h2>
                <input value={ipt1} onChange= {(e)=>setIpt1(e.target.value)} />
                <button onClick={(e)=>{
                // Axios.get("http://localhost:3000/api/BicyCleDao?addr="+ipt1);
                // Axios.post("http://localhost:3000/api/BicyCleDao");
                // redirect('/api/BicyCleDao');
                //const { data, error, isLoading} = useSWR("http://localhost:3000/api/BicyCleDao?addr="+ipt1, axio1);
                // alert("input: "+ipt1);
                    let slink = document.getElementById('slink');
                    slink?.setAttribute("href", "/bicycleAir/"+ipt1);
                }}>입력</button> <a id="slink">검새1</a> <br></br>
                <table>
                <tr>
                    <td><a href="/bicycleAir/북구">북구</a> </td>
                    <td><a href="/bicycleAir/동구">동구</a> </td>
                    <td><a href="/bicycleAir/수성구"> 수성구</a></td>
                 </tr>
                 </table>
              

                <table class="bicycle">
                <tr> <td>연번</td> <td>찜</td> <td>설  치  위  치</td> <td>타입</td> <td>관리기관</td> <td> 전화번호</td></tr>   
                {data.map((e:{연번:number, '설  치  위  치' :string, 타입:string, 관리기관: string, 전화번호:string}) =>
                    {   const id =  e['연번'];
                        return <tr>
                        <td> {e.연번}</td>
                        <td> <button onClick={(e)=>{ Axios.get("http://localhost:3000/api/BicycleDao?favorite="+id);}}> {e.favorite?"Y":"N"} </button></td>
                        <td> {e[ '설  치  위  치' ]}</td>
                        <td> {e [ '타입']}</td>
                        <td> {e.관리기관}</td>
                        <td> {e [ '전화번호']}</td>
                        </tr>
                    })
                }
                </table>
            </div>
        );
}

export default App3;
