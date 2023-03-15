import Axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr'
import { useRouter } from 'next/router';
import TradeHd from './tradeHeader';

export default function App1() {
	const DataUrl = '/api/session1?data';
    const LogoutUrl = '/api/session1?logout';
    const SubmitUrl = '/api/tradeApi?add';
    const Read1Url = '/api/tradeApi?read1';
	const rt1 = useRouter();
    const [iptuid, setIptuid] = useState('');
    const [blockId, setBlockId] = useState('');
    const [blockData, setBlockData] = useState('');

	const { data, error, isLoading } = useSWR(DataUrl, 
        (url: string) => Axios.get(url).then((res) => {setIptuid(res.data?.userdata?.name); return res.data})
        );

    const { data:blocks } = useSWR(Read1Url, 
        (url: string) => Axios.post(url, { Userid:iptuid}).then( (res) => res.data ) );

	if (error) { return (<> error: {JSON.stringify(error)} </>); }
	if (!data) { return (<> loading data: {data} </>); }

    return (
        <div>
            <TradeHd userdata={data.userdata} />
            {data.logon?
            <div>
            <button onClick ={() => { Axios.post(LogoutUrl ).then(() => {rt1.reload();}) }}> Logout</button>
            <h3>Block ID:
            <input value = {blockId} onChange={(e) => setBlockId(e.target.value)} /> </h3>
            <h3>Block Data:
            <input value = {blockData} onChange={(e) => setBlockData(e.target.value)} /> </h3>
            <br/>
            <button onClick ={() => { Axios.post(SubmitUrl, { Userid:data?.userdata?.name, BlockId: blockId, BlockData: blockData} ).then(() => {rt1.reload();}) }}> Submit</button>
            <br/>
            <ol>
                {
                blocks?.map((e:{UserId:string, BlockId:number, BlockData:number})=>
                    {return <><li> UserId: {e.UserId} ; BlockId: {e.BlockId} ; BlockData: {e.BlockData} </li></>})
                    //{return <><li>id:{e.id}</li></>})
                }
            </ol>
            </div>:
            <p>인증필요:
                
            </p>
            }           
        </div>
    )
}