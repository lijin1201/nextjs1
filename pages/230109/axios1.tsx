import Axios from "axios";

export async function getServerSideProps(context: any) {
    let prop1 = "";
    console.log("getServerSideProps");
    try {
        // const url = "http://naver.com"; //or use the following url
        const url = "http://localhost:3000/api/221229-user";
        const axiosrst = await Axios.get(url);
        console.log("rst.data: "+axiosrst.data);
        prop1 = axiosrst.data.substr(0,1000);
    } catch (e) {
        console.log("Err: "+e);
    } 
    return {
        props: {prop1}
    }
}

export default function App1( {prop1 =""}) {
    return (
        <> result: {prop1}</>
    );
}

//see: http://localhost:3000/230109/axios1