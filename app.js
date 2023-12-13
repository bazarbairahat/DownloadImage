import firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { upload } from './upload.js';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyDYP7m7j81rNeaWcDtuHq6Uejx3N4u69DQ',
  authDomain: 'fronted-dcf8c.firebaseapp.com',
  projectId: 'fronted-dcf8c',
  storageBucket: 'fronted-dcf8c.appspot.com',
  messagingSenderId: '782211552633',
  appId: '1:782211552633:web:a6aa6f20f94a42740e8ba8'
};
const app = initializeApp(firebaseConfig);
const storage = firebase.storage();
upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {
    files.forEach((file, index) => {
      const storageRef = storage.ref();
      const imagesRef = storageRef.child(`images/${file.name}`);
      const task = imagesRef.put(file);
      task.on(
        'state_changed',
        snapshot => {
          const percentage =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
            const block = blocks[index].querySelector('.preview-info-progress')
            block.textContent = percentage
            block.style.width = percentage
          console.log(`Upload is ${percentage}% done`);
        },
        error => {
          console.error('Error uploading file: ', error);
        },
        () => {
         task.snapshot.refgetDownloadURL().then(url => {
          console.log('Download URL', url)
         })
        }
      );
    });
  }
});
