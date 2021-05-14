// This is similar to Jest environments.
// We don't use Jest environments here because they modify the global object in a type-unsafe way.
export abstract class TestEnvironment<Variables> {
  public abstract setup(): Variables | Promise<Variables>
  public abstract teardown(): void | Promise<void>
}
