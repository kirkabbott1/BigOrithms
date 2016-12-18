// O(n2) never reports negative profit.

public int getMaxProfit(int[] stockPricesYesterday) {

    int maxProfit = 0;

    // go through every time
    for (int outerTime = 0; outerTime < stockPricesYesterday.length; outerTime++) {

        // for every time, got through every OTHER time
        for (int innerTime = 0; innerTime < stockPricesYesterday.length; innerTime++) {

            // for each pair, find the earlier and later times
            int earlierTime = Math.min(outerTime, innerTime);
            int laterTime   = Math.max(outerTime, innerTime);

            // and use those to find the earlier and later prices
            int earlierPrice = stockPricesYesterday[earlierTime];
            int laterPrice   = stockPricesYesterday[laterTime];

            // see what our profit would be if we bought at the
            // min price and sold at the current price
            int potentialProfit = laterPrice - earlierPrice;

            // update maxProfit if we can do better
            maxProfit = Math.max(maxProfit, potentialProfit);
        }
    }

    return maxProfit;
}

public int getMaxProfit(int[] stockPricesYesterday) {

  int minPrice = stockPricesYesterday[0];
  int maxProfit = 0;

  for (int currentPrice : stockPricesYesterday) {

      // ensure min_price is the lowest price we've seen so far
      minPrice = Math.min(minPrice, currentPrice);

      // see what our profit would be if we bought at the
      // min price and sold at the current price
      int potentialProfit = currentPrice - minPrice;

      // update maxProfit if we can do better
      maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}

// We’re finding the max profit with one pass and constant space!
//
// Are we done? Let’s think about some edge cases. What if the stock value stays the same? What if the stock value goes down all day?
//
// If the stock price doesn't change, the max possible profit is 0. Our function will correctly return that. So we're good.
//
// But if the value goes down all day, we’re in trouble. Our function would return 0, but there’s no way we could break even if the price always goes down.
//
// How can we handle this?
//
// Well, what are our options? Leaving our function as it is and just returning zero is not a reasonable option—we wouldn't know if our best profit was negative or actually zero, so we'd be losing information. Two reasonable options could be:
//
// return a negative profit. “What’s the least badly we could have done?”
// throw an exception. “We should not have purchased stocks yesterday!”
// In this case, it’s probably best to go with option (1). The advantages of returning a negative profit are:
//
// We more accurately answer the challenge. If profit is "revenue minus expenses", we’re returning the best we could have done.
// It's less opinionated. We'll leave decisions up to our function’s users. It would be easy to wrap our function in a helper function to decide if it’s worth making a purchase.
// We allow ourselves to collect better data. It matters if we would have lost money, and it matters how much we would have lost. If we’re trying to get rich, we’ll probably care about those numbers.
// How can we adjust our function to return a negative profit if we can only lose money? Initializing maxProfit to 0 won’t work...
//
// Well, we started our minPrice at the first price, so let’s start our maxProfit at the first profit we could get—if we buy at the first time and sell at the second time.
//
// minPrice = stockPricesYesterday[0];
// maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];
//
// But we have the potential for an index out of bounds error here, if stockPricesYesterday has fewer than 2 prices.
//
// We do want to throw an exception in that case, since profit requires buying and selling, which we can't do with less than 2 prices. So, let's explicitly check for this case and handle it:

if (stockPricesYesterday.length < 2) {
  throw new IllegalArgumentException("Getting a profit requires at least 2 prices");
}

int minPrice = stockPricesYesterday[0];
int maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

// Ok, does that work?
//
// No! maxProfit is still always 0! What’s happening?
//
// If the price always goes down, minPrice is always set to the currentPrice. So currentPrice - minPrice comes out to 0, which of course will always be greater than a negative profit.
//
// When we’re calculating the maxProfit, we need to make sure we never have a case where we try both buying and selling stocks at the currentPrice.
//
// To make sure we’re always buying at an earlier price, never the currentPrice, let’s switch the order around so we calculate maxProfit before we update minPrice.
//
// We'll also need to pay special attention to time 0. Make sure we don't try to buy and sell at time 0!
//
// Solution
// We’ll greedily ↴ walk through the array to track the max profit and lowest price so far.
//
// For every price, we check if:
//
// we can get a better profit by buying at minPrice and selling at the currentPrice
// we have a new minPrice
// To start, we initialize:
//
// minPrice as the first price of the day
// maxProfit as the first profit we could get
// We decided to return a negative profit if the price decreases all day and we can't make any money. We could have thrown an exception instead, but returning the negative profit is cleaner, makes our function less opinionated, and ensures we don't lose information.

public int getMaxProfit(int[] stockPricesYesterday) {

  // make sure we have at least 2 prices
  if (stockPricesYesterday.length < 2) {
      throw new IllegalArgumentException("Getting a profit requires at least 2 prices");
  }

  // we'll greedily update minPrice and maxProfit, so we initialize
  // them to the first price and the first possible profit
  int minPrice = stockPricesYesterday[0];
  int maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

  // start at the second (index 1) time
  // we can't sell at the first time, since we must buy first,
  // and we can't buy and sell at the same time!
  // if we started at index 0, we'd try to buy *and* sell at time 0.
  // this would give a profit of 0, which is a problem if our
  // maxProfit is supposed to be *negative*--we'd return 0!
  for (int i = 1; i < stockPricesYesterday.length; i++) {
      int currentPrice = stockPricesYesterday[i];

      // see what our profit would be if we bought at the
      // min price and sold at the current price
      int potentialProfit = currentPrice - minPrice;

      // update maxProfit if we can do better
      maxProfit = Math.max(maxProfit, potentialProfit);

      // update minPrice so it's always
      // the lowest price we've seen so far
      minPrice = Math.min(minPrice, currentPrice);
  }

  return maxProfit;
}

// Complexity
// O(n)O(n) time and O(1)O(1) space. We only loop through the array once.
//
// What We Learned
// This one's a good example of the greedy ↴ approach in action. Greedy approaches are great because they're fast (usually just one pass through the input). But they don't work for every problem.
//
// How do you know if a problem will lend itself to a greedy approach? Best bet is to try it out and see if it works. Trying out a greedy approach should be one of the first ways you try to break down a new question.
//
// To try it on a new problem, start by asking yourself:
//
// "Suppose we could come up with the answer in one pass through the input, by simply updating the 'best answer so far' as we went. What additional values would we need to keep updated as we looked at each item in our set, in order to be able to update the 'best answer so far' in constant time?"
//
// In this case:
//
// The "best answer so far" is, of course, the max profit that we can get based on the prices we've seen so far.
//
// The "additional value" is the minimum price we've seen so far. If we keep that updated, we can use it to calculate the new max profit so far in constant time. The max profit is the larger of:
//
// The previous max profit
// The max profit we can get by selling now (the current price minus the minimum price seen so far)
