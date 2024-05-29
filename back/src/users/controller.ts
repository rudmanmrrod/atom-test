import { Request, Response } from 'express';
import { collection, addDoc } from 'firebase/firestore/lite';
import { checkUsers } from './helper'
import { User } from './model';
import { db } from '../firebase';

/**
  List user controller
  
  @param req: Request - Node Express request
  @param email: string - Included on req object
  @param res: Reponse - Node Express response
  @return <User[]>
 */
export const Index = async(req: Request, res: Response) => {
  const email: string = req.params.email;
  const users = await checkUsers(email);
  res.json(users);
}

/**
  Create user controller
  
  @param req: Request - Node Express request
  @param email: string - Included on req object
  @param res: Reponse - Node Express response
  @return <Object<id>>
 */
export const Create = async(req: Request, res: Response) => {
  const body: User = req.body;
  const users = await checkUsers(body.email);
  if ( users.length > 0) {
    res.status(400).send("Email already exists");
  } else {
    const userCollection = collection(db, 'users');
    const userCreateBody = await addDoc(userCollection, body);
    res.json({id: userCreateBody.id});
  }
}