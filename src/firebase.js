import "firebase/compat/database";
import { v4 as uuidv4 } from 'uuid'
import { initializeApp } from 'firebase/app';
import { getAuth, updatePassword, updateEmail } from "firebase/auth"
import { getDatabase, ref, set, child, get } from "firebase/database"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


var firebaseConfig = {
  apiKey: "AIzaSyBvIG5njGoFXRm3tv9IcKyEpbUb6CmgJoI",
  authDomain: "kitchen-display-fa3f2.firebaseapp.com",
  databaseURL: "https://kitchen-display-fa3f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kitchen-display-fa3f2",
  storageBucket: "kitchen-display-fa3f2.appspot.com",
  messagingSenderId: "92791308776",
  appId: "1:92791308776:web:8df016d4b7bbbf4b2ae45d"
};

const app = initializeApp(firebaseConfig);

// export const userDataRef = databaseRef.child("kitchen-display")
export const auth = getAuth(app)
export const storage = getStorage(app)


export async function writeUserData(userUID, userId, firstName, lastName, email, phoneNumber, imageURL, role) {
  const db = getDatabase();

  const userData = {
    userId: userId || "",
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    phoneNumber: phoneNumber || "",
    profileImage: imageURL || "",
    role: role || ""
  };

  set(ref(db, `users/${userUID}`), userData);
}

export function getUserData() {
  const userUID = sessionStorage.getItem('userUID');
  const dbRef = ref(getDatabase());

  return new Promise((resolve, reject) => {
    get(child(dbRef, `users/${userUID}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject(new Error("No data available"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
}

export function changePassword(newPassword) {
  const user = auth.currentUser;

  updatePassword(user, newPassword)
    .then(() => {
      console.log('Password updated successfully.');
    })
    .catch((error) => {
      console.log(error.code);
    });
}
export function changeEmail(newEmail) {

  const user = auth.currentUser;

  updateEmail(user, newEmail)
    .then(() => {
    })
    .catch((error) => {
      throw (error.code);
    });
}

export function getUserUID() {
  const user = auth.currentUser;

  if (user) {
    return user.uid;
  }
}
// uploadImage to Storage by User
export function uploadImage(userId, image) {
  const storage = getStorage();
  const imageRef = storageRef(storage, `users/${userId}/profileImage`);

  return new Promise((resolve, reject) => {
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((imageUrl) => {
            resolve(imageUrl);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

// Product IMAGE
export function uploadProductImage(productName, image) {
  const storage = getStorage();
  const imageRef = storageRef(storage, `products/${productName}/${uuidv4()}`);

  return new Promise((resolve, reject) => {
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((imageUrl) => {
            resolve(imageUrl);
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

// Get image URL
export async function getImageURL(imagePath) {
  try {
    const imageRef = storageRef(storage, imagePath);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve image URL.');
  }
}