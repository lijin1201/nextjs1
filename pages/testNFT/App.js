import { useEffect, useState } from 'react';
import Web3 from 'web3';
//import { CONTACT_ABI, CONTACT_ADDRESS } from './config';
import  CONTACT  from '../../shared/abis/Contacts.json'

function App() {
	const [account, setAccount] = useState();
//	const [contactList, setContactList] = useState();
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		async function load() {
			const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
			const accounts = await web3.eth.requestAccounts();
			setAccount(accounts[0]);

			const networkId = await web3.eth.net.getId()
			//const networkId= 5777
    		const networkData = CONTACT.networks[networkId]

			console.log("networkId: ",networkId);
			console.log("contact address: ",networkData.address);

			const contactList1 = new web3.eth.Contract(CONTACT.abi, networkData.address);
			//console.log("contact address: "+CONTACT_ADDRESS);
			//const contactList1 = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);

	//	    setContactList(contactList1);

			const counter = await contactList1.methods.count().call();
			console.log("counter: "+counter);
			setContacts([]);
			for (var i = 1; i <= counter; i++) {
			const contact = await contactList1.methods.contacts(i).call();
			setContacts((contacts) => [...contacts, contact]);
			}
		}

		load();
	}, []);

  return (
    <div>
    	Your account is: {account}
    	<h1>Contacts</h1>
		<h1>length: {contacts.length}</h1>
    	<ul>
    	{
    		Object.keys(contacts).map((contact, index) => (
					<li key={`${contacts[index].name}-${index}`}>
						<h4>{contacts[index].name}</h4>
						<span><b>Phone: </b>{contacts[index].phone}</span>
					</li>
				))
    	}
    	</ul>
    </div>
  );
}

export default App;
