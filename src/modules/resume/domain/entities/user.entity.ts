export class User {
  private readonly id: string;

  constructor(
    private readonly username: string,
    private readonly email: string,
    private readonly password: string,
  ) {
    this.id = crypto.randomUUID();
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
} 