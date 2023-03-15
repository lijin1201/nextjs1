import { useRouter } from "next/router";
export default function App2(){
    const {query} = useRouter();
    return (
      <div>
        <h1>  {query.name} : detail</h1>
        <h1> desc ... </h1>
        <img src="/화면 캡처-GameClock.png"></img>
      </div>
  );
}