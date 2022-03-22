/* ---- Array.prototype.every() ---- */
// Arrow function
// every((element) => { /* ... */ } )
// every((element, index) => { /* ... */ } )
// every((element, index, array) => { /* ... */ } )

// Inline callback function
// every(function(element) { /* ... */ })
// every(function(element, index) { /* ... */ })
// every(function(element, index, array){ /* ... */ })
// every(function(element, index, array) { /* ... */ }, thisArg)

Array.prototype.every = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (!cb(this[index], index, this)) {
      return false;
    }
  }
  return true;
};

const arrayEvery = [1, 30, 39, 29, 10, 13];
const isBelowThreshold = (currentValue) => currentValue < 40;
console.log("array.every", arrayEvery.every(isBelowThreshold));
// expected output: true

/* ---- Array.prototype.filter() ---- */
// Arrow function
// filter((element) => { /* ... */ } )
// filter((element, index) => { /* ... */ } )
// filter((element, index, array) => { /* ... */ } )

// Inline callback function
// filter(function(element) { /* ... */ })
// filter(function(element, index) { /* ... */ })
// filter(function(element, index, array){ /* ... */ })
// filter(function(element, index, array) { /* ... */ }, thisArg)

Array.prototype.filter = function (cb) {
  const result = [];
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      result.push(this[index]);
    }
  }
  return result;
};

const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
];
const arrayFilter = words.filter((word) => word.length > 6);
console.log("array.filter", arrayFilter);
// expected output: Array ["exuberant", "destruction", "present"]

/* ---- Array.prototype.map() ---- */
Array.prototype.map = function (cb) {
  const result = [];
  for (let index = 0; index < this.length; index++) {
    result.push(cb(this[index], index, this));
  }
  return result;
};

const arrayMap = [1, 4, 9, 16];
console.log(
  "array.map",
  arrayMap.map((x) => x * 2)
);
// expected output: Array [2, 8, 18, 32]

/* ---- Array.prototype.reduce() ---- */
// Arrow function
// reduce((previousValue, currentValue) => { /* ... */ } )
// reduce((previousValue, currentValue, currentIndex) => { /* ... */ } )
// reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ } )
// reduce((previousValue, currentValue, currentIndex, array) => { /* ... */ }, initialValue)

// Inline callback function
// reduce(function(previousValue, currentValue) { /* ... */ })
// reduce(function(previousValue, currentValue, currentIndex) { /* ... */ })
// reduce(function(previousValue, currentValue, currentIndex, array) { /* ... */ })
// reduce(function(previousValue, currentValue, currentIndex, array) { /* ... */ }, initialValue)
Array.prototype.reduce = function (cb, intValue) {
  let result = intValue;
  for (let index = 0; index < this.length; index++) {
    result = cb(result, this[index], index, this);
  }
  return result;
};

const arrayReduce = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
console.log(
  "array.reduce",
  arrayReduce.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  )
);
// expected output: 10

/* ---- Array.prototype.some() ---- */
// Arrow function
// some((element) => { /* ... */ } )
// some((element, index) => { /* ... */ } )
// some((element, index, array) => { /* ... */ } )

// Inline callback function
// some(function(element) { /* ... */ })
// some(function(element, index) { /* ... */ })
// some(function(element, index, array){ /* ... */ })
// some(function(element, index, array) { /* ... */ }, thisArg)

Array.prototype.some = function (cb) {
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      return true;
    }
  }
  return false;
};

const arraySome = [1, 2, 3, 4, 5];
// checks whether an element is even
const even = (element) => element % 2 === 0;
console.log("array.some", arraySome.some(even));
// expected output: true

/* ---- Promise ---- */
const a = new Promise((resolve, reject) => {
  let a = 1,
    b = 2;
  if (a + b > 2) {
    resolve(".then message");
  } else {
    reject(".catch message");
  }
});

a.then((i) => {
  console.log("promise", i);
}).catch((e) => console.log("promise", e));
console.dir(a.catch);
