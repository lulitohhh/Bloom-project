import { useEffect, useState } from "react";
import { db } from "../services/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuizzes() {
      const colRef = collection(db, "quizzes");
      const querySnapshot = await getDocs(colRef);

      const loaded = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuizzes(loaded);
      setLoading(false);
    }

    loadQuizzes();
  }, []);

  return { quizzes, loading };
}