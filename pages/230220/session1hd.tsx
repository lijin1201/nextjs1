import Axios from 'axios';
import { useState } from 'react';

import { UserData, sessionOptions1 } from '../api/session1'
import { useRouter } from 'next/router';

export default function Session1Hd(props: { userdata: UserData }) {
	const LoginUrl = '/api/session1?login';
	const LogoutUrl = '/api/session1?logout';

	const rt1 = useRouter();
	const [iptuid, setIptuid] = useState('');

	return (
		<div>
		  SessionHeader userid:{props.userdata?.name}
		  <input value = {iptuid} onChange={(e) => setIptuid(e.target.value)} />
		  <button onClick ={() => { Axios.post(LoginUrl, { Userid: iptuid }).then(() => {rt1.reload();}) }}> Login </button>
		  <button onClick ={() => { Axios.post(LogoutUrl, { Userid:iptuid} ).then(() => {rt1.reload();}) }}> Logout</button>
		</div>
	);
}
