const { User } = require("../src/user.js");

test("email passwords and username are first undefined", () => {
  const user = new User();
  expect(user.password).toBe(undefined);
  expect(user.username).toBe(undefined);
  expect(user.email).toBe(undefined);
});
