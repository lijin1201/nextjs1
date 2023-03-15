import { useRouter } from "next/router";


import {User} from '../index';
import {userData} from '../index';
// let userData = new Map<string, User>();

// userData.set("kim1",new User("김","010-1233-1231","asdf@asdf.com"));
// userData.set("hong1",new User("홍","010-2233-1231","hong@asdf.com"));

// exports.userData = userData;


// var module = require('./221222/[name]')
// var userData = module.userData;

export default function App2(){
    const {query} = useRouter();
    
    return (
      <div>
        <h1> id: {query.name} </h1>
        <h1> name: {GetUserData(query.name)} </h1>
        <h1> desc ... </h1>
      </div>
  );
}






// const GetUserData = (userid="") => {
 function GetUserData (userid="") {

    // User user = userData.get(userid);
    return ( <div>
        <h2> {userid} </h2>
        <h2> {userData.get(userid)?.name} </h2>
        <h2> {userData.get(userid)?.phone} </h2>
        <h2> {userData.get(userid)?.email} </h2>
     </div>);
}