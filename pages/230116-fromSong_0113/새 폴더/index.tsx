/* eslint-disable @next/next/no-html-link-for-pages */
import useSWR from 'swr'
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from 'react';

const axios1 = (url: string) => Axios.get(url).then((res) => res.data);

const App3 = () =>{
  const{data, error, isLoading} = useSWR("http://localhost:3000/api/user", axios1);
  const[ipt1, setipt1] = useState("");
  const[ipt2, setipt2] = useState("");
  const[ipt3, setipt3] = useState("");
  const[ipt4, setipt4] = useState("");
  if(error){return <>error!</>;}
  if(!data){return <>loading</>;}
  
  return (
    <>
    <nav id="navbar">
      <div className="navbar__logo">
        <a href="home">DongGyu여행</a>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__menu__item">
          <a href="/research/research">검색</a>
        </li>
        <li className="navbar__menu__item">
          <a href="user">명단</a>
        </li>
        <li className="navbar__menu__item">
          <a href="user/홍길동">홍길동</a>
        </li>
      </ul>
    </nav>
    <div>
      <h2>예약 명단 및 추가 <br/></h2>
      <hr/>
      <h2>예약자 추가</h2>
      
      이름 : <input value={ipt1} onChange={(e)=> setipt1(e.target.value)}/><br/>

      숙소 : <input value={ipt2} onChange={(e)=> setipt2(e.target.value)}/><br/>

      예약일 : <input type="date" value={ipt3} onChange={(e)=> setipt3(e.target.value)}/><br/>
      <br/>
      <button style={{color:"white", backgroundColor:"red", width:"28%"}} onClick={(e)=>{
        Axios.get("http://localhost:3000/api/user?add="+ipt1+"&memo1="+ipt2+"&rsv1="+ipt3);
        alert("input " +ipt1);
      }}>숙박예약</button><br/><br/>

      검색 : <input value={ipt4} onChange={(e)=> setipt4(e.target.value)}/>

      <button  className='buttons' onClick={(e)=>{
        Axios.get("http://localhost:3000/user/"+ipt4);
        alert("검색 " +ipt4);
      }}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

      <h2> 예약자 명단</h2>
    <br/>

    <ol>
      {data.map((e:{id:string, 숙소:string, 예약일:String}) =>
          {return <><li><a href={'/user/'+e.id+'?test1='+e.예약일}>id:{e.id}</a> <br/>숙소 : {e.숙소}</li> <br/></>})
      }
    </ol>   
        
    </div>
    </>
  );
};


const App2 =() =>{
  return(
    <div>
      <a href="http://naver.com">MyHome</a>
    </div>

  );
}


export default App3;
