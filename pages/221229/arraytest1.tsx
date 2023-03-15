export default function App1(){
 
    const ar3:string[] = [];
    {
        ar3.push("aaa");
        ar3.push("bbb");
    }
    console.log("len: "+ar3.length);
    console.log("len: "+ar3[0]);
    ar3.map((e)=>{console.log("arr map "+e);});

    let ca = new Ca();
    
    for(let v in ca) {console.log("[f] ca : "+v);}


   // Objects.values(ca).map((e)=>{console.log("[map] ca : "+e);});

    const {v2 , v3 ,} = ca;
    console.log("x1,x2 : "+v2+","+v3);
    return (<div> a </div>);
    
}

class Ca{
    v1 = 0;
    v2 = 'a';
    v3 = 'b3';
}
//for방식