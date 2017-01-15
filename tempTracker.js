// The first thing we want to optimize is our getter functions (per the instructions).

// Our first thought might be to throw our temperatures into an array or linked list as they come in. With this method, getting the maxTemp and minTemp would take O(n)O(n) time. It would also cost us O(n)O(n) space. But we can do better.
//
// What if we kept track of the maxTemp and minTemp as each new number was inserted?
function TempTracker() {
  this.minTemp = null;
  this.maxTemp = null;
}

TempTracker.prototype.insert = function(temperature) {
  if (this.maxTemp === null || temperature > this.maxTemp) {
      this.maxTemp = temperature;
  }
  if (this.minTemp === null || temperature < this.minTemp) {
      this.minTemp = temperature;
  }
};

TempTracker.prototype.getMax = function() {
  return this.maxTemp;
};

TempTracker.prototype.getMin = function() {
  return this.minTemp;
};

// This wins us O(1)O(1) time for getMax() and getMin(), while keeping O(1)O(1) time for insert() and removing the need to store all the values.
//
// Can we do something similar for getMean()?
//
// Unlike with minTemp and maxTemp, the new temp and the previous mean won't give us enough information to calculate the new mean. What other information will we need to track?
//
// To calculate the mean of a list of values, we need to know:
//
// the sum of all the values
// the total number of values
// So we can augment our class to keep track of the totalNumbers and totalSum. Then we can compute the mean as values are inserted:

function TempTracker() {

  // for mean
  this.totalNumbers = 0;
  this.totalSum = 0;
  this.mean = null;

  // for min and max
  this.minTemp = null;
  this.maxTemp = null;
}

TempTracker.prototype.insert = function(temperature) {

  // for mean
  this.totalNumbers++;
  this.totalSum += temperature;
  this.mean = this.totalSum / this.totalNumbers;

  // for min and max
  if (this.maxTemp === null || temperature > this.maxTemp) {
      this.maxTemp = temperature;
  }
  if (this.minTemp === null || temperature < this.minTemp) {
      this.minTemp = temperature;
  }
};

TempTracker.prototype.getMax = function() {
  return this.maxTemp;
};

TempTracker.prototype.getMin = function() {
  return this.minTemp;
};

TempTracker.prototype.getMean = function() {
  return this.mean;
};

// Solution
// We maintain the maxTemp, minTemp, mean, and mode as temperatures are inserted, so that each getter function simply returns an instance variable.
//
// To maintain the mean at each insert, we track the totalNumbers and the totalSum of numbers inserted so far.
//
// To maintain the mode at each insert, we track the total occurrences of each number, as well as the maxOccurrences we've seen so far.

function TempTracker() {

  // for mode
  this.occurrences = []; // array of 0s at indices 0..110
  for (var i = 0; i < 111; i++) {
      this.occurrences[i] = 0;
  }
  this.maxOccurrences = 0;
  this.mode = null;

  // for mean
  this.totalNumbers = 0;
  this.totalSum = 0;
  this.mean = null;

  // for min and max
  this.minTemp = null;
  this.maxTemp = null;
}

TempTracker.prototype.insert = function(temperature) {

  // for mode
  this.occurrences[temperature]++;
  if (this.occurrences[temperature] > this.maxOccurrences) {
      this.mode = temperature;
      this.maxOccurrences = this.occurrences[temperature];
  }

  // for mean
  this.totalNumbers++;
  this.totalSum += temperature;
  this.mean = this.totalSum / this.totalNumbers;

  // for min and max
  if (this.maxTemp === null || temperature > this.maxTemp) {
      this.maxTemp = temperature;
  }
  if (this.minTemp === null || temperature < this.minTemp) {
      this.minTemp = temperature;
  }
};

TempTracker.prototype.getMax = function() {
  return this.maxTemp;
};

TempTracker.prototype.getMin = function() {
  return this.minTemp;
};

TempTracker.prototype.getMean = function() {
  return this.mean;
};

TempTracker.prototype.getMode = function() {
  return this.mode;
};

//   // function
// tempTracker.getMean();

// attribute
// tempTracker.mean;
// We'll leave the getter functions in our solution because the question specifically asked for them.

// But otherwise, we probably would use attributes instead of functions. In JavaScript we usually don't make getters if we don't have to, to avoid unnecessary layers of abstraction. But in Java we would use getters because they give us flexibility—if we need to change our logic inside our class, it won't change how other people interact with our class. Different languages, different conventions.

//Complexity O(1) time for each function, and O(1)O(1) space related to input! (Our occurrences array's size is bounded by our range of possible temps, in this case 0-110)

// This question deals a lot with just-in-time vs ahead-of-time. Or lazy vs eager. Or on-line vs off-line. There are a few names for this.

// Our first thought for this question might have been to use a just-in-time approach: have our insert() function simply put the temperature in a list, and then have our getters compute e.g. the mode just-in-time, at the moment the getter is called.
//
// Instead, we used an ahead-of-time approach: have our insert function compute and store our mean, mode, max, and min ahead of time (that is, before they're asked for). So our getter just returns the pre-computed value in O(1)O(1) time.
//
// In this case, the ahead-of-time approach doesn't just speed up our getters...it also reduces our space cost. If we tried to compute each metric just-in-time, we'd need to store all of the temperatures as they come in, taking O(n)O(n) space for nn insert()s.
//
// As an added bonus, the ahead-of-time approach didn't increase our asymptotic time cost for inserts, even though we added more work. With some cleverness (channeling some greedy ↴ thinking to figure out what we needed to store in order to update the answer in O(1)O(1) time), we were able to keep it at O(1)O(1) time.
//
// It doesn't always happen this way. Sometimes there are trade-offs between just-in-time and ahead-of-time. Sometimes to save time in our getters, we have to spend more time in our insert.
//
// In those cases, whether we should prefer a just-in-time approach or an ahead-of-time approach is a nuanced question. Ultimately it comes down to your usage patterns. Do you expect to get more inserts than gets? Do slow inserts have a stronger negative effect on users than slow gets?
//
// We have some more questions dealing with this stuff coming up later.
//
// Whenever you're designing a data structure with inserts and getters, think about the advantages and disadvantages of a just-in-time approach vs an ahead-of-time approach.
