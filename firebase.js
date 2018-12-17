const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyCj7J5tOeNKipnRlo3xUWe-CccDLrp1fsg',
  authDomain: 'csmc-helper.firebaseapp.com',
  databaseURL: 'https://csmc-helper.firebaseio.com',
  projectId: 'csmc-helper',
  storageBucket: 'csmc-helper.appspot.com',
  messagingSenderId: '585672640544'
};
firebase.initializeApp(config);
const database = firebase.database();
const ref = firebase.database().ref();
// database
//   .ref('issues')
//   .push({
//     description: 'Cloud Portal not showing Server resource utilisation data',
//     name: 'Cloud Portal not showing Server resource utilisation data',
//     tags: ['Server resource utilisation data', 'utilisation data', 'graphs'],
//     work: [
//       'Server resource utilisation data not being rendered on UI',
//       'Data not avalibale on Zenoss',
//       'Check with Zenoss',
//       'Ask Zenoss to update their data'
//     ],
//     date: Date.now()
//   })
//   .then(data => {
//     return;
//   });
// ref.on(
//   'value',
//   function(snapshot) {
//     console.log(`snapshot Value :${snapshot.val()}`);
//   },
//   function(error) {
//     console.log(error);
//   }
// );

module.exports = (ref, database);
