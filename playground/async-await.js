const add = (a, b) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
  return promise;
};

const doSomething = async () => {
  const res1 = await add(1, 2);
  const res2 = await add(res1, 3);
  const res3 = await add(res2, 3);

  console.log(res3);
  console.log('say hello');
};

doSomething();
