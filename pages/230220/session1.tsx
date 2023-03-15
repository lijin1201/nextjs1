import Axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr'
import { useRouter } from 'next/router';
import Session1Hd from './session1hd';

const axios1 = (url: string) => Axios.get(url).then((res) => res.data)

export default function App1() {
	const DataUrl = '/api/session1?data';
	const rt1 = useRouter();
	const [iptuid, setIputuid] = useState('');

	const { data, error, isLoading } = useSWR(DataUrl, axios1);

	if (error) { return (<> error: {JSON.stringify(error)} </>); }
	if (!data) { return (<> loading data: {data} </>); }

		return (
			<div>
				<Session1Hd userdata={data.userdata} />
				{data.logon?<p>인증완료</p>:<p>인증필요</p>}
				<p> logon id {data?.userdata?.name} </p>
			</div>
		)
	}