import { User } from './user.entity';

export class Person {
  private readonly id: string;

  constructor(
    private readonly nationalNo: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly description: string,
    private readonly user: User,
  ) {
    this.id = crypto.randomUUID();
  }

  getId(): string {
    return this.id;
  }

  getNationalNo(): string {
    return this.nationalNo;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getDescription(): string {
    return this.description;
  }

  getUser(): User {
    return this.user;
  }
} 