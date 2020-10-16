import Offer from "../src/houseOffer.js";

it("initialises an offer", () => {
  const offer = new Offer("test", "test", "test", "test", "test", "test");
  expect(offer.description).toBe("test");
  expect(offer.title).toBe("test");
  expect(offer.price).toBe("test");
  expect(offer.availability).toBe("test");
  expect(offer.address).toBe("test");
  expect(offer.image).toBe("test");
  expect(offer.id).toBe(undefined);
});
