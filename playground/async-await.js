const add = async (a, b) => {
  setTimeout(() => {
    return a + b;
  }, 2000);
};

add(1, 2).then((result) => console.log(result));

// const doWork = async () => {
//   return await add(1, 2);
// };

// doWork()
//   .then((result) => {
//     console.log(`result: ${result}`);
//   })
//   .catch((err) => {
//     console.log(`error: ${err}`);
//   });
