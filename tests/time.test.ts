import { millisecondsToMinutesAndSeconds } from "../utils/time";

test("millisecondsToMinutesAndSeconds", () => {
  expect(millisecondsToMinutesAndSeconds(1000)).toEqual("0:01");
  expect(millisecondsToMinutesAndSeconds(1000 * 60)).toEqual("1:00");
  expect(millisecondsToMinutesAndSeconds(1000 * 60 * 4 + 1000 * 10)).toEqual(
    "4:10"
  );
  expect(millisecondsToMinutesAndSeconds(249693)).toEqual("1:00");
});
