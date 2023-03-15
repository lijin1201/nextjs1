import useSWR from 'swr'
import Axios from "axios";
import { useRouter } from 'next/router';

//http://localhost:3000/user/user100
//http://localhost:3000/user/user100?test1=kkk
// (change user to 230111)

const axios1 = (url:string) => Axios.get(url).then((res) => res.data)

const App1 = () => {
    const { query:qr1} = useRouter();
    const { data, error} = useSWR("http://localhost:3000/api/BicycleDao?addr=" + qr1.searchAddr, axios1);

    if (error) {return <> error!</>;}
    if (!data) { return <> loading...</>;}

    return (
        <div>
            <h2>대구 자전거 공기주입기</h2>

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

export default App1;