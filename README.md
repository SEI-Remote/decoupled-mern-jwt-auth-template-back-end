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
GOOGLE_CALLBACK=http://localhost:3000/auth/oauth2callback
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
![ERD](https://raw.git.generalassemb.ly/SEI-R/SEI-R-1/master/work/w05/d2/ad06f8fb-fac4-49c8-9be6-654524d08a7c.png?token=AAAFJC7K6WZPCYRMUOA3A7S7JVEXU)

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



