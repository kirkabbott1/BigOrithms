// ex.
{startTime: 2, endTime: 3} // meeting from 10:00 – 10:30 am
{startTime: 6, endTime: 9} // meeting from 12:00 – 1:30 pm

// given...
[
  {startTime: 0,  endTime: 1},
  {startTime: 3,  endTime: 5},
  {startTime: 4,  endTime: 8},
  {startTime: 10, endTime: 12},
  {startTime: 9,  endTime: 10},
]
// return...
[
  {startTime: 0, endTime: 1},
  {startTime: 3, endTime: 8},
  {startTime: 9, endTime: 12},
]

// What if we only had two ranges? Let's take:

  [{startTime: 1, endTime: 3}, {startTime: 2, endTime: 4}]

// These meetings clearly overlap, so we should merge them to give:

  [{startTime: 1, endTime: 4}]
// But how did we know that these meetings overlap?
//
// We could tell the meetings overlapped because the end time of the first one was after the start time of the second one! But our ideas of "first" and "second" are important here—this only works after we ensure that we treat the meeting that starts earlier as the "first" one.
//
// How would we formalize this as an algorithm? Be sure to consider these edge cases:
//
// The end time of the first meeting and the start time of the second meeting are equal. For example: [{startTime: 1, endTime: 2}, {startTime: 2, endTime: 3}]
// The second meeting ends before the first meeting ends. For example: [{startTime: 1, endTime: 5}, {startTime: 2, endTime: 3}]
// Here's a formal algorithm:
//
// We treat the meeting with earlier start time as "first," and the other as "second."
// If the end time of the first meeting is equal to or greater than the start time of the second meeting, we merge the two meetings into one time range. The resulting time range's start time is the first meeting's start, and its end time is the later of the two meetings' end times.
// Else, we leave them separate.
// So, we could compare every meeting to every other meeting in this way, merging them or leaving them separate.
//
// Comparing all pairs of meetings would take O(n^2)O(n
// ​2
// ​​ ) time. We can do better!
//
// If we're going to beat O(n^2)O(n
// ​2
// ​​ ) time, maybe we're going to get O(n)O(n) time? Is there a way to do this in one pass?
//
// It'd be great if, for each meeting, we could just try to merge it with the next meeting. But that's definitely not sufficient, because the ordering of our meetings is random. There might be a non-next meeting that the current meeting could be merged with.
//
// What if we sorted our array of meetings by start time?
//
// Then any meetings that could be merged would always be adjacent!
//
// So we could sort our meetings, then walk through the sorted array and see if each meeting can be merged with the one after it.
//
// Sorting takes O(n\lg{n})O(nlgn) time in the worst case. If we can then do the merging in one pass, that's another O(n)O(n) time, for O(n\lg{n})O(nlgn) overall. That's not as good as O(n)O(n), but it's better than O(n^2)O(n
// ​2
// ​​ )


solution
// First, we sort our input array of meetings by start time so any meetings that might need to be merged are now next to each other.
//
// Then we walk through our sorted meetings from left to right. At each step, either:
//
// We can merge the current meeting with the previous one, so we do.
// We can't merge the current meeting with the previous one, so we know the previous meeting can't be merged with any future meetings and we throw the current meeting into mergedMeetings.
