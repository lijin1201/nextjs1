//export {}
function chap1(){
    const ar1:string = [];
    const ar2:number = [];

    const ar4 = [];

    ar1.push("sssss");
    ar1.push("ddd");
    console.log(ar1);
    console.log(ar2);
    //배열에 class 목록적용.

    const c1:Book =[];
    c1.push(new Book());
    c1.push(["t","a",4] as Book);
    console.log(c1);
    console.log(new Book("aa","bb"));

    const d1 = document.getElementById("d1");
    return (
        <div id="d1">
          <h1> {c1[0].title } </h1>
        
          
          <h3> <a href="221222/kim1"> kim1 </a></h3>
        
        </div>
    );
}

class Book{
    title = "Title";
    author = "Author";
    num = 3;
}

function chap2(){
    let ar1 = [1,2,3,4,5];
    ar1.map((v1) => {console.log("map: "+v1); })
};

class Ca {v1=0; v2='a';}
const ar3:Ca[] = [];
const arr=[];
function chap3(){
    let ca1 = new Ca();
    ca1.v1 = 111;
    let ca2 = new Ca();
    ca2.v1=2222;
    ar3.push(ca1); ar3.push(ca2);

    return( <div> <h1>h1</h1><p>{ar3[0].v1}</p><p> {ar3[1].v1}</p></div>);
};

export default chap3;

//https://mongodb.com/try/download/enterprise
//pages/u/index.tsx

//1.[Web] NodeJS, React, Html, Css, Js
//2.[DB] MongoDB
//3.[Blockchain]
