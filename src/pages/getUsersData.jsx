import dbb from "../config/firebase";
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy, limit, getDoc } from "firebase/firestore/lite";
// Assuming you have a valid 'db' instance from Firebase initialization
const getUsersData = async (closeFriendsID, db) => {
    console.log(closeFriendsID, "is here");
    const promises = closeFriendsID.map(async (docID) => {
        console.log(docID);
        const usersCollection = collection(dbb, "users");
        console.log("ok");
        const docRef = doc(usersCollection, docID);
        console.log("pass here");

        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error getting document:", error);
            return null; // Handle the error and return null or another appropriate value
        }
    });

    try {
        const userDataArray = await Promise.all(promises);
        return userDataArray;
    } catch (error) {
        console.error("Error getting documents:", error);
        return null; // Handle the error and return null or another appropriate value
    }
};

export default getUsersData;
