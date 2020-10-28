const { Stay } = require("../src/stay");

it("stores correct informations", () => {
  let stay = new Stay(
    "id",
    "user",
    "address",
    "price",
    "availability",
    "images",
    "description"
  );

  expect(stay.id).toBe("id");
  expect(stay.user).toBe("user");
  expect(stay.address).toBe("address");
  expect(stay.price).toBe("price");
  expect(stay.availability).toBe("availability");
  expect(stay.images).toBe("images");
  expect(stay.description).toBe("description");
});
