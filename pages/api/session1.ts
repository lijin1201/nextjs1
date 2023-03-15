import {withIronSessionApiRoute} from 'iron-session/next'
import type {IronSessionOptions} from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next';
import {StatusCodes} from "http-status-codes";

export const sessionOptions1:IronSessionOptions = {
  password: 'testpassword1111111111111##S#...',
  cookieName: 'myservice ironsession testxxx',
}

export class UserData {
  name:string;
  constructor (name:string) { this.name = name;}
}

declare module 'iron-session'{
  interface IronSessionData { userdata?:UserData}
}

export default withIronSessionApiRoute(Dispatch1, sessionOptions1);

function Dispatch1( req: NextApiRequest, res:NextApiResponse) {
  if(req.query.data != undefined) { return Data(req,res);}
  if(req.query.login != undefined) {return Login(req,res); }
  if(req.query.logout != undefined) {return Logout(req,res); }

  return res.status(StatusCodes.BAD_REQUEST).end();
}

async function Login(req: NextApiRequest, res: NextApiResponse) {
  if(req.session.userdata) {req.session.destroy(); }
  let ud = new UserData(req.body.Userid);
  req.session.userdata = ud;
  await req.session.save();
  return res.json({logon:true, userdata:ud});
}

async function Logout(req: NextApiRequest, res:NextApiResponse) {
  req.session.destroy();
  res.json({logon: false, userdata:{} } );
}

async function Data(req:NextApiRequest, res: NextApiResponse) {
  if (!req.session.userdata) { return res.json({logon: false, userdata: {}}); }
  return res.json({logon:true, userdata: req.session.userdata});
}
