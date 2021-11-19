const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(1, 2)
  .then((result) => add(result, 5))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
// add(1, 2)
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
