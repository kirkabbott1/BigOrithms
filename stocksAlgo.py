 # O(n2) never reports negative profit.

  def get_max_profit(stock_prices_yesterday):

    max_profit = 0

    # go through every time
    for outer_time in xrange(len(stock_prices_yesterday)):

        # for every time, go through every OTHER time
        for inner_time in xrange(len(stock_prices_yesterday)):

            # for each pair, find the earlier and later times
            earlier_time = min(outer_time, inner_time)
            later_time   = max(outer_time, inner_time)

            # and use those to find the earlier and later prices
            earlier_price = stock_prices_yesterday[earlier_time]
            later_price   = stock_prices_yesterday[later_time]

            # see what our profit would be if we bought at the
            # earlier price and sold at the later price
            potential_profit = later_price - earlier_price

            # update max_profit if we can do better
            max_profit = max(max_profit, potential_profit)

    return max_profit
