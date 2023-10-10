// new Promise((res, rej) => {
//   if (Math.floor(Math.random() * 10) > 5) {
//     res('success');
//   } else {
//     rej('fail');
//   }
//   throw new Error('asdasd');
// })
//   .then(
//     (res) => {
//       console.log('then1', res);
//       return res + 1
//     },
//     (res) => {
//       console.log('then2', res);
//       return res + 1
//     }
//   )
//   // .then(
//   //   (res) => {
//   //     console.log('then21', res);
//   //   },
//   //   (res) => {
//   //     console.log('then22', res);
//   //   }
//   // )
//   .catch((err) => {
//     console.log('err', err);
//   });
// [].indexOf
let a = {
  headers: {
    name: 'Content'
  }
}
a = {
  ...{
    name: '312',
    age: '23'
  }
}
console.log(a);