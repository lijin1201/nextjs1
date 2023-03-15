import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";



async function DbWrite1(id = "id1",memo1 = ""){
    
    const clc1 = await DbConnect1();
    const data1 = {
        id: id,
        memo1: memo1,
        addr1:"address..1",
    };
    const result = await clc1.insertOne(data1);
}

async function DbConnect1(){
    const{MongoClient, ServerApiVersion}
    = require('mongodb');
    const uri = "mongodb://127.0.0.1:27017";
    //const uri = process.env.MongodbUriKie;
    const mgct = new MongoClient(uri);

    const db1 = mgct.db("UserDb1");
    const clc1 = db1.collection("Clc1");
    return clc1;
}

async function DbReadAll(limit = 10){
    const clc1 = await DbConnect1();
    const us = await clc1.find({}).limit(limit);
    return await us.toArray();

}

async function DbRead1(id = "id1"){
    const clc1 = await DbConnect1();
    const data1 = await clc1.findOne({id:id});
    return data1;
}

export default async(req: NextApiRequest, res: NextApiResponse) => {
    //await DbWrite1("user100", "user100 memo");
    //res.statusCode = StatusCodes.OK;
    //return res.send(await DbReadAll());
    //return res.send(await DbRead1("user100"));

    const{add,read} = req.query;
    console.log("usr get add: " + add + "read:" + read);

   // res.statusCode = StatusCodes.BAD_REQUEST;
    res.statusCode = StatusCodes.OK;

    if(read){return res.send(await DbRead1(String(read)));}
    else if(add){
        await DbWrite1(String(add), String(req.query.memo1));
        res.send(await DbReadAll());
    }else{
        let ar1 = await DbReadAll();
        // let sum1 = "usernum:" + String(ar1.length) + ","
        return res.send(JSON.stringify(ar1));

    }

    // if(read){return res.send("read code..." + read);}
    // else if(add){return res.send("add code..." + add);}
    // else{
    //     return res.send("list code...");
    // }
}