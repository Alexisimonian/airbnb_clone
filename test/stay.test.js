const { Stay } = require("../src/stay");

it("stores correct informations", () => {
  let stay = new Stay(
    "id",
    "user",
    "address",
    "price",
    "availableFrom",
    "availableTo",
    "images",
    "description"
  );

  expect(stay.id).toBe("id");
  expect(stay.user).toBe("user");
  expect(stay.address).toBe("address");
  expect(stay.price).toBe("price");
  expect(stay.availableFrom).toBe("availableFrom");
  expect(stay.availableTo).toBe("availableTo");
  expect(stay.images).toBe("images");
  expect(stay.description).toBe("description");
});
