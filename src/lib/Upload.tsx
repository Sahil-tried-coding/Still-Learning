// import { Userinput } from "@/app/_context/Userinput";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useContext } from "react";

// const Upload =  (file) => {

//  const {fireBaseImage,setFirebaseImage} = useContext(Userinput)


  
//   const storage = getStorage();
//   const fileName = Date.now() + '.jpg' 
//   const storageRef = ref(storage, `images/` + fileName);
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   return new Promise((resolve, reject) => {
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//           case 'paused':
//             console.log('Upload is paused');
//             break;
//           case 'running':
//             console.log('Upload is running');
//             break;
//         }
//       },
//       (error) => {
//         // Handle error here
//         reject(error);
//       },
//       () => {
//         // Handle successful uploads on complete
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setFirebaseImage(downloadURL)
//           // console.log("this is download url ✅✅",downloadURL);
//         });
//       }
//     );
//   });
// };

// export default Upload;

import React from 'react'

const Upload = () => {
  return (
    <div>Upload</div>
  )
}

export default Upload

