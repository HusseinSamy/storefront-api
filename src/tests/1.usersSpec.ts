import { UsersModel, User } from "../models/users";

describe("Users model", () => {
  const user = new UsersModel();
  it("Create 15 user in the users table", async () => {
    const users: User[] = [];
    for (let i = 1; i <= 15; i++) {
      const newUser: User = {
        firstName: `User-${i}`,
        lastName: "test",
        password: "123456789",
      };
      const response = await user.create(newUser);
      users.push(response);
    }
    expect(users.length).toEqual(15);
  });
  it("Returns users from users table", async () => {
    const response = await user.index();
    expect(response.length).toBeGreaterThan(1);
  });
  it("Returns certain user from users table", async () => {
    const response = await user.show(2);
    expect(response).toBeTruthy;
  });
});
