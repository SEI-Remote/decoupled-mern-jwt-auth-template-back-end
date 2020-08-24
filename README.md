# GameGoose Code-along
## 

## Setup Instructions:
___
### Navigate to your code directory and clone the codealong repo:
```
cd code
git clone https://git.generalassemb.ly/SEI-R/gamegoose.git
```
### Navigate into the directory and add an upstream so that you're able to pull code if you fall behind, or encounter errors from typos:
```
cd gamegoose
git remote add upstream https://git.generalassemb.ly/SEI-R/gamegoose.git
``` 
### As a reminder, the commands to pull the most recent version of the code from the repo, (and overwriting your current code) are:
```
git fetch --all
git reset --hard origin/main
```
___
## Starter code:
#### Items of note:
- Google OAuth is configured
- passport is configured
- database connection is configured
- partial views included
- the following packages have been added:
  - express-session
  - passport
  - mongoose
  - method-override
  - dotenv
  - passport-google-oauth

### Auth has been configured!  Let's take a look at our existing routes and see what we're starting with.
#### (Your instructor will open the app and show each of the files, routes, and controller functions on the starter code.)
### The app won't work without a .env file, because it will contain the following items:
```
DATABASE_URL=XXXXXXXXXXXX
GOOGLE_CLIENT_ID=XXXXXXXXX
GOOGLE_SECRET=XXXXXXXXXXX
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback
SESSION_SECRET=XXXXXXXXXXX
```
- We'll use a single DATABASE_URL so that we can all add/remove data from the database as we move forward.
- The GOOGLE_CLIENT_ID and GOOGLE_SECRET values are already set up as well.  If you wanted to hook this application up to your own personal app, you can generate new values in your Google Developer Console.  (Make sure to add the callback URI as well!)
- The SESSION_SECRET can be set to anything you'd like.
#### (Your instructor will share the contents of the .env with you in Slack right now.)
#
### Directories for partial views have been included.  The header contains a navbar, which we'll be adding to as we develop the application.  Check out the conditional rendering that's been set up to show different options based on whether there's a user logged in or not!  (Also, checkout the sweet goose noise when you click on the goose.)


