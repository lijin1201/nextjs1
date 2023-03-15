
class Ca{
    mName = "Ca~";
    mPrice = 22;
}

function GetCa(id: number){
    let ca= new Ca();
    switch (id) {
        case 1:
            ca.mPrice = 100;
            break;
        default:
            ca.mPrice = -999;
            break;
    }
    return ca;
}

const App1 = () => {
    let ca = GetCa(1);
    return <h1> ca name: {ca.mName} price : {ca.mPrice} </h1>
}

export default App1;