# My Personal Website

The live site is [michaelporter.dev](michaelporter.dev)

If you want to run this locally, clone the repo and run `npm install` both in the project root and in the client directoy.

You will need a working PostgreSQL install.

In the project root (alongside server.js) create a file named `config.json` and make it look something like the following:

```json
{
    "PG_USER": "my_app",
    "PG_HOST": "localhost",
    "PG_DATABASE": "personal_website",
    "PG_PASSWORD": "password",
    "PG_PORT": "5432",
    "JWT_SECRET": "thisisasecret"
}
```

Just replace all the values with yours. Don't commit this to version control. The PG_ stuff is for Postgres and the JWT_SECRET is for the user sign in stuff. You can run the createUser.js script to create a user who can write blog posts and upload images.

The boilerplate code is originally from here: "https://github.com/esausilva/example-create-react-app-express.git"

---
# The original README from the boilerplate is below
---

# create-react-app React Project with Node Express Backend

> Example on using create-react-app with a Node Express Backend

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
yarn
cd client
yarn
```

To start the server and client at the same time (from the root of the project)

```
yarn dev
```

Running the production build on localhost. This will create a production build, then Node will serve the app on http://localhost:5000

```
NODE_ENV=production yarn dev:server
```

## How this works

The key to use an Express backend with a project created with `create-react-app` is on using a **proxy**. We have a _proxy_ entry in `client/package.json`

```
"proxy": "http://localhost:5000/"
```

This tells Webpack development server to proxy our API requests to our API server, given that our Express server is running on **localhost:5000**

## Tutorial

Visit my [blog post](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0) entry for a detailed step-by-step guide.

[Deployed app](https://cra-express.herokuapp.com/)

## Giving Back

If you would like to support my work and the time I put in making tutorials, you can click the image below to get me a coffee. I would really appreciate it (but is not required).

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/esausilva)

-Esau
