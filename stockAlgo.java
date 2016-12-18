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
