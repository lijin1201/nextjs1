import useSWR from 'swr'
import Axios from "axios";
import { useRouter } from "next/router";

const axios1 = (url: string) => Axios.get(url).then((res) => res.data)

const App3 = () => {
        const {query:qr1} = useRouter();
        const { data, error, isLoading} = useSWR("http://localhost:3000/api/BicycleDao", axios1);

        if (error) {return <> error! </>;}
        if (!data) {return <>loading...</>;}
        
        // data.map( (e1: Map<string,any>)  =>
        //     {for (let key of e1.keys()) {
        //         console.log(key);
        //       }
        //     }
        // )

        return (
            <div>
            <ul>
                <h2>자전거 공기주입기</h2>
                {data.map((e:{연번:number, '설  치  위  치' :string, 타입:string}) =>
                    {return <><li>id: {e.연번}</li>
                    <li>place:{e [ '설  치  위  치' ]}</li>
                    <li>type: {e [ '타입']}</li>
                    <li>{JSON.stringify(e)}</li></>;}) 
                }
            </ul> 
                {/* { 
                    for (let [i,obj] of Object.entries(data) ) {
                        Object.entries(obj).map(([key,value]) => {console.log("${value}"); } )
                    }
                } */}
                
                 {/* {data.map( (e1) =>
                    {for (let [key, value] of e1) {
                        console.log("${key}: ${value}");
                      }
                     return <>
                    <li>{JSON.stringify(e1)}</li></>;}) 
                    }  */}
            
            </div>
        );
}

export default App3;
