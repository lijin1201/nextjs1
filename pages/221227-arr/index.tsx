
//note: run: npm install mongodb
export async function getServerSideProps (context: any) {
    const {MongoClient, ServerApiVersion} = require('mongodb');
    const client = new MongoClient("mongodb://localhost:27017");
    const database = client.db("testdb1");
    const userclc = database.collection("test1");

    const insertdata = {
        id: "userid1",
        memo1: "user memo2",
    };

    const finds = await userclc.count({id:insertdata.id});
    //const res = await userclc.insertOne(insertdata);
    //let res = await userclc.findOne();
    //let res = await userclc.findOne( {id:"userid0"});

    //or use: if (res) {console.log("exist r: "+JSON.stringify(res));}
    // else {...}
    console.log(finds);
    if  (finds>0) {
        console.log("Already exists this id.")
    } else {
        const res = await userclc.insertOne(insertdata);
        console.log(res);
        console.log("inserted r: " +JSON.stringify(res));
    }

    // console.log("id =" + res["id"]);
    // console.log(JSON.stringify(res));

    return {props: {"test":"test"}}
}

export default function App1(){
    return (<div>
            mongodb test
            </div>
    );
}