# Fat Racoon Kitchen - Introduction
The Fat Racoon Kitchen is devoted to helping home cooks provide better meals to friends, family, and/or yourself. We provide a network of user uploaded 
recipies that can be searched through with our "Ingredience on Hand" or "Garbage" search, which is a favorite for our chefs. We stoutly believe that even 
without the ideal ingredience on hand, a little taste pairing or extra spice can help make any meal provide a savory experience. Our end goal is to 
help home chefs make the jump from recipe depentent to taste depentent. Our chefs know the importance of making the best out of what we have on hand 
and want to share that liberating experience with other home chefs.

The chefs of the Fat Racoon Kitchen started as sleep deprived, nocturnal home chefs that would use the "garbage", leftovers, or that one thing 
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
- *theme* homecooking *southern home style*

### Developer Goals
- I want to showcase my python abilities.
    - Datetime (python)
    - Flask (flash, render_template, redirect, request, session, url_for)
    - Jinja (Templates)
    - Python Day Time 
    - Pymongo (Flask - mongo DB)

- I want to showcase my DB abilites.
    - Mongo DB
    - Pymongo (Flask - mongo DB)

- I want to showcase my artistic diversity
    - css art
    - svg art

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
- 

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
-- jagged edges after using a transform-rotate fixed by using a recommended line of code -webkit-backface-visibility:hidden -- reccomdation found here https://stackoverflow.com/questions/6492027/css-transform-jagged-edges-in-chrome
    -- for napkins edge

--have a triangle shapped container to hold a repeating linear gradient.  Found solution at MDN using a clip-path:polygon https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path 

--Procfile was missing a space after colon
## Current Bugs

## Other Problems

# Deployment
## Setup structure on GitPod (developer only)
### Flask
+ install Flask
    + in bash type "pip3 install Flask"
+ python file structure
    + create "*name*.py" file in root 
    + create "env.py" file in root
        + Add "env.py" to "gitignore" list (NEVER PUSH THIS FILE)
        + Add "__pycache__/" to "gitignore" list (NEVER PUSH THIS FILE)

### PyMongo
+ install PyMongo
    + in bash type "pip3 install flask-pymongo"
    + in bash type "pip3 install dnspython"

## Deploy Clone from GitHub


## Heroku Deployment
+ create app on Heroku
+ Files for heroku from GitPod
    + in bash "pip3 freeze --local > requirements.txt
    + in bash "echo web: python run.py > Procfile"
        + If the opened Procfile has a blank line at the bottom, delete this line. It could cause problems with Heroku otherwise.
    + this creates two files for heroku to identify what it needs to run app
+ link Heroku and GitHub
    + From personal > *name of app* created at first Setup
    + select (go to) deploy
    + select GitHub from 'deployment method' section
    + from your GitHub account and the name of the cloned repository
+ Share env.py information with heroku
    + select (go to) settings
    + click reveal config vars of config vars
    + add all of the 'os.environ.setdefault' key value pairs without their quotations
+ Enable automatic deployment
    + select (go to) deploy
    + select 'automatic deploys' in 'automatic deploys' section
    + select 'deploy branch' in 'manual deploy' section

## Database build
### Database structure
+ create Database on MongoDB
+ create collections for Database: feature, recipes, users
+ add featured items to feature as format: {name:feature} features will be you meal star (ex. protein, veg, pasta)
+ create index (**notes**)
    + in bash "python3"
    + in bash "from *app name* import mongo"
    + mongo.db.*collection*create_index([("name", "text"), ("name2","text")])
### Connecting to DB
+ find URI
    + go to cluster
    + select 'connect'
    + select 'connect your application'
    + select driver (python) and version of python
    + copy string provided
    + paste string in env.py as the "MONGO_URI" value
    + Update the pasted string with the DBname and password by replacing <DBname> and <password> (replace angled brackets as well)

# Tools and Credits
## Tools
+ [Balsamiq](https://balsamiq.com/)
    + Used to produce the wireframes.
+ [Bootstrap](https://getbootstrap.com/)
    + Used as framework.
+ [BrowserStack](https://www.browserstack.com/)
    + Used to check for compatibility errors.
+ [GitHub](https://github.com/)
    + Used for version control and deploys application information to Heroku.
+ [GitPod](https://www.gitpod.io/)
    + Integrated development environment used.
+ [Google Fonts](https://fonts.google.com/)
    + Imported font families from here.
+ [Heroku](https://www.heroku.com/)
    + Site where application is deployed.
+ [Jigsaw (Validation Service)](https://jigsaw.w3.org/css-validator/)
    + Used to identify errors in CSS.
+ [JSHint](https://jshint.com/)
    + Used to identify errors in JavaScript.
+ [Lighthouse](https://developers.google.com/web/tools/lighthouse)
    + Used to check for performance, accessibility, best practices, and SEO.
+ [Pingdom](https://tools.pingdom.com/)
    + Used to check load time.
+ [Techsini](https://techsini.com/multi-mockup/)
    + Used for their viewable responsiveness PNG.
+ [TinyPNG](https://tinypng.com/)
    + Used to Minimize KB load per image.
+ [W3C Validator](https://validator.w3.org/)
    + Used to identify errors in markup.
+ [JSFiddle](https://jsfiddle.net/)
    + Used for tinkering and creating CSS art. 
+ [Inkscape](https://inkscape.org/)
    + Used to create scalable vector graphics (SVG).
+ [RandomKeygen](https://randomkeygen.com/)
    + Used to create random secret key for "env.py"

## Credits
### Code Citations
+ [Pretty Printed](https://www.youtube.com/watch?v=DsgAuceHha4) - how to upload images to MongoDB

### References and Ideas
+ [Bootstrap](https://getbootstrap.com/)
    + Framework used to help speed up development and provide a better overall UX.
+ [Flask](https://flask.palletsprojects.com/en/1.1.x/)
    + A basic guide to the current version of Flask.
+ [MDN Web Docs](https://developer.mozilla.org/en-US/)
    + Invaluable source of information about JavaScript, HTML, and CSS.
+ [PyMongo](https://pymongo.readthedocs.io/en/stable/)
    + A basic guide to the current version of PyMongo
+ [Stack Overflow](https://stackoverflow.com/)
    + Great souce of information for finding a starting place and direction to research.
+ [TestLodge](https://blog.testlodge.com/how-to-write-test-cases-for-software-with-sample/)
    + Used to help formulate test syntax structure.
+ [W3Schools](https://www.w3schools.com/)
    + Extremely helpful for explaining base HTML, CSS, and JavaScript principles.
+ [Werkzeug](https://werkzeug.palletsprojects.com/en/1.0.x/)
    + A basic guide to the current version of Werkzeug.
+ [World Wide Web Consortium (W3C)](https://www.w3.org/)
    + Used to understand basic standardization practices for web based apps.
    
# Acknowledgements