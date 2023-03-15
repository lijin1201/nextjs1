import { NextApiRequest, NextApiResponse } from "next";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
export default async (req: NextApiRequest, res: NextApiResponse) => {

    const {MongoClient, ServerApiVersion} = require('mongodb');
    const mgct = new MongoClient("mongodb://localhost:27017");

    const db1 = mgct.db("UserDb1");
    const clc1 = db1.collection("Clc1");

    console.log(clc1);
    const doc = {
        id:"user11",
        memo1:"usermemo1",
    };
    const result = await clc1.insertOne(doc);
    const data1 = await clc1.findOne({id:"user11"});

    res.statusCode = StatusCodes.OK;
    return res.send(data1);
    //we can return code too:
    //res.statusCode = StatusCodes.NOT_FOUND;
    //return res.send(getReasonPhrase(res.statusCode));

}