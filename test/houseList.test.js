import Offer from "../src/houseOffer";
import List from "../src/houseList";
jest.mock("../src/houseOffer.js");

beforeEach(() => {
  Offer.mockClear();
});

it("creates new offers", () => {
  const list = new List();
  list.create("test", "test", "test", "test", "test", "test");
  expect(Offer).toHaveBeenCalledTimes(1);
});

it("stores offers once created", () => {
  const list = new List();
  list.create("test", "test", "test", "test", "test", "test");
  list.create("test", "test", "test", "test", "test", "test");
  list.create("test", "test", "test", "test", "test", "test");
  expect(list.houseList.length).toBe(3);
});
