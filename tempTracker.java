class TempTracker {

  // for mode
  int[] occurrences = new int[111]; // array of 0s at indices 0..110
  int maxOccurrences = 0;
  Integer mode;

  // for mean
  int totalNumbers = 0;
  double totalSum = 0.0; // mean should be double
  Double mean;

  // for min and max
  Integer minTemp;
  Integer maxTemp;

  public boolean insert(int temperature) {

      // for mode
      occurrences[temperature]++;
      if (occurrences[temperature] > maxOccurrences) {
          mode = temperature;
          maxOccurrences = occurrences[temperature];
      }

      // for mean
      totalNumbers++;
      totalSum += temperature;
      mean = totalSum / totalNumbers;

      // for min and max
      if (maxTemp == null || temperature > maxTemp) {
          maxTemp = temperature;
      }
      if (minTemp == null || temperature < minTemp) {
          minTemp = temperature;
      }

      return true;
  }

  public Integer getMax() {
      return maxTemp;
  }

  public Integer getMin() {
      return minTemp;
  }

  public Double getMean() {
      return mean;
  }

  public Integer getMode() {
      return mode;
  }
}
