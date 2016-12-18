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

# one loop

  def get_max_profit(stock_prices_yesterday):

    # make sure we have at least 2 prices
    if len(stock_prices_yesterday) < 2:
        raise IndexError('Getting a profit requires at least 2 prices')

    # we'll greedily update min_price and max_profit, so we initialize
    # them to the first price and the first possible profit
    min_price = stock_prices_yesterday[0]
    max_profit = stock_prices_yesterday[1] - stock_prices_yesterday[0]

    for index, current_price in enumerate(stock_prices_yesterday):

        # skip the first (0th) time
        # we can't sell at the first time, since we must buy first,
        # and we can't buy and sell at the same time!
        # if we took this out, we'd try to buy *and* sell at time 0.
        # this would give a profit of 0, which is a problem if our
        # max_profit is supposed to be *negative*--we'd return 0!
        if index == 0:
            continue

        # see what our profit would be if we bought at the
        # min price and sold at the current price
        potential_profit = current_price - min_price

        # update max_profit if we can do better
        max_profit = max(max_profit, potential_profit)

        # update min_price so it's always
        # the lowest price we've seen so far
        min_price  = min(min_price, current_price)

    return max_profit
