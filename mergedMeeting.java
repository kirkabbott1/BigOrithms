import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;



public List<Meeting> mergeRanges(List<Meeting> meetings) {

  // sort by start times
  List<Meeting> sortedMeetings = new ArrayList<Meeting>(meetings);
  Collections.sort(sortedMeetings, new Comparator<Meeting>() {
      public int compare(Meeting m1, Meeting m2)  {
          return m1.startTime - m2.startTime;
      }
  });

  // initialize mergedMeetings with the earliest meeting
  List<Meeting> mergedMeetings = new ArrayList<Meeting>();
  mergedMeetings.add(sortedMeetings.get(0));

  for (Meeting currentMeeting : sortedMeetings) {

      Meeting lastMergedMeeting = mergedMeetings.get(mergedMeetings.size() - 1);

      // if the current and last meetings overlap, use the latest end time
      if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
          lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime);

      // add the current meeting since it doesn't overlap
      } else {
          mergedMeetings.add(currentMeeting);
      }
  }

  return mergedMeetings;
}
