export class Cache<T> {
  private readonly data = new Map<string, T>();

  constructor(private readonly getter: (key: string) => T) {}

  get(key: string): T {
    const existing = this.data.get(key);
    if (existing) {
      return existing;
    }

    const fresh = this.getter(key);
    this.set(key, fresh);

    return fresh;
  }

  set(key: string, val: T) {
    this.data.set(key, val);
  }
}
