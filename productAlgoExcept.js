var productsOfAllIntsBeforeIndex = [];

// for each integer, find the product of all the integers
// before it, storing the total product so far each time
var productSoFar = 1;
for (var i = 0; i < intArray.length; i++) {
  productsOfAllIntsBeforeIndex[i] = productSoFar;
  productSoFar *= intArray[i];
}

// So we solved the subproblem of finding the products of all the integers before each index. Now, how can we find the products of all the integers after each index?

// It might be tempting to make a new array of all the values in our input array in reverse, and just use the same function we used to find the products before each index.
//
// Is this the best way?
//
// This method will work, but:
//
// We'll need to make a whole new array that's basically the same as our input array. That's another O(n)O(n) memory cost!
// To keep our indices aligned with the original input array, we'd have to reverse the array of products we return. That's two reversals, or two O(n)O(n) operations!
// Is there a cleaner way to get the products of all the integers after each index?
//
// We can just walk through our array backwards! So instead of reversing the values of the array, we'll just reverse the indices we use to iterate!
var productsOfAllIntsAfterIndex = [];

var productSoFar = 1;
for (var i = intArray.length - 1; i >= 0; i--) {
  productsOfAllIntsAfterIndex[i] = productSoFar;
  productSoFar *= intArray[i];
}

// Now we've got productsOfAllIntsAfterIndex, but we’re starting to build a lot of new arrays. And we still need our final array of the total products. How can we save space?
//
// Let’s take a step back. Right now we’ll need three arrays:
//
// productsOfAllIntsBeforeIndex
// productsOfAllIntsAfterIndex
// productsOfAllIntsExceptAtIndex
// To get the first one, we keep track of the total product so far going forwards, and to get the second one, we keep track of the total product so far going backwards. How do we get the third one?
//
// Well, we want the product of all the integers before an index and the product of all the integers after an index. We just need to multiply every integer in productsOfAllIntsBeforeIndex with the integer at the same index in productsOfAllIntsAfterIndex!

// instead of building the second array productsOfAllIntsAfterIndex, we could take the product we would have stored and just multiply it by the matching integer in productsOfAllIntsBeforeIndex!
//
// So in our example above, when we calculated our first (well, "0th") "product after index" (which is 40), we’d just multiply that by our first "product before index" (1) instead of storing it in a new array.

// How many arrays do we need now?
//
// Just one! We create an array, populate it with the products of all the integers before each index, and then multiply those products with the products after each index to get our final result!
//
// productsOfAllIntsBeforeIndex now contains the products of all the integers before and after every index, so we can call it productsOfAllIntsExceptAtIndex!
//
// Almost done! Are there any edge cases we should test?
//
// What if the input array contains zeroes? What if the input array only has one integer?
//
// We'll be fine with zeroes.
//
// But what if the input array has fewer than two integers?
//
// Well, there won't be any products to return because at any index there are no “other” integers. So let's throw an exception.

// To find the products of all the integers except the integer at each index, we'll go through our array greedily ↴ twice. First we get the products of all the integers before each index, and then we go backwards to get the products of all the integers after each index.
//
// When we multiply all the products before and after each index, we get our answer—the products of all the integers except the integer at each index!

function getProductsOfAllIntsExceptAtIndex(intArray) {

  var productsOfAllIntsExceptAtIndex = [];

  // for each integer, we find the product of all the integers
  // before it, storing the total product so far each time
  var productSoFar = 1;
  for (var i = 0; i < intArray.length; i++) {
      productsOfAllIntsExceptAtIndex[i] = productSoFar;
      productSoFar *= intArray[i];
  }

  // for each integer, we find the product of all the integers
  // after it. since each index in products already has the
  // product of all the integers before it, now we're storing
  // the total product of all other integers
  productSoFar = 1;
  for (var j = intArray.length - 1; j >= 0; j--) {
      productsOfAllIntsExceptAtIndex[j] *= productSoFar;
      productSoFar *= intArray[j];
  }

  return productsOfAllIntsExceptAtIndex;
}
