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
                <h2>대구 자전거 공기주입기</h2>
                <form target="/api/BicycleDao" method="get"><input type="text" name="addr"></input>  
                <input type="submit" value = "주소검색"></input>
                </form>
                
                <form action="/bicycleAir/" method="get"><input type="text" name="addr"></input>  
                {/* <button value="주소검색" onClick="redirect()"></button> */}
                <input type="submit" value = "주소검색"></input>
                </form>

                <table>
                <tr> <td>연번</td> <td>설  치  위  치</td> <td>타입</td></tr>   
                {data.map((e:{연번:number, '설  치  위  치' :string, 타입:string}) =>
                    {return <tr>
                        <td> {e.연번}</td>
                        <td>{e[ '설  치  위  치' ]}</td>
                        <td> {e [ '타입']}</td>
                        </tr>
                    })
                }
                </table>
            </div>
        );
}

export default App3;
