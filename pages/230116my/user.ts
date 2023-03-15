import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

class Ud1{
  id:string;
  숙소:string;
  constructor(id: string, 숙소:string){
    this.id = id;
    this.숙소 = 숙소;
  }
}

async function DbWrite(id="id1", memo1="memo1", reservation="rsv1"){
  const clc1 = await DbConnect1();
  const data1 = {
    id:id,
    숙소: memo1,
    예약일:reservation,
  };
  const result = await clc1.insertOne(data1);
}

async function DbRead1(id="id1"){
  const clc1 = await DbConnect1();
  const data1 = await clc1.findOne({id:id});
  return data1;
}

async function DbConnect1(){
  const{MongoClient, ServerApiVersion} = require('mongodb');
  const uri = "mongodb://127.0.0.1:27017";
  const mgct = new MongoClient(uri);

  const db1 = mgct.db("UserDb1");
  const clc1 = db1.collection("Clc1");
  return clc1;
}

async function DbReadAll(limit = 20){
  const clc1 = await DbConnect1();
  const us = await clc1.find({}).limit(limit);
  return await us.toArray();
}

export default async (req: NextApiRequest, res: NextApiResponse)=>{
  const{add, read} =req.query;
  
  console.log("usr get add: "+add+" read: "+read);
  
  res.statusCode = StatusCodes.OK;

  if(read){
    return res.send(await DbRead1(String(read)));}
  else if(add){
    await DbWrite(String(add),String(req.query.memo1),String(req.query.rsv1));
    res.send(await DbReadAll());
  }else{
    let ar1 = await DbReadAll();
    return res.send(JSON.stringify(ar1));
  }
  //res.statusCode = StatusCodes.OK;
  //return res.send(await DbReadAll());
  // return res.send(await DbRead1("user100"));
}


  // await DbWrite("user100","user100 memo");
