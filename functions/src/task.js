import { FieldValue } from "firebase-admin/firestore";
import db from "./dbConnect.js";

const coll = db.collection("task");
 //Get All Tasks
export async function getTask(req, res) {
    const { uid } = req.params;
    // get all tasks by user:
    const tasks = await coll.where('uid', '==', uid).get();
    // arrange task in an array
    const taskArray = tasks.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(taskArray);
}

// Add TAsks
export async function addTask(req, res) {
    console.log('~~~ Adding Task ~~~~~');
    const { title, uid } = req.body;
    if (!title || !uid) {
        res.status(401).send({ success: false, message: 'Not a valid request' });
        return;
    }
    const newTask = {
        title, uid, done: false,
        createdAt: FieldValue.serverTimestamp(),
        
    }
    console.log('~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('Adding Task --> ', newTask);
    await coll.add(newTask)
    .catch(err => {
        res.status(500).send({ success: false, message: err });
        return;
    })
    console.log(' .... ADDED!');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~');
    getTask(req, res);
}

//Update Tasks
export async function updateTask(req, res) {
    const{ done, id } = req.body;

    if(!uid) {
        res.status(401).send ({success: false, message: "Not a valid request"});
    }

    const updates = {
        done,
        updatedAt: FieldValue.serverTimestamp()
    }

    await coll.doc(id).update(updates);
    
    getTask(req, res);

}