const { dbQuery } = require("../src/db");
const { Stays } = require("../src/stays");
const { Stay } = require("../src/stay");

jest.mock("../src/db");
jest.mock("../src/stay");

beforeEach(() => {
  dbQuery.mockClear();
});

it("calls dbquery", () => {
  let stays = new Stays();
  let stay = new Stay();
  stays.createStay(
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test",
    "test"
  );
  stays.deleteStay("stayID");
  (async () => {
    await stays.listingStays("stayID");
  })();
  expect(dbQuery).toHaveBeenCalledTimes(3);
});

it("returns the query", () => {
  let stays = new Stays();
  expect(
    stays.createStay(
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test",
      "test"
    )
  ).toBe(dbQuery("test"));
  expect(stays.deleteStay("stayID")).toBe(dbQuery("test"));
});
