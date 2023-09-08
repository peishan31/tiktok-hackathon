import {db} from "../config/firebase";
import { collection, getDocs, query, deleteDoc, where, doc, addDoc, setDoc, orderBy, limit, getDoc } from "firebase/firestore/lite";
// Assuming you have a valid 'db' instance from Firebase initialization
const getUsersData = async (closeFriendsID, db) => {
    const promises = closeFriendsID.map(async (docID) => {
        const usersCollection = collection(db, "users");
        const docRef = doc(usersCollection, docID);

        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                var data = docSnap.data();
                data.followerid = docID;
                return data;
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
