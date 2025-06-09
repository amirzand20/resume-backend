export class AdditionalInformation {
  private readonly id: string;

  constructor(
    private readonly key: string,
    private readonly value: string,
  ) {
    this.id = crypto.randomUUID();
  }

  getId(): string {
    return this.id;
  }

  getKey(): string {
    return this.key;
  }

  getValue(): string {
    return this.value;
  }
} 