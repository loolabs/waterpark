# Architecture

This document describes the high-level architecture of Waterpark. If you want to familiarize yourself
with the codebase, you are just in the right place!

### Bird's Eye View
![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)
Waterpark's architecture is heavily influenced with Domain Driven Design. Learn more about
Loo Labs' motivations on why were using DDD for Waterpark [here]().

On the highest level, you can think of Domain Driven Design as encapsulating pure functional
business logic in deepest layer of the system. This way, the business logic, or *domain layer*
does not know anything about the outside world. It has no idea about how to talk to clients with
express. It also doesn't have a clue of how to talk to databases with our ORM. This is great because
the domain layer is decoupled from the *routing* and *persistence* layers. Decoupling layers gives
us two main advantages.

1. Maintainability
2. Testing

**Maintainabilitiy**
If we want to rip out express for another http library, we can do so with ease. All we have to do
is change the code in our routing layer, without touching *any* of our important business logic
hidden in our *domain* layer. The same thing can be said about swapping out ORMs.

**Testing**
The main thing you want to test is your business logic. The main way to test functionality is with
unit tests. Integration tests ensure that all units work in harmony together. And so, it would
suck if running unit tests would require spinning up an express and postgres server. That's a lot of
time wasted both by the developer when programming and on our CI/CD servers.

But, the beautiful thing with DDD is that our business logic is encapsulated in a pure functional
layer which only consists of data structures and algorithms. This allows us to run unit tests and
verify the correctness of our system (unit-wise) without spinning up *any* infrastructure.

If the concepts are still hazy at this point don't worry! Things will clear up after reading the next
section.

### Code Map
![](https://i.imgur.com/LKRVNIH.png)
The code map will name important files, modules, and types. There will be no direct links in this
document though because links go stale. Use symbol search to find the mentioned entities by name!

#### `modules`
This is the main directory which contains all the server code. The following directories we'll talk
about can be found under any module in *this* directory.

#### `modules/moduleX/infra`
The infra directory is the outside layer of the architecture (the blue in the diagram). This layer is concerned about the
application's infrastructure, and how it talk's to the outside world. This is where we have our
express routes and *Repositories* that talks to Postgres.


### `modules/moduleX/application`
The application directory is the middle layer of architecture (the green and red in the diagram). This layer
is where moduleX's *Controllers* and *Use cases* are. The controller's know how to *speak* HTTP.
It calls `controller.useCase.execute()`, and switches based on the use case's response. If the use
case is successful, the controller will return a 200 OK with the corresponding data. If the use
case has an error, the controller will know which HTTP response code to return to the client. 400s
500s, etc.

The `UseCase` is where the code starts to get interesting. Usually the use case code will be
*loading* a domain object into memory, doing some manipulation to the object, and then comitting
it to persistence with it's `Repository`

### `modules/moduleX/domain`
The domain directory is the inner layer of the architecture (the yellow in the diagram). This layer
consists of *entities* and *value objects*. Don't get confused by the *domain* entities and *orm*
entities. Creating a *domain* entity is simply *loading* an object into memory with a bunch of
business logic loaded into it via data structures and algorithms. In order to actually commit
this domain object, the *use case* will need to persist it with a *repo*.

In the domain, there are *entities* and *value objects*. The difference between the two is that
*entities* are identified via id number. Value objects are identified via their data. If two value
objects have the same fields, then they are considered *equal*.

### `modules/moduleX/mappers`
This directory has no reference in the diagram. This code is our translation layer that can translate
the representation of objects between domain, persistence, and DTO (data transfer objects).
