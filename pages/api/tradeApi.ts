import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";


async function DbConnect1(){
    const { MongoClient, ServerApiVersion} = require('mongodb');
    const uri = "mongodb://localhost:27017";
    const mgct = new MongoClient(uri);

    const db1 = mgct.db("CsharpDb1");
    const clc1 = db1.collection("BlockTrade");
    return clc1;
}

async function DbWrite1(name:string,id:number,data:number){
    const clc1 = await DbConnect1();
    const data1 = {
        UserId:name,
        BlockId:id,
        BlockData:data
    }
    const result = await clc1.insertOne(data1);
}

async function DbRead1(name="id1") {
    const clc1 = await DbConnect1();
    const data1 = await clc1.find({UserId:name});
    return data1.toArray();
}


async function DbReadAll(limit=50) {
    const clc1 = await DbConnect1();
    const us = await clc1.find({}).limit(limit);
    return await us.toArray();
}



export default function Dispatch1( req: NextApiRequest, res:NextApiResponse) {
  if(req.query.add != undefined) { return add(req,res);}
  if(req.query.read1 != undefined) { return read1(req,res); }
  //if(req.query.readall != undefined) { return readall(req,res); }

  return res.status(StatusCodes.BAD_REQUEST).end();
}

async function add(req: NextApiRequest, res: NextApiResponse) {

    await DbWrite1(req.body.Userid , Number(req.body.BlockId), Number(req.body.BlockData) );
}

async function read1(req: NextApiRequest, res: NextApiResponse) {

    let ar1 = await DbRead1(req.body.Userid );
    return  res.send(JSON.stringify(ar1));
}

async function readall(req: NextApiRequest, res: NextApiResponse) {

    let ar1 = await DbReadAll();
    return  res.send(JSON.stringify(ar1));
}