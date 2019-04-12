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