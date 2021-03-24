# Architecture

This document describes the high-level architecture of Waterpark. If you want to familiarize yourself with the codebase, you are in just the right place!

### Bird's Eye View

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

Waterpark's architecture is heavily modelled with Domain Driven Design. DDD is a strong tool when modelling complex and rich domains.

On the highest level, you can think of Domain Driven Design as encapsulating pure functional business logic in the deepest layer of a system. This way, the business logic, or _domain layer_ does not know anything about the outside world. It has no idea about how to talk to clients via express. Nor does it have a clue on how to talk to databases via ORM. This is great because the domain layer is decoupled from the _routing_ and _persistence_ layers. Decoupling layers gives us two main advantages!

1. Maintainability
1. Testing

#### Maintainability

If we want to rip out express for another http library, we can do so with ease. All we have to do is change the code in our routing layer, without touching _any_ of our important business logic, which is protected in our _domain_ layer. The same thing can be said on the topic of ripping one ORM for the other.

#### Testing

The main thing you want to test is your business logic. The main way to test functionality is with unit tests. On other hand, integration tests ensure that all units work in harmony together. Wouldn't it suck if running unit tests required spinning up expensive infrastructure like express and postgres servers? All we want to do is test the functionality of business logic! That's a lot of time wasted both by the developer when running tests locally and by the CI/CD servers when running tests in our release pipeline.

But, the beautiful thing with DDD is that our business logic is encapsulated in a pure functional layer which only consists of data structures and algorithms. This allows us to run unit tests and verify the correctness of our system (unit-wise) without spinning up _any_ infrastructure.

If the concepts are still hazy at this point don't worry! Things will clear up after reading the next section.

### Code Map

![](https://i.imgur.com/LKRVNIH.png)

The code map will list important files, modules, and types. There will be no direct links in this document however — this is because links often go stale. Instead, use symbol search to find the mentioned entities by name!

#### `modules`

This is the main directory which contains all the server code. The following directories we'll talk about can be found under any module in _this_ directory.

#### `modules/users/infra`

The infra directory is the outside layer of our architecture (the blue in the diagram). This layer is concerned about the application's infrastructure, and how it talk's to the outside world. This is where we have our express routes and `Repositories` that talks to Postgres.

#### `modules/users/application`

The application directory is the middle layer of architecture (the green and red in the diagram). This layer is where the user's `Controller`s and `UseCase`s are. The controller's one and only concern is to "_speak_" HTTP.

It calls `controller.useCase.execute()`, and runs a switch statement based on the use case's response. If the use case is successful, the controller will return a 200 OK with the corresponding data. If the use case has an error, the controller will know which HTTP response code to return to the client. 400s 500s, etc.

The `UseCase` is where the code starts to get interesting. Usually the use case code will involve _loading_ a domain object into memory, doing some manipulation to the object, and then comitting it to persistence with it's `Repository`

#### `modules/users/domain`

The domain directory is the inner layer of the architecture (the yellow in the diagram) and where our precious business logic lives. This layer consists of `Entity`s and `ValueObjects`. Don't get confused between _Domain_ entities and _ORM_ entities.

If there's a domain entity called `User`, and you call `User.create(...)`, _nothing_ happens to the database. _Nothing_ is persisted to postgres. The `.create` is _creating_ a _domain_ object. This can be better thought as simply _loading_ an object into memory with a bunch of business logic loaded into it via data structures and algorithms. In order to actually commit this domain object to persistence, the `UseCase` will need to persist it with a `Repo`.

In the domain, there are `Entity`s and `ValueObject`s. The difference between the two is that _entities_ are identified via id number. Value objects are identified via their data. If two value objects have the same fields, then they are considered _equal_.

#### `modules/users/mappers`

This directory has no direct reference in the architecture diagram and is more of an _implementation_ detail of DDD itself. This code is our translation layer that can translate the representation of objects between different layers: domain, persistence, and DTO (data transfer objects).
