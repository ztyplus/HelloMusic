export default function debounce(fn, delay) {
  let timer = null;

  return function () {
    const args = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn.apply(this, args));
      }, delay);
    });
  };
}
