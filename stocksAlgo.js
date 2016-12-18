// O(n2) never reports negative profit.

function getMaxProfit(stockPricesYesterday) {

  var maxProfit = 0;

  // go through every time
  for (var outerTime = 0; outerTime < stockPricesYesterday.length; outerTime++) {

      // for every time, got through every OTHER time
      for (var innerTime = 0; innerTime < stockPricesYesterday.length; innerTime++) {

          // for each pair, find the earlier and later times
          var earlierTime = Math.min(outerTime, innerTime);
          var laterTime   = Math.max(outerTime, innerTime);

          // and use those to find the earlier and later prices
          var earlierPrice = stockPricesYesterday[earlierTime];
          var laterPrice   = stockPricesYesterday[laterTime];

          // see what our profit would be if we bought at the
          // min price and sold at the current price
          var potentialProfit = laterPrice - earlierPrice;

          // update maxProfit if we can do better
          maxProfit = Math.max(maxProfit, potentialProfit);
      }
  }

  return maxProfit;
}

//If we're going to do better than O(n^2)O(n​2), we're probably going to do it in either O(n\lg{n})O(nlgn) or O(n)O(n). O(n\lg{n})O(nlgn) comes up in sorting and searching algorithms where we're recursively cutting the set in half. It's not obvious that we can save time by cutting the set in half here. Let's first see how well we can do by looping through the set only once.
//
// Since we're trying to loop through the set once, let's use a greedy ↴ approach, where we keep a running maxProfit until we reach the end. We'll start our maxProfit at $0. As we're iterating, how do we know if we've found a new maxProfit?
//
// At each iteration, our maxProfit is either:
//
// the same as the maxProfit at the last time step, or
// the max profit we can get by selling at the currentPrice
// How do we know when we have case (2)?
//
// The max profit we can get by selling at the currentPrice is simply the difference between the currentPrice and the minPrice from earlier in the day. If this difference is greater than the current maxProfit, we have a new maxProfit.
//
// So for every price, we’ll need to:
//
// keep track of the lowest price we’ve seen so far
// see if we can get a better profit
// Here’s one possible solution:

function getMaxProfit(stockPricesYesterday) {

  var minPrice = stockPricesYesterday[0];
  var maxProfit = 0;

  for (var i = 0; i < stockPricesYesterday.length; i++) {
      var currentPrice = stockPricesYesterday[i];

      // ensure min_price is the lowest price we've seen so far
      minPrice = Math.min(minPrice, currentPrice);

      // see what our profit would be if we bought at the
      // min price and sold at the current price
      var potentialProfit = currentPrice - minPrice;

      // update maxProfit if we can do better
      maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}
