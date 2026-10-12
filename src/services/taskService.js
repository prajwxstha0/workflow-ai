import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const tasksRef = collection(db, "tasks");

export async function createTask(userId, taskData) {
  await addDoc(tasksRef, {
    ...taskData,
    userId,
    done: false,
    creaedAt: serverTimestamp(),
  });
}

export function subscribetoTasks(userId, onData, onError) {
  const q = query(tasksRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      tasks.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() ?? 0;
        const timeB = b.createdAt?.toMillis() ?? 0;

        return timeB - timeA;
      });
      onData(tasks);
    },
    onError,
  );
}

export async function updateTaskById(taskId, changes) {
  await updateDoc(doc(db, "tasks", taskId), changes);
}

export async function deleteTaskById(taskId) {
  await deleteDoc(doc(db, "tasks", taskId));
}
