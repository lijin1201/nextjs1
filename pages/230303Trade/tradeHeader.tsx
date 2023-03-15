import Axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr'
import { UserData, sessionOptions1 } from '../api/session1'
import { useRouter } from 'next/router';

const axios1 = (url: string) => Axios.get(url).then((res) => res.data)
export default function TradeHd(props: { userdata: UserData }) {
	const LoginUrl = '/api/session1?login';
	
	const rt1 = useRouter();
	const [iptuid, setIptuid] = useState('');

    const DataUrl = '/api/session1?data';
	const { data, error, isLoading } = useSWR(DataUrl, axios1);

	return (
		<div>
		  <h2>블록체인 거래소</h2>
          {data.logon?<h2>MyInfo userid:{props.userdata?.name}</h2>:<div>
		  <input value = {iptuid} onChange={(e) => setIptuid(e.target.value)} />
		  <button onClick ={() => { Axios.post(LoginUrl, { Userid: iptuid }).then(() => {rt1.reload();}) }}> Login </button>
          </div>
          }

		</div>
	); 
}
