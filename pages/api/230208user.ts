import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";


async function DbConnect1(){
    const { MongoClient, ServerApiVersion} = require('mongodb');
    const uri = "mongodb://localhost:27017";
    const mgct = new MongoClient(uri);

    const db1 = mgct.db("CsharpDb1");
    const clc1 = db1.collection("POS230208");
    return clc1;
}

async function DbWrite1(name:string,posx:number,posy:number){
    const clc1 = await DbConnect1();
    const data1 = {
        Name:name,
        PosX:posx,
        PosY:posy
    }
    const result = await clc1.insertOne(data1);
}

async function DbRead1(name="id1") {
    const clc1 = await DbConnect1();
    const data1 = await clc1.findOne({Name:name});
    return data1;
}

async function DbReadAll(limit=50) {
    const clc1 = await DbConnect1();
    const us = await clc1.find({}).limit(limit);
    return await us.toArray();
}

export /*default*/ async function def1(req: NextApiRequest, res: NextApiResponse)  {
    //await DbWrite1("user100","user100 memo");
    res.statusCode = StatusCodes.OK;
    //return res.send(await DbReadAll());
    return res.send(await DbRead1("user100"));
}

// using:  http://localhost:3000/api/user?read=123

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {add,read} = req.query;
    console.log("usr get add: "+ add + " read:" + read);
    res.statusCode = StatusCodes.OK;

    if (read) //{ return res.send("read code..."+read);}
    {return res.send(await DbRead1(String(read)));}
    else if (add) {
    //    return res.send("add code..." + add);
        await DbWrite1(String(add), Number(req.query.posx), Number(req.query.posy) );
    }
    else {
        //return res.send("list code...");
        let ar1 = await DbReadAll();
        let sum1 = "usernum:" + String(ar1.length)+ ",";
        // return res.send(sum1+JSON.stringify(ar1));
        //23-01-10: not using usernum
        return res.send(JSON.stringify(ar1));
    }
}