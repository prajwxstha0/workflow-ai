import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const projectRef = collection(db, "projects");

export async function createProject(userId, projectData) {
  await addDoc(projectRef, {
    ...projectData,
    userId,
    createdAt: serverTimestamp(),
  });
}

export function subscribetoProject(userId, onData, onError) {
  const q = query(projectRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const projects = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      projects.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() ?? 0;
        const timeB = b.createdAt?.toMillis() ?? 0;

        return timeB - timeA;
      });
      onData(projects);
    },
    onError,
  );
}
