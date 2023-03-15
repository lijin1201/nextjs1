import { useRouter } from "next/router";
export default function App2(){
    const {query} = useRouter();
    return (
      <div>
        <h1> test2  app2 : {query.name} </h1>
        <img src="/test1/BookVer01.drawio.png" ></img>
        <img src="화면 캡처-GameClock.png"></img>
      </div>
  );
}