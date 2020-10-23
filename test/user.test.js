const { dbQuery } = require("../src/db");
const { User } = require("../src/user");

jest.mock("../src/db");

beforeEach(() => {
  dbQuery.mockClear();
});

it("sends data to db file", () => {
  let user = new User();
  user.verifyThroughEmail("test@test.com");
  user.existingEmails("test@test.com");
  user.existingUsernames("test");
  user.saveUser("test", "test@test.com", "test");
  expect(dbQuery).toHaveBeenCalledTimes(4);
});

it("returns the query", () => {
  let user = new User();
  expect(user.verifyThroughEmail("test")).toBe(dbQuery("test"));
  expect(user.existingEmails("test")).toBe(dbQuery("test"));
  expect(user.existingUsernames("test")).toBe(dbQuery("test"));
  expect(user.saveUser("test", "test@test.com", "test")).toBe(dbQuery("test"));
});
