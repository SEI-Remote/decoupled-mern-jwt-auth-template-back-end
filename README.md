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

### Auth has been configured!  Let's take a look at our existing code and see what we're starting with.
#### (Your instructor will open the app and show each of the files, routes, and controller functions on the starter code.)
### The app won't work without a .env file, because it will contain the following items:
```
DATABASE_URL=XXXXXXXXXXXX
GOOGLE_CLIENT_ID=XXXXXXXXX
GOOGLE_SECRET=XXXXXXXXXXX
GOOGLE_CALLBACK=http://localhost:3000/auth/google/oauth2callback
SESSION_SECRET=XXXXXXXXXXX
```
- We'll use a single DATABASE_URL so that we can all add/remove data from the database as we move forward.
- The GOOGLE_CLIENT_ID and GOOGLE_SECRET values are already set up as well.  If you wanted to hook this application up to your own personal app, you can generate new values in your Google Developer Console.  (Make sure to add the callback URI as well!)
- The SESSION_SECRET can be set to anything you'd like.
#### (Your instructor will share the contents of the .env with you in Slack right now.)
#
### Directories for partial views have been included.  The header contains a navbar, which we'll be adding to as we develop the application.  Check out the conditional rendering that's been set up to show different options based on whether there's a user logged in or not!  (Also, checkout the sweet goose noise when you click on the goose.)
# 
___

# Plan of attack:

#### You can find a deployed version of the final version of the app we're building [here](https://gamegoose.herokuapp.com/).  Check it out if you're not already familiar with the functionality we'll need to code out.
# 
#### Before we start building anything, we need to plan a few things out beforehand.  Just as you will in your projects, we're going to start by creating an ERD (Entity Relationship Diagram).  When you're building out an ERD, you'll occasionaly have fields that either don't end up in your final product, or get added along the way.  **Thinking about how your models are related to one another will significantly cut down on issues you'll run into when you start writing code.**
#
### Let's spend a few minutes discussing the following ERD:
## 
![ERD](https://i.imgur.com/e18W2sB.png)

### Now that we have a good idea of what our models look like and what relationships they'll have with one another, we can plan out the steps we'll need to take to build everything out.
##
# 
___
## Many Users >--< Many Stories!

- <s>AAU, I should be able to log in using Google Oauth</s>
- <s>AAU, I should be able to log in and out via the navbar</s>
- <s>AAU, I should only see links in the navbar if I’m logged in</s>
- AAU, I should be able to navigate between views using a navbar
- AAU, I should be able to search for a game using an API
- AAU, I should be able to view the details for the search results
- AAU, I should be able to view specific game information by selecting from the search results
- AAU, I should be able to add/remove a game to/from my collection
- AAU, I should be able to add/remove a game to/from my watch list
- AAU, I should be able to view my game collection
- AAU, I should be able to select a game from my collection and see its details
- AAU, I should be able to see a list of all users
- AAU, I should be able to select a user and see their profile / games / friends
- AAU, I should be able to ‘Friend/Un-Friend’ a user
- AAU, I should see a list of friends and the games I’m watching on my profile page
- AAU, I should be able to update certain information (my bio, avatar, and alias)
- AAU, I should be able to review a game if it is in my collection
- AAU, I should see a list of reviews for any game on it’s details page (with an average rating)
- AAU, I should be able to post a message on a ‘Message Board’
- AAU, I should be able to view the details of any ‘Message Board’ post
- AAU, I should see a list of replies on the ‘Message Details’ view, and be able to post a reply
- AAU, I should be able to join the ‘Chat Room’
- AAU, I should see all other current members in the ‘Chat Room’
- AAU, I should be able to post/view real-time messages to/from the chat screen
# 
## Roadmap:
### 1. <s>Create the express app</s>
### 2. <s>Implement authentication</s>
### 3. <s>Implement authorization</s>
### 4. <s>Index view for users</s>
### 5. 'Profile' view for users
  - Determine the method verb & route
  - Write the UI
  - Write the route
  - Write the controller function
  - Write the view
### 6. Update functionality for Profile info
  - Determine the method verb & route
  - Write the UI
  - Write the route
  - Write the controller function
  - Write the view
### 7. 'User show' view
### 8. Add friend functionality
### 9. Add friend info to 'Profile' view
### 10. 'Add game' view
### 11. API call implementation
### 12. 'Game detail' view
### 13. 'Watchlist' functionality
### 14. 'Add to collection' functionality
### 15. 'Reviews' functionality
### 16. 'Game collection' view
### 17. 'Message Board' functionality
### 18. 'Reply' functionality
### 19. Implement real-time chat functionality

### Phew...  We've got a lot to get done!

___

## 'Profile' View:
#
### For the first few steps, I'll write out the steps for the 5-step cycle.  From there on, we'll be in a rhythm!!!

#### Step 1: Determine the method verb & route:

```
GET /users/profile
```
#
#### Step 2:  Write the UI.  Let's go write that route into our navbar in header.ejs:
```html
<li class="nav-item">
  <!-- Add the route to the href we have waiting to go! -->
  <a class="nav-link" href="/users/profile">My Profile</a>
</li>
```
# 
#### Step 3:  Write the route.  We already have a users router, so let's go add our new route:
```js
router.get('/profile', isLoggedIn, usersCtrl.showProfile);
```
#### Step 4:  Write the controller function:
```js
function showProfile(req, res) {
  // Let's talk about why we're using User.findById.
  // Ordinarily, you won't see this, as we have access
  // to the user via req.user.  Because we're going to 
  // use .populate later on to find "friends," we're 
  // going to stub it up like this in advance.
  User.findById(req.user._id)
    .then((user) => {
      res.render("users/profile", { title: "Profile Page", user });
    });
}
```
#### Step 5:  Write the view (There are several items we'll put in placeholders for now, then fill in functionality later.  In the course of normal app development, you'll be adding these things as you code them, but this will minimize our refactoring and bouncing all over the place later down the road.  You're welcome.):
```html
<%- include('../partials/header') %>

<h3><%= title %></h3>

<div class="card" style="width: 36rem;">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="profileinfo-tab" data-toggle="tab" href="#profileinfo" role="tab" aria-controls="profileinfo" aria-selected="true">My Info</a>
      </li>
      <!-- This is the info for the 'update' tab -->
      <li class="nav-item">
        <a class="nav-link" id="updateinfo-tab" data-toggle="tab" href="#updateinfo" role="tab" aria-controls="updateinfo" aria-selected="false">Update Info</a>
      </li>
      <!-- This is the info for the 'friends' tab -->
      <li class="nav-item">
        <a class="nav-link" id="friends-tab" data-toggle="tab" href="#friends" role="tab" aria-controls="friends" aria-selected="false">Friends</a>
      </li>
      <!-- This is the info for the 'watchlist' tab -->
      <li class="nav-item">
        <a class="nav-link" id="watchlist-tab" data-toggle="tab" href="#watchlist" role="tab" aria-controls="watchlist" aria-selected="false">Watch List</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="profileinfo" role="tabpanel" aria-labelledby="profileinfo-tab">
        <div class="card-body">
          <h5 class="card-title">Name: <%= user.name %></h5>
          <p class="card-text">Alias: <%= user.alias %></p>
          <p class="card-text">Email: <%= user.email %></p>
          <p class="card-text">Bio: <%= user.bio %></p>
        </div>
      </div>
      <!-- This is the card for the 'update' tab -->
      <div class="tab-pane fade" id="updateinfo" role="tabpanel" aria-labelledby="updateinfo-tab">
        <div class="card-body">
            <!-- This is where we'll put our 'update' route -->
            <form action="" method="POST">
                <div class="form-row">
                    <div class="col-md-4">
                        <label for="userAlias">Alias:</label>
                        <input type="text" id="userAlias" class="form-control" name="alias" value="<%= user.alias %>">
                    </div><br>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="avatarUrl">Avatar Image URL:</label>
                    <input type="text" id="avatarUrl" class="form-control" name="avatar" value="<%= user.avatar %>">
                  </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12">
                        <label for="bio">Bio:</label>
                    <textarea rows="3" id="bio" class="form-control" name="bio"><%= user.bio %></textarea>
                  </div>
                </div>
                <button type="submit" class="btn btn-warning">Update</button>
              </form>
        </div>
      </div>
      <!-- This is the card for the 'friends' tab -->
      <div class="tab-pane fade" id="friends" role="tabpanel" aria-labelledby="friends-tab">
        <div class="card-body">
        <!-- This is where we'll use a forEach to display friends -->     
        </div>
      </div>
      <!-- This is the card for the 'watchlist' tab -->
      <div class="tab-pane fade show" id="watchlist" role="tabpanel" aria-labelledby="watchlist-tab">
        <div class="card-body">
        <!-- This is where we'll use a forEach to display watchlist items -->
        </div>
      </div>
    </div>
</div>

<%- include('../partials/footer') %>
```
# 
### Cross off an item on the list!  On to the next piece of functionality:
## 
### 'Update' functionality for Profile info:
#
#### Step 1:  Determine the method verb & route:
#### (Why don't we need the ._id of the user in our request?)
```
PUT /users/profile
```
#### Step 2:  Write the UI.  We already have everything stubbed up, we just need to pop a route into that href in the profile card!:
```html
<!-- This is where we'll put our 'update' route -->
<form action="/users/profile?_method=PUT" method="POST">
```
#### Step 3:  Write the route:
```js
router.put("/profile", isLoggedIn, usersCtrl.update);
```
#### Step 4:  Write the controller function:
```js
function update(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true }).then(() => {
    res.redirect("/users/profile");
  });
}
```
####  Step 5:  We already handled the view.  This one's done already!!!
## 
### Now that we've been through the 5-step process a few times, these instructions aren't going to explicitly number them every time.  
##
### Let's code the user 'show' page next:
##
#### We already have a link using the user's ._id on our index page.  Let's go write the route!:
```js
router.get("/:id", isLoggedIn, usersCtrl.show);
```
#### Then on to the controller function:
```js
function show(req, res) {
  User.findById(req.params.id).then((userInfo) => {
    res.render('users/show', {
      title: 'User Details',
      userInfo,
      user: req.user
    })
  });
}
```
#### Next, we'll need to create /views/users/show.ejs:
```html
<%- include('../partials/header') %>

<h3><%= title %></h3>

<div class="card" style="width: 18rem;">
  <!-- If our user doesn't have an avatar image, let's use a silly cat picture! -->
  <img id="avatarPhoto" style="height: 18rem;" class="card-img-top" src="<%= userInfo.avatar ? userInfo.avatar : 'http://theoldreader.com/kittens/300/300/'  %>" alt="Card image cap">
  <div class="card-header">
  </div>
  <div class="card-body">
    <h5 class="card-title"><%= userInfo.name %></h5>
    <!-- Let's clean up the date data to show the day the user joined -->
    <p class="card-text">Joined: <%= userInfo.createdAt.toLocaleString().split(',')[0] %></p>
    <p class="card-text">Email: <a href="mailto:<%= userInfo.email %>"><%= userInfo.email %></a></p>
    <p class="card-text">Favorite Games:</p>
    <!-- This is where we'll iterate over the games with a forEach -->
    <!-- This is where we'll render buttons to add/remove a user as a friend -->
  </div>
</div>

<%- include('../partials/footer') %>
```
#### That's a pretty sweet looking user profile.  (Not really, the styling is up to y'all on your own time...)
##
### Now that we can see each user's details, let's go all Facebook and implement a simple 'friend' feature.
##
#### Start by adding a 'friends' field to the user model.  We're going to use referencing.  Many users will have many friends, so we're going to store each user's 'friends' as ObjectId values in an array:
```js
const userSchema = new Schema(
  {
    name: String,
    alias: String,
    email: String,
    avatar: String,
    googleId: String,
    bio: String,
    // Add this to the model:
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
```
#### Now we'll need a button on the user 'show' page to handle a request for 'adding' a friend.  We don't need to send a data payload, as we have access to the ._id for the user we're 'friend'ing, and we always have access to the ._id for the user that's logged in!:
```html
<!-- This is where we'll render buttons to add/remove a user as a friend -->
<% if (!userInfo._id.equals(user._id) && !user.friends.includes(userInfo._id)) { %>
  <a href="/users/<%= userInfo._id %>/friend" class="btn btn-primary">Add Friend</a>
<% } %>
<% if (!userInfo._id.equals(user._id) && user.friends.includes(userInfo._id)) { %>
  <a href="/users/<%= userInfo._id %>/unfriend" class="btn btn-primary">Remove Friend</a>
<% } %>
```
#### We're adding routes for both adding AND removing friends.  Two geese with one stone!  Let's use route/controller names that indicate what we're trying to accomplish, as it's not in the normal scope of our chart:
```js
router.get("/:id/friend", isLoggedIn, usersCtrl.addFriend);
router.get("/:id/unfriend", isLoggedIn, usersCtrl.removeFriend);
```
#### And now for the controller functions:
```js
function addFriend(req, res) {
  req.user.friends.push(req.params.id);
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`);
  });
}

function removeFriend(req, res) {
  let idx = req.user.friends.indexOf(req.params.id);
  req.user.friends.splice(idx, 1);
  req.user.save().then(() => {
    res.redirect(`/users/${req.params.id}`);
  });
}
```
#### Navigate to someone special in the user list and add them to your friend list!  Notice how the button changes based on whether the ._id of the user who you're viewing is in the logged in user's referenced friends array!
## 
#### We're adding friends, but for them to show up on our user profile view, we'll need to go update our controller function for 'showProfile' as we're now requiring the 'friends' field to be passed to the view.  It's time to use .populate()!!!!
```js
function showProfile(req, res) {
User.findById(req.user._id)
  // Populate is SO HOT right now...
  .populate("friends")
  .then((user) => {
    res.render("users/profile", { title: "Profile Page", user });
  });
}
```
#### Now that we have our friends, let's go adjust the user profile view:
```html
<!-- This is where we'll use a forEach to display friends --> 
<% user.friends.forEach(f => { %>
  <a href="/users/<%= f._id %>"><img width="30" id="avatarPhoto" src="<%= f.avatar %>" alt=""><%= f.name %> <%= f.alias ? `(${f.alias})` : '' %></a><br><br>
<% }) %>
```
#### (Notice that we're displaying the alias of the friend if they have one saved!)
##
### Our user feature-set is looking pretty solid, so let's start working on the game features!
___
### Adding games:
##
#### In order for the user to add a game, they'll need to first search for it using an API.  Let's take a detour and go check out [the API](https://medium.com/rawg/launching-public-api-for-the-largest-video-game-database-in-the-world-fa260a336079) that we'll be using for this app.  Let's try out some of the endpoints using Postman and see what the data looks like when it is returned.
##
#### Now that we've got a picture of our data, we can write our model.  While we're at it, let's add the router, routes, and controller for the games resource:
```js
// /models/game.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    reviewer: String,
    reviewerPhoto: String,
    rating: { type: Number, min: 1, max: 10 },
    content: String,
  },
  {
    timestamps: true,
  }
);

const gameSchema = new Schema(
  {
    title: String,
    slug: String,
    rawgId: Number,
    released: Date,
    imageUrl: String,
    videoUrl: String,
    metacriticScore: Number,
    favoritedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
```
```js
// server.js
const gamesRouter = require("./routes/games");
.
. // middleware is all here
.
app.use("/games", gamesRouter);
```
```js
// /routes/games.js
const router = require("express").Router();
const gamesCtrl = require("../controllers/games");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
```
```js
// /controllers/games.js
const Game = require('../models/game.js');

module.exports = {

}
```
#### Let's start with a view containing a form for the user to submit a search to the API.  We have a placeholder set up in the navbar, so let's go fill in a route:
```html
<li class="nav-item">
  <!-- Add the route here -->
  <a class="nav-link" href="/games/new">Add Game</a>
</li>
```
#### Then on to the route:
```js
router.get("/new", isLoggedIn, gamesCtrl.new);
```
#### Then the controller function:
```js
// Start by requiring axios at the top of the file. 
// We'll be using axios to send calls to the API.
const axios = require("axios");

module.exports = {
  new: newGame
}

function newGame(req, res) {
  res.render("games/new", {
    title: "Game Search",
    user: req.user,
    // Why are we passing this?  Take a look at the view we're about to write!
    results: null,
  });
}
```
#### Let's create /games/new.ejs:
```html
<%- include('../partials/header') %>

<h3><%= title %></h3>
<!-- We'll need to fill in the route for this search form -->
<form action="" method="POST">
  <div class="form-row">
    <div class="col-md-4">
      <input type="text" class="form-control" name="query" placeholder="Search for game...">
    </div>
  </div>
  <button type="submit" class="btn btn-success">Search</button>
</form>
<!-- This is where we'll output the results to the page -->
<!-- after they are returned from the API call! -->
<% if (results) { %>
  <% results.forEach(game => { %>
    <div class="card" style="width: 18rem;">
      <img src="<%= game.background_image %>" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"><%= game.name %> </h5>
        <p class="card-text">Released: <%= game.released %></p>
        <p>Platforms:</p>
        <% game.platforms.forEach(p => { %>
          <p class="card-text"><%= p.platform.name %></p>
        <% }) %>
        <p class="card-text">Metacritic Score: <%= game.metacritic ? game.metacritic : 'N/A' %></p>
        <!-- This is a button that we'll use to navigate to the game's 'show' page.  We still need to fill in the route -->
        <a href="" class="btn btn-primary">Details</a>
      </div>
    </div>
  <% }) %>
<% } %> 

<%- include('../partials/footer') %>
```
#### We've got our form, let's make it do something!  Add a route to the form so that we're submitting a post request with the search info:
```html
<!-- This is the route we're filling in -->
<form action="/games/search" method="POST">
```
#### Then we write the route:
```js
router.post("/search", isLoggedIn, gamesCtrl.search);
```
#### Then the controller function:
```js
function search(req, res) {
  axios
    .get(`https://api.rawg.io/api/games?page_size=5&search=${req.body.query}`)
    .then((response) => {
      console.log(response.data.results);
      res.render("games/new", {
        title: "Game Search",
        user: req.user,
        results: response.data.results,
      });
    });
}
```
#### Let's play around with this function using some console.logs before proceeding to make sure we're getting our data back!
#### Notice how we're rendering the same 'new' search page, but this time we're passing our bountiful data to be displayed all pretty-like for all to see!
## 
### Let's add a route to the "details" button so we can navigate to a 'show' page for the game.  Here, we'll have access to more information about the game, potentially a video, and can show who has it in their collection, along with any reviews it has been given.
```html
<!-- This is a button that we'll use to navigate to the game's 'show' page.  We still need to fill in the route -->
<a href="/games/<%= game.slug %>" class="btn btn-primary">Details</a>
```
#### Then we write the route:
```js
router.get("/:slug", isLoggedIn, gamesCtrl.show);
```
#### Then the controller function:
```js
function show(req, res) {
  axios
    .get(`https://api.rawg.io/api/games/${req.params.slug}`)
    .then((response) => {
      Game.findOne({ slug: response.data.slug })
        .populate("favoritedBy")
        .then((game) => {
          if (game) {
            res.render("games/show", {
              title: "Game Details",
              user: req.user,
              game: response.data,
              gameId: game._id,
            });
          } else {
            // Is this really necessary?
            res.render("games/show", {
              title: "Game Details",
              user: req.user,
              game: response.data,
            });
          }
        });
    });
}

```
#### Now we're checking out games!

# More tomorrow:
### 13. 'Watchlist' functionality
### 14. 'Add to collection' functionality
### 15. 'Reviews' functionality
### 16. 'Game collection' view
### 17. 'Message Board' functionality
### 18. 'Reply' functionality
### 19. Implement real-time chat functionality


