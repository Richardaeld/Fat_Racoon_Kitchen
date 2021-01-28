# Fat Racoon Kitchen - Introduction
The Fat Racoon Kitchen is devoted to helping home cooks provide better meals to friends, family, and/or yourself. We provide a network of user uploaded 
recipies that can be searched through with our "Ingredience on Hand" or "Garbage" search, which is a favorite for our chefs. We stoutly believe that even 
without the ideal ingredience on hand, a little taste pairing or extra spice can help make any meal provide a savory experience. Our end goal is to 
help home chefs make the jump from recipe depentent to taste depentent. Our chefs know the importance of making the best out of what we have on hand 
and want to share that liberating experience with other home chefs.

The two chefs of the Fat Racoon Kitchen started as sleep deprived, nocturnal home chefs that would use the "garbage", leftovers, or that one thing 
that has to be eatten today (Weve all done it) to make a meal. With practice and study these meals improved over time but it started with learning 
fundamental cooking practices and taste pairings. We want to help others wisely spend their kitchen time making the best meals they can. We offer 
conventional cooking practice and recipe guidance to help them along the way. The Fat Racoon Kitchen believes that helping to establish a community 
of home cooks and their recipies in an intuitive search engine will be a boon to home chefs everywhere. It helps newer chefs see that not every 
recipe has to be complicated or convoluted.

We offer home cooking fundamentals along with a search engine where you can list all of your "garbage"(ingredience on hand) and see if we have a 
recipe that contains all that you have. If not we have a *star* search where you can look for a recipe that takes the star component of your meal 
into account and renders a search result based on that. 

For our home cooks that submit recipes, we even offer a place to put in a recipes background or history. Cooking has more meaning that just preparing 
food. For many it is a connection to your history or life experience.  We encourage our users to give us a little history on the recipes they submit. 
Let us help preserve the history of a recipe. Its important to us and to those that submitted it. From a family recipe to this is all I could afford 
in college, let us know!

# UX

## Goals
### User Goals
- I want to find a recipe for dinner.
- I want to use my cell phone to look up a recipe.
- I want a pasta dish Ive never tried before.
- I want a place to leave a recipe I can easiy find.
- I want a well rated recipe.
- I dont know what I want for dinner.
- My significant other wants a new chicken dish for dinner.
- *consider* having a form for users to commit on others recipies. This could ustablish a sense of cooking community.

### Developer Goals
- I want to showcase my python abilities.
    - Datetime (python)
    - Flask (flash, render_template, redirect, request, session, url_for)
    - Jinja (Templates)
    - Python Day Time 
    - Pymongo (Flask - mongo DB)
    - 

- I want to showcase my DB abilites.
    - Mongo DB
    - Pymongo (Flask - mongo DB)
    - 

## Client Stories and Experience Provided
### Client Stories

### Experience Provided
- A meal star carousel on the front page (cycles through meal stars, proetin, bread, pasta, ...).
- Be able to look up recipies by meal(brakefast, lunch, ...) or star type (protein, bread, pasta, ...).
- Have a random, "recipe of the day" (more likely a random recipe).
- Recipies can be favorited by users to allow them to quickly and easily find them.
- Create a form to allow others to commit on recipies to establish a sense of community and fellowship.
- Allow users to submit their own recipies to be rated and used by others.
- Make site fully responsive.
- Have a search bar for to find recipe name (or maybe use it to search ingredience?) .
- Use a rating system for dishes - [[*star amount*, *users rated this count*], [*star amount*, *users rated this count*], ...] - using this frame a 5 star rating system could be build. Take the total number of ratings and average them together for overall rating  

# Design Choices
## Base Jinja (Python) Template

## Content Blocks
### Template 1
#### Index

### Template 2
#### About Us

### Template 3
#### Sign in
#### Register
#### Update User Profile
- Modal Pop up
    - allows DB to be updated one item at a time to prevent user error (Could be replaced with a "Save changed" button on the update user profile page) 
#### Create Recipe


## Page Performance

## Wireframe and Live Demo
### Wireframe

### Live Demo

## Scalability

# Technology Languages
+ HTML - Skeleton frame of the application.
+ CSS - Beautifies the skeleton (HTML).
+ JavaScript - Allows for dynamic content on the application.
+ Python - Allows back end programs to run. These programs are:
    + Flask - Allows use of Templating, security, user searching, and other critical functions.
    + Pymongo - Allows flask (python) to communicate with Mongo DB.
    + Werkzeug - Encrypts data as it is sent between the user and server.
    + Datetime - Allows python to take a date/time stamp.
+ Mongo DB - Database that application communicates with and stores information on.

# Testing
## Developer Testing Specifications
### Developer Tested Systems

### Developer Testing Methods

## Developer Tests

## Program Tests
### BrowserStack

### Lighthouse

### JigSaw

### W3C Validator

### JSHint

# Bugs and Other Problems
## Previous Bugs

## Current Bugs

## Other Problems

# Clone and Deployment Information
## Deploy Clone from GitHub

## GitHub Deployment

# Tools and Credits
## Tools

## Credits
### Code Citations

### References and Ideas

# Acknowledgements