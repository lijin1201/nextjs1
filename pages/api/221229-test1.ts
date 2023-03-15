import { NextApiRequest, NextApiResponse } from "next";
import { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } from 'http-status-codes';
export default (req: NextApiRequest, res: NextApiResponse) => {
    let data1 = "u/api page";
    res.statusCode = StatusCodes.OK;
    return res.send(data1);

}