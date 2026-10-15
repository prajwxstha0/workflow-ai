import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const activityRef = collection(db, "activities");

export async function createActivites(activityOwner, info) {
  await addDoc(activityRef, {
    activityOwner,
    info,
    createdAt: serverTimestamp(),
  });
}

export function subscribetoActivity(onData, onError) {
  const q = query(activityRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const activities = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      activities.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() ?? 0;
        const timeB = b.createdAt?.toMillis() ?? 0;

        return timeB - timeA;
      });
      onData(activities);
    },
    onError,
  );
}
