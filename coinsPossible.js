// Write a function that, given:
//
// an amount of money
// an array of coin denominations
// computes the number of ways to make amount of money with coins of the available denominations.
//
// Example: for amount=44 (44¢) and denominations=[1,2,3][1,2,3] (11¢, 22¢ and 33¢), your program would output 44—the number of ways to make 44¢ with those denominations:
//
// 1¢, 1¢, 1¢, 1¢
// 1¢, 1¢, 2¢
// 1¢, 3¢
// 2¢, 2¢
//
// We need to find some way to break this problem down into subproblems.
//
// Here's one way: for each denomination, we can use it once, or twice, or...as many times as it takes to reach or overshoot the amount with coins of that denomination alone.
//
// For each of those choices of how many times to include coins of each denomination, we're left with the subproblem of seeing how many ways we can get the remaining amount from the remaining denominations.
//
// Here's that approach in pseudocode:
function numberOfWays(amount, denominations) {
  answer = 0;
  denominations.forEach(denomination) {
      possibleNumTimesToUseDenominationWithoutOvershootingAmount.forEach(numTimesToUseDenomination) {
          answer += numberOfWays(amountRemaining, otherDenominations);
      }
  }
  return answer;
}


// recursive function
function changePossibilitiesTopDown(amountLeft, denominations, currentIndex) {
  currentIndex = currentIndex || 0;

  // base cases:
  // we hit the amount spot on. yes!
  if (amountLeft === 0) return 1;

  // we overshot the amount left (used too many coins)
  if (amountLeft < 0) return 0;

  // we're out of denominations
  if (currentIndex === denominations.length) return 0;

  console.log('checking ways to make ' + amountLeft + ' with ' + denominations.slice(currentIndex));

  // choose a current coin
  var currentCoin = denominations[currentIndex];

  // see how many possibilities we can get
  // for each number of times to use currentCoin
  var numPossibilities = 0;
  while (amountLeft >= 0) {
      numPossibilities += changePossibilitiesTopDown(amountLeft,
          denominations, currentIndex + 1);
      amountLeft -= currentCoin;
  }

  return numPossibilities;
}

// memoization for no duplication

function Change() {
    this.memo = {};
}

Change.prototype.changePossibilitiesTopDown = function(amountLeft, denominations, currentIndex) {
    currentIndex = currentIndex || 0;

    // check our memo and short-circuit if we've already solved this one
    var memoKey = String([amountLeft, currentIndex]);
    if (this.memo.hasOwnProperty(memoKey)) {
        console.log('grabbing memo[' + memoKey + ']');
        return this.memo[memoKey];
    }

    // base cases:
    // we hit the amount spot on. yes!
    if (amountLeft === 0) return 1;

    // we overshot the amount left (used too many coins)
    if (amountLeft < 0) return 0;

    // we're out of denominations
    if (currentIndex === denominations.length) return 0;

    console.log('checking ways to make ' + amountLeft + ' with ' + denominations.slice(currentIndex));

    // choose a current coin
    var currentCoin = denominations[currentIndex];

    // see how many possibilities we can get
    // for each number of times to use currentCoin
    var numPossibilities = 0;
    while (amountLeft >= 0) {
        numPossibilities += this.changePossibilitiesTopDown(amountLeft, denominations, currentIndex + 1);
        amountLeft -= currentCoin;
    }

    // save the answer in our memo so we don't compute it again
    this.memo[memoKey] = numPossibilities;
    return numPossibilities;
};
