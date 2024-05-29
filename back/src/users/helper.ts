import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

export const checkUsers = async(email:string) => {
  const userCollection = collection(db, 'users');
  const q = query(userCollection, where("email", "==", email));
  const userSnapshot = await getDocs(q);
  const users = userSnapshot.docs.map(doc => doc.data());
  return users;
}