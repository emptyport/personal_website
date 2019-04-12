# My Personal Website

The live site is [michaelporter.dev](michaelporter.dev)

If you want to run this locally, clone the repo and run `npm run dev`. Everything should work fine.

You will need a working PostgreSQL install and Jekyll (Ruby).

In the project root (alongside server.js) create a file named `config.json` and make it look something like the following:

```json
{
    "PG_USER": "my_app",
    "PG_HOST": "localhost",
    "PG_DATABASE": "personal_website",
    "PG_PASSWORD": "password",
    "PG_PORT": "5432",
    "EM_USERNAME": "<gmail address for nodemailer>",
    "EM_PASSWORD": "<gmail password for nodemailer>",
    "EMAIL": "<email address where you would like new contact queries to be sent>"}
```

Just replace all the values with yours. Don't commit this to version control. The PG_ stuff is for Postgres.