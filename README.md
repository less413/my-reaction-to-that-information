# my forum frontend

The frontend of a simple online web forum, written in TypeScript, using [React](https://react.dev/), [Material UI](https://mui.com/material-ui/), and [Axios](https://axios-http.com/).


## Requirements

To run the app, you will need:
- [Yarn](https://yarnpkg.com/)


## Setup

### Installing dependencies
- Run `yarn install` in bash.

### Configuring the API caller
By default, this client will call the server at http://localhost:8000.

To change this,
1. Open `src/api/caller.ts`.
2. Change the `BASE_URL` constant to the URL of the backend server.

### Running the app
1. Run `yarn start` in bash.
2. The home page should automatically open in your browser. You may also open it by yourself at http://localhost:3000.


## Notes
This project is part of my (Jaydon) submission for the CVWO Winter Assignment 25/26, and was forked from their [sample React app](https://github.com/CVWO/sample-react-app).

### AI Usage Declaration
I used chatgpt to
- search for `sx` prop keys (which applies styles to individual elements)
- learn about React Contexts
- get some suggestions on code organization
