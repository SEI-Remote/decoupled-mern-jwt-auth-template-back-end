# Decoupled MERN Stack with JWT Auth Template - Back End

This is the back end of a decoupled MERN Stack app that includes JWT Authentication.

When combined with the front end found [here](https://github.com/SEI-Remote/decoupled-mern-jwt-auth-template-front-end), you'll have all you need to build a full stack MERN app!

Use this to go build things! 🚀

## To Use This Template

**Replace `<name-of-your-app-here>` in the commands below with the name of your app!**

```bash
git clone https://github.com/SEI-Remote/decoupled-mern-jwt-auth-template-back-end <name-of-your-app-here>-back-end
cd <name-of-your-app-here>-back-end
```

Once you are in the project directory:

```bash
rm -rf .git
```

Here's what your command line output should like after this step (note that the indicator that we are in a git repository is gone!)

<img src="https://i.imgur.com/L47kNOZ.png" alt="The command line before and after running the rm -rf .git command. Before git:(main) is visible indiating that the directory contains a git repository, after the command it is not.">

Re-initialize a git repository:

```bash
git init
```

Use the GitHub CLI to create a new project repository on GitHub:

```bash
gh repo create <name-of-your-app-here>-back-end
```

Run npm i to fetch the template's dependencies:

```bash
npm i
```

touch a .env file:

```bash
touch .env
```

Fill it with the following:

```
DATABASE_URL=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace the `DATABASE_URL` and `SECRET` with values that you provide.

> 🚨 Place secrets in this `.env` file. The contents of this file WILL NOT be exposed to site visitors.

Delete this README.md, then make an initial commit:

```bash
git add .
git commit -m "initial commit"
git push -u origin main
```

You're done!
