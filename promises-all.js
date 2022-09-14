const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const error = false;

        if (error) {
            reject('error');
        }

        resolve('success-1');
    }, 2000);
});

const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const error = false;

        if (error) {
            reject('error');
        }

        resolve('success-2');
    }, 5000);
});

Promise.all([firstPromise, secondPromise]).then(result => {
    console.log(result);
});