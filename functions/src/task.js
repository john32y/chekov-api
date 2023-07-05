import { FieldValue } from "firebase-admin/firestore";
import db from "./dbConnect.js";

const coll = db.collection("task");

export async function getTask(req, res) {
    const { uid } = req.params;
    // get all tasks by user:
    const tasks = coll.where('uid', '==', uid).get();
    // arrange task in an array
    const taskArray = docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(taskArray);
}

export async function addTask(req, res) {
    const { title, uid } = req.body;
    if(!title || !uid) {
        res.status(401).send({ success: false, message: 'Not a valid request' });
        return;
    }
    const newTask= {
        title, uid, done: false,
        createdAt: FieldValue.serverTimestamp(),

    }
 await coll.add(newTask);
 getTask(req, res);
}