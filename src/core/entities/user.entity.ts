export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(id: string, name: string, email: string): User {
    return new User(id, name, email);
  }
}
