import { Request, Response } from 'express';
import { 
  collection, getDocs, 
  addDoc, query, 
  where, Timestamp,
  updateDoc, getDoc,
  doc, deleteDoc
} from 'firebase/firestore/lite';
import { Task, TaskPayload } from './model';
import { db } from '../firebase';

/**
 * List of tasks per user controller

 * @param req: Request - Node Express request
 * @param email: string - Included on req query object
 * @param res: Reponse - Node Express response
 * @return <Task[]>
 */
export const Index = async(req: Request, res: Response) => {
  const { query: queryParams } = req;
  const email = queryParams.email;
  if (!email) {
    res.json([])
  } else {
    const taskCollection = collection(db, 'tasks');
    const q = query(taskCollection, where("email", "==", email));
    const taskSnapshot = await getDocs(q);
    const tasks = taskSnapshot.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id,
        date: new Timestamp(doc.data().date.seconds, doc.data().date.nanoseconds).toDate().toUTCString()
      }
    }) as Task[];
    res.json(tasks);
  }
};

/**
 * Create task controller
  
 * @param req: Request - Node Express request
 * @param req.body: TaskPayload
 * @param res: Reponse - Node Express response
 * @return <Object<id>>
 */
export const Create = async(req: Request, res: Response) => {
  const body: TaskPayload = req.body;
  const taskCollection = collection(db, 'tasks');
  const taksCreateBody = await addDoc(taskCollection, {...body, date: Timestamp.now()});
  res.json({id: taksCreateBody.id});
};

/**
 * Update task controller
 * @param req: Request - Node Express request
 * @param id: string - Included on req query object
 * @param req.body: TaskPayload
 * @param res : Reponse - Node Express response
 * @return <Object<id>>
 */
export const Update = async(req: Request, res: Response) => {
  const id: string = req.params.id;
  const body: TaskPayload = req.body;
  const taskRef = doc(db, 'tasks', id);
  const taskSnap = await getDoc(taskRef);
  if (taskSnap.exists()) {
    const taksCreateBody = await updateDoc(taskRef, {...body, date: taskSnap.data().date});
    res.json({success: true});
  } else {
    res.status(400).send("Task doesn't exists");
  }
};

/**
 * Delete task controller
 * @param req: Request - Node Express request
 * @param id: string - Included on req query object
 * @param res : Reponse - Node Express response
 * @return <Object<id>>
 */
export const Delete = async(req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const taskRef = doc(db, 'tasks', id);
    const deleteSnap = deleteDoc(taskRef);
    res.json({success: true});
  } catch (error) {
    res.status(400).send("Task doesn't exists");
  }
}