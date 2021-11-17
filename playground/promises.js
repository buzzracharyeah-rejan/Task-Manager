const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([1, 2, 3]);
    reject({ error: 'something went wrong' });
  }, 2000);
});
