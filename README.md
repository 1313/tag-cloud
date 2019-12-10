# Twitter Word Cloud

## Introduction

This is a simple example of a real time word cloud generator that uses twitter's
streaming api to stream and calculate word frequencies. Those are then displayed in
a simple web app.

### Techologies

| Name                                                                          | Usage                                                                                                  |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [ReactJS](https://reactjs.org)                                                | UI Render framework. I decided to rely on hooks for state and side-effect management.                  |
| [useProfunctorState](https://github.com/staltz/use-profunctor-state)          | State management based on profunctors. A more intrinsic and integrated way of managing state in react. |
| [RxJS](https://rxjs-dev.firebaseapp.com)                                      | Used to stream and apply streaming operators on tweets and to maintain websocket connections.          |
| [Typescript](https://www.typescriptlang.org)                                  | For better type safety and modern es features                                                          |
| [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) | Communication layer between client and server                                                          |
| [Jest](https://jestjs.io/)                                                    | Testing framework for client and server. Not that many tests written due to time constaints.           |
| [NodeJS](https://nodejs.org)                                                  | Runs the server side code                                                                              |
| [Parcel](https://parceljs.org)                                                | For bundling the client part with zero configuration                                                   |
| [Yarn](https://yarnpkg.com)                                                   | Enables workspaces support for monorepo style                                                          |
| [Docker](https://docs.docker.com)                                             | To build and generate containers for both server and client                                            |

### Development

1. Clone the repository: `git clone https://github.com/1313/tag-cloud`
2. Edit `env.local` and enter your twitter api credentials.
3. Inside the repository folder, run `yarn`. This will install all packages and link `./common` into `./client`, and `./server` modules.
4. Run `yarn start` to start the development servers.
5. Open `http://localhost:1234` in chrome or similar browser.

### Building and running as in production

1. Clone the repository: `git clone https://github.com/1313/tag-cloud`
2. Edit `docker-compose.yml` and enter your twitter api credentials.
3. Inside the repository folder, run `yarn build`. This will use docker-compose to build the application.
4. Run `docker-compose up` to simulate running in production
5. Open `http://localhost:4321` in chrome or similar browser.

### Client architecture

Code inside `./client` is divided as following:

```
./client/src/
├── App.tsx      # Root component that creates and lays out the UI
├── index.css    # Single css file that contains all styles
├── components/  # Contains ReactJS components
├── hooks/       # React hooks, most are used to wire up observables with profunctors.
├── observables/ # Observables that all pipe a single websocketSubject$
├── services/    # Code that is used in general by hooks, components and observables.
├── types/       # Any type definitions related only to client.
└── utils/       # Utility pure functions
```

> `./client` also contains some files created by `create-react-app`.

#### CSS and Styles

I've decided to not use any preprocessor or cssinjs framworks. I instead wanted to rely on the cascade to setup base styles and then add "exceptions" to those rules. That ended up giving me a "utility" like css with lots of smaller classes without any app context.
Some classes were added for specifics though.

Instead of having many custom `button` components, its better to just use `<button>` and style that accordingly.

I'm revisiting CSS at the moment and have used some ideas from: [Every Layout](https://every-layout.dev).

#### ProfunctorState

This is small library that enables you to use profuctors for statemanagement.
A profunctor is a concept taken from category theory and has a lot of dept and
can be a bit tricky to grasp from first principles.
But basically they work as composable two way state selectors.

So if you are used to [reselect](https://github.com/reduxjs/reselect) its basically the same
but allows for sending state changes backwards.

If you want to know more, read the [readme](https://github.com/staltz/use-profunctor-state) or watch [this](https://www.youtube.com/watch?v=VdiJ_vgVUgs) talk.

### Server architecture

Code inside `./server` is divided as following:

```
./server/src/
├── index.ts                 # Responsible for starting the server
├── server.ts                # Wrapper around the ws server module. Takes care of message broking.
├── websocket-controller.ts  # Handles each message type and manages communication with clients.
├── tweet-stream.ts          # Subject that wraps a twitter stream request into a stream of tweets.
└── operators/               # Composed RxJS operators for the word frequency logic
```

### Common

Contains code (mainly type definitions) shared by both client and server.

### Contact

Please let me know if you need any help running this.
Create an issue or contact me on mail@perjohansson.net.
