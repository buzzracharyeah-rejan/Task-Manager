const doWorkCallback = (callback) => {
  setTimeout(() => {
    callback(undefined, 'say hi');
  }, 2000);
};

doWorkCallback((error, result) => {
  if (error) {
    console.log(error);
  }
  console.log(result);
});
