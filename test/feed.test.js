import List from "../src/houseList.js";
import Feed from "../src/feed.js";
jest.mock("../src/houseList.js");

beforeEach(() => {
  List.mockClear();
});

it("creates a list", () => {
  const feed = new Feed();
  expect(List).toHaveBeenCalledTimes(1);
});

it("initialized preset images", () => {
  const feed = new Feed();
  expect(feed.images.length).toBe(15);
});
