const Fun1 = () => {
    // return "its function AAA!!!"
    let v1 =1;
    if (10==="10"){
        return "its function AAA22!!!" 
    } else {
        return "its function BBB!!!"
    }
}

const App1 = () => {
    return (
        <div>
            <h1> test </h1>
            <Fun1 />
            <Fun2 />
            <h2> {typeof 10}</h2>
            <h2> {typeof "10"}</h2>
        </div>
    );
};

function Fun2(){
    return (
        <h1>Welcome~!</h1>
    );
}

export default App1;