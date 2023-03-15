export function App1(){
  return (
    <div>
      <h1> hello world 1 </h1>
    </div>
);
}

export function App2(){
  const posts = [];
  for (let i=0; i<4; i++) {
    posts.push(<h3> <a href={`items/item${i}`}> item{i}</a></h3>);
  }
  return (
    <div>
      <h1> hello world 2 </h1>
      <h2> Menu </h2>
      <h3> <a href="items/item1"> item1</a></h3>
      <h3> <a href="items/item2"> item2</a></h3>
      <h1> Using loop:</h1>
      {posts}
      <img src="test1/BookVer01.drawio.png" ></img>
      <img src="화면 캡처-GameClock.png"></img>
    </div>
);

}

export class User{
  name = "";
  phone = "010";
  email = "asdf@asdf.com";

  constructor(name:string, phone:string, email:string){
    this.name = name;
    this.phone = phone;
    this.email = email;

  }
}

let userData = new Map<string, User>();

userData.set("kim1",new User("김","010-1233-1231","kim@asdf.com"));
userData.set("hong1",new User("홍","010-2233-1231","hong@asdf.com"));

// module.exports=userData;
// var module = require('./221222/[name]')
export {userData };

export default function userList(){
 // let userData=module.userData;
  const posts = [];
  for (let key of userData.keys()  ) {
    posts.push(<h3> <a href={`221222/${key}`}> {key}</a></h3>);
  }
  return (
    <div>
      {/* <h1> USER LIST </h1>
      <h3> <a href="221222/kim1"> kim1 </a></h3>
      <h3> <a href="221222/hong1"> hong1 </a></h3> */}
      
      {posts}
    </div>
);
}
