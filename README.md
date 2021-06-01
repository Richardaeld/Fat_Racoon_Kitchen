# Contents
[Fat Raccoon - Introduction](#fat-racoon---introduction)

[UX](#ux)
+ [Goals](#goals)
    + [User Goals](#user-goals)
    + [Developer Goals](#developer-goals)
+ [Client Stories and Experience Provided](#client-stories-and-experience-provided)
    + [Client Stories](#client-stories)
    + [Experience Provided](#experience-provided)

[Design Choices](#design-choices)
+ [Header and Footer](#header-and-footer)
+ [Login and Create Account Modal](#login-and-create-account-modal)
+ [Index](#index)
+ [Lessons](#lessons)
+ [Profile](#profile)
+ [Recipe](#recipe)
+ [Recipe List](#recipe-list)
+ [All Recipes](#all-recipes)
+ [Add Edit Recipes](#add-edit-recipes)
+ [Edit User Info](#edit-user-info)
+ [Search Bar Returns](#search-bar-returns)
+ [Page Performance](#page-performance)
+ [Wireframe and Live Demo](#wireframe-and-live-demo)
    + [Wireframe](#wireframe)
    + [Live Demo](#live-demo)
+ [Scalability](#scalability)

[Technology Languages](#technology-languages)

[Testing](#testing)
+ [Developer Testing Specifications](#developer-testing-specifications)
    + [Developer Tested Systems](#developer-tested-systems)
    + [Developer Testing Methods](#developer-testing-methods)
+ [Developer Tests](#developer-tests)
    + [Testing Random Recipe](#testing_random_recipe)
    + [Testing Text Coss Out Function](#testing_text_coss_out_function)
    + [Testing All_Recipe And Recipe_List Pagination](#testing_all_recipe_and_recipe_list_pagination)
    + [Testing Recipe Upload](#testing_recipe_upload)
    + [Testing Search Chef Name](#testing_search_chef_name)
    + [Testing Browse Button for Lazy Favorites Recipes](#testing_browse_button_for_fazy_favorites_recipes)
    + [Testing Recipe Favorites Function](#testing_recipe_favorites_function)
    + [Testing Lessons Index Cards](#testing_lessons_index_cards)
+ [Program Tests](#program-tests)
    + [BrowserStack](#browserstack)
    + [Lighthouse](#lighthouse)
    + [JigSaw](#jigsaw)
    + [W3C Validator](#w3c-validator)
    + [JSHint](#jshint)

[Bugs and Other Problems](#bugs-and-other-problems)
+ [Previous Bugs](#previous-bugs)
+ [CurrentBugs](#current-bugs)
+ [Other Problems](#other-problems)

[Deployment](#deployment)
+ [Setup structure on GitPod for developers](#setup-structure-on-gitpod-for-developers)
    + [Flask](#flask)
    + [Pymongo](#pymongo)
+ [Deploy Clone from GitHub](#deploy-clone-from-github)
+ [Heroku Deployment](#heroku-deployment)
+ [Database build](#database-build)
    + [Database structure](#database-structure)
    + [Connecting to DB](#connecting-to-db)
    + [Create the appropiate collections](#create-the-appropiate-collections)

[Tools and Credits](#tools-and-credits)
+ [Tools](#tools)
+ [Credits](#credits)
    + [Code Citations](#code-citations)
    + [References and Ideas](#references-and-ideas)

+ [Acknowledgements](#acknowledgements)


# Fat Racoon - Introduction
<!-- intro -->
The Fat Racoon is devoted to helping home cooks provide better meals to friends, family, and our users. We provide a network of our and our user's 
recipes. All these recipes can be searched through with our in app search engine. We believe that even without the ideal ingredience on hand, a little taste pairing or 
extra spice can help make any meal provide a savory experience. We even go out of our way to provide new chefs with some basic cooking lessons in our lessons section. 
Our chefs know the importance of making the best out of what we have on hand and want to share that liberating experience with other home chefs.
<!-- about us - community -->
The chefs of the Fat Racoon started as sleep deprived, nocturnal home chefs that would use the, leftovers ("garabage"), or that one thing 
that has to be eaten today (We've all done it) to make a meal. With practice and study, these meals improved over time but it started with learning 
fundamental cooking practices, taste pairings, and thinking in parts of a whole. We want to help others wisely spend their kitchen time making the best meals they can. We offer 
conventional cooking practice and recipe guidance to help them along the way. The Fat Racoon believes that helping to establish a community 
of home cooks and their recipes in an intuitive search engine will be a boon to home chefs everywhere. It helps newer chefs see that not every 
recipe has to be complicated or convoluted. 
<!-- casual users -->
For our users just searching for a recipe, we offer several different search methods for them to find what they are looking for. Users can search our data base by chef, feature ingredient,
or name. The front page also offers four other methods for users to browse the Fat Raccoon's recipes: by 'Lazy Favorites', 'Grandparent Classics', all of the Fat Raccoon's personal recipes, and 
search by feature.

<!-- We offer a brief home cooking fundamental section, this section can help home chefs make the best of what they have on hand to cook.  -->
<!-- Users can search recipes by feature ingredient to find that one recipe that they want to try. This can be accomplished through the use of our search bar or by searching through our recipe 
database. -->
For those chef's submitting recipes, we offer a place to put in a name, prep/cook/total time, picture, brief recipe description, ingredients, and steps. 
This allows someone to easily keep track of a recipe and share it with others.
Additionally, if the Fat Raccoon finds these recipes appropiate they will add the tags of 'lazy favorite' or 'grandparent classic' to the users recipe.

Cooking has more meaning than just preparing food. For many it is a connection to your history or life experience.  We encourage our users to give us a little meta information in the recipes they submit. 
Let us help preserve a little of ourselves in a recipe. Its important to us and to those that submitted it. From a family recipe to this is all I could afford 
in college, let us know!

**Disclaimer** This is a nonprofit student site and has some 3rd party recipes in it. These recipes are used as database information and these recipes are documentmented as such in their recipe description section. 

# UX
## Goals
### User Goals
+ I want to find a recipe for dinner. <!---- Testing Random Recipe -->
+ I want to use my smart phone or tablet to as a recipe book. <!-- Testing Text Coss Out Function -->
+ I want to find a new chicken dish to cook. <!-- Testing All_Recipe And Recipe_List Pagination-->
+ I want a place to leave a recipe so I can easiy find. <!-- Testing Recipe Upload -->
+ I want help deciding what to cook for dinner and I like a chefs recipes. <!-- Testing Search Chef Name -->
+ I want a easy to make recipe. <!-- Testing Browse Button for Lazy Favorites Recipes -- >
<!-- + I want a recipe to surprise my significant other with -->
+ I cant remember the name of a recipe that i like <!-- Testing Recipe Favorites Function -->
+ I want an easy to read recipe layout while Im cooking <!-- Testing Text Coss Out Function -->
+ I lack confidence in my cooking ability and need help. <!-- Testing Lessons Index Cards -->
<!-- make a test that uses crud -->
<!-- make test that user deletes a recipe -->
<!-- make test that user travels to a deleted recipe -->

### Developer Goals
+ As a school project, this site was developed using as little 3rd party code as possible (ex. carousel logic was written by developer and bootstraps version was not used on purpose). This 
was a deliberate choice to help the developer gain a better understanding of how languages such as JS and Python function and not done out of ignorance. Understanding how these logics 
function for similar tasks (Ex, validation) and the time it takes to develope them is an important lesson to this developer.

+ I want to showcase my Python abilities.
    + Importing Python libraries(Ex. datetime, random, etc...)
    + Using Flask (flash, render_template, redirect, request, session, url_for)
        + Jinja (Templates)
            + Allowing one page to have multiple functions
                + Add edit recipe
                + base - login/create modal
    + Pymongo (Flask - mongo DB)
    + Created Python validation logic
        + Checks filetype submitted
        + Checks max and min character length
        + Checks for allowed characters
    + Created callable function library instead of repeating code
    + Using if expressions: to replace blank sections(missing DB data) with filler Templates, to add the lazy banner on random recipe, etc...
    + Using for expressions: to generate list data ex. recipe lists, recipe ingredient lists, recipe step lists, etc...
    + Useing a random number generator to randomly select recipes

+ I want to showcase my JS abilities
    + Created carousel JS logic
    + Created pagination JS logic
    + Created Validation JS logic
        + Character length
        + Compare two passwords to be sure they match
        + Make sure email has appropriate suffix
        + Replace spaces with _ using a regex

+ I want to showcase my DB abilites.
    + Mongo DB
        + User searched have restrictions to specific content
        + Searches use restricted results if possible
        + Searches use operators if applicable
        + New Recipe and user entries build upon a black template instead of creating an entirely new document each time
            + This allows for cleaner Python to upload changed content
        + Allow users to upload recipe/user avatar

+ I want to showcase my artistic ability
    + CSS art
        + Sticky Notes with lifting effect
        + Social Drinks (Links) - stylized as a drink with ice in it with a ripping and ice dipping effect
        + Polaroid Picture
        + Table Runner(Header footer)
    + SVG art
        + Favicon and Fat Raccoon logo
        + Blank head chef avatar place holder
        + Arrow for carousel

## Client Stories
 <!-- -- (+ I have trouble keeping up with physical recipes and remembering what I have on hand and what I dont.) -->
+ I want to find a recipe for dinner.
    + I opened the Fat Raccoon's main page. I dont really know what I want so I scrolled down to the bottom of that page. I liked the recipe I saw on the bottom of the page and decided to use that. 
+ I want to use my smart phone or tablet to as a recipe book.
    + I opened the Fat Raccoon's main page and found a recipe I like. I got to the recipe's page to see what I need to make the recipe. Ive found that if I click the item's check box, it crosses out the box and text of the item. I 
    also turned my device off and on I found it didn't automatically reset the screen I was on. I think I will keep using my device to easily keep track of what ingredient I still need or what step of the recipe I am on.
+ I want to find a new chicken dish to cook.
    + I opened the Fat Raccoon's main page. I didn't immediately find a chicken recipe I liked. I found a button, **Browse by feature!**, and I clicked it.  I found the chicken feature section and all the chicken 
    recipes I could want!
+ I want a place to leave a recipe so I can easiy find.
    + I opened the Fat Raccoon's main page. I want to have a digital place to keep a recipe so I create a log in to the Fat Raccoon. The page takes me to my newly created profile page. I click the **Share Recipe** button
    and input all the recipes information and even a image. I've discovered I can edit my recipe from its recipe page in the Fat Raccoon app. I've also found I can favorite my own recipe from this page. If I go to my profile 
    it is also always in the recipes uplaoded section of my profile so I can easily find my recipe whenever I want it.
+ I want help deciding what to cook for dinner and I like a chefs recipes.
    + My cousin, Mrs. Fat Raccoon and her husband Mr. Fat Raccoon have similar taste in food as me and I want to easiy find all their recipes. I opened the Fat Raccoon's main page and scrolled to the bottom of the 
    page where I found a button, **Browse Fat_Raccoon's recipes!**, and I clicked the button. I am now able to see all of the the Fat Raccoon's recipes.
    + My friend has an account on the Fat Raccoon app and I know her/his account name. I open the Fat Raccoon's main page and put my friends account name into the search bar and now I am able to see all of my friends
    uploaded recipes.
    + I opened the Fat Raccoon's main page and clicked on **Recipes** in the navigation bar.  I found a recipe on the recipe page that I really liked, however it wasn't made by the **Fat Raccoon**! I did find that 
    if I clicked on the chef's name under the picture of their recipe it takes me to all this chefs submitted recipes!
+ I want a easy to make recipe.
    + Its been a long day, Im tired, and want an easy recipe to make for dinner. I opened the Fat Raccoon's main page and scroll to the bottom of the page and find a button, **Browse our Lazy Favorites!**. I click this 
    button and I find numerous recipes that dont require much effort.
+ I cant remember the name of a recipe that i like.
    + I opened the Fat Raccoon's main page and relized I dont remember the name of the recipe I was looking at last night. I remembered I was logged in so I log into my
    Fat Raccoon account and Im taken to my profile page where I easily find the recipe I was looking at last night in my **10 Recently Viewed Recipes** section.
    + I opened the Fat Raccoon's main page and relized I dont remember the name of the recipe I wanted to try. I log into the Fat Raccoon with my account and Im taken 
    to my profile page. I dont see the recipe in my **10 Recently Viewed Recipes**, However I did favorite the recipe and I easily find the recipe in my **10 Recently Favorited Recipes**
    section
    + I opened the Fat Raccoon's main page and relized I dont remember the name of the recipe I wanted to try. I log into the Fat Raccoon with my account and Im taken 
    to my profile page. I dont see the recipe in my **10 Recently Viewed Recipes**. I also did not find the recipe in my **10 Recently Favorited Recipes** section.
    I click on my **10 Recently Favorited Recipes** header and Im taken to my entire favorited recipe list. I find the recipe there.
+ I lack confidence in my cooking ability and need help.
    + I open the Fat Raccoon's main page and I realize Im totally outside of my comfort zone.  I want to try a recipe but everytime I cook, something is just terrible 
    about the experience. I see the **Lesson** section in the navigation bar and decide to give it a shot. I find numerous helpful tips that give me the confidence to 
    try a recipe that sounds good.

<!-- ### Experience Provided
+ Users can search the entire recipe DB for the recipe they want to use
+ Have a "random recipe" from the Fat Raccoon chefs for those that dont know what they want.
+ Site is fully responsive so users can use recipes on their phones or tablets while cooking.
+ Site allows for users to "scratch through" ingredients or steps on recipe page as they gather or accomplish parts
+ Users can use user search bar to search for features (also for: chef name and recipe name)
+ Users can upload their own recipes to have a safe place to keep a recipe they like
+ Users can use carousel, grnadparent classics or random recipe to help get an idea what to cook
+ Users search results returns total time it takes to cook a meal 
+ Grandparent classic was designed to offer users a choice of recipes that are considered classical in the Fat Raccoon
+ Recipe pages layout is designed specifically for mobile and tablet users.  Providing the best UX possible
+ Site has a welcoming southern homecooking feeling -->

# Design Choices
## Header and Footer
+ Southern theme:
    + Cutting board logo with stylized engraved text.
    + Southern table runner for background.
    + Links are stylized as drinks.
+ Plain bootstrap nav bar with integrated search engine for a good UX.

## Login and Create Account Modal
+ Both login and create account modals accessible from anypage.
+ Validation (Python and JS) prevents users from submitting improper form details.
    + All input's use JS with Python as a double check before allowing upload.
    + These checks look at characters, character length, and blank space input.
    + Spaces are changed to '_' using a regex for password, username, and email
    + JS email validation (proved to be particularly difficult and unique and is detailed in **previous bugs** section):
        + Email validation is limited with suffixes allowed
            + Checks for the email suffix .com, .edu, .net, .org, and @

## Index
+ Index card carousel:
    + Recipes added to index cards for a home made, I can do this feeling.
    + Carousel offers three randomly selected recipes from head chef to display per featured item.
    + Designed to help give users options based on the feature item they want to cook.
+ Grandparent classic polaroids:
    + Recipe's image used on a polaroid picture design. This design is used to give people the nostalgia feeling of a recipe their grandparents might have made.
    + The recipe's name is added to the bottom of the picture to let users know what recipe they are viewing.
+ Random Recipe section:
    + Quick browsing links provided to give users ample ideas if they dont know what to cook.
    + A random recipe with basic information and a image is provided to give users an idea of what to cook.
        + This is followed with a banner if the recipe is a lazy favorite, grandparent classic, or both.
        + This section also houses the head chef's Bio and image to help give the site a welcoming feeling.

## Lessons
+ Index cards:
    + A simple commit is added to the cards that lets users know the cards are clickable.
        + Each index card is flippable with most of them containing information on both sides.
    + The information provided gives new chefs some hints and tricks at getting started in the kitchen and making the best of what they have on hand.

## Profile
+ Two buttons below navigation bar that allow users to either: **Share Recipe** they want to preserve or **Update Profile**.
+ Users can clearly see their own bio and avatar image. This is a way to give users a feeling of personalization or belonging. 
+ Users have access to their entire uplaoded/favorited recipe history with a single click.
    + Users will always see their entire most recently uploaded/favorited/ history by clicking the header of either.
+ Users can see their 10 recently viewed recipes.

## Recipe
+ If a user has submitted a recipe, they can modify or delete that recipe.
+ Logged in users:
    + Can favorite a recipe so they can return to it easier.
+ Logged in uploader of recipe:
    + Can edit the recipe or delete it.
+ Clearly displays avatar image so users can see what dish looks like (or displays a defaut blank).
+ All general recipe information is displayed and easiy viewed.
+ Recipe's ingredients and steps:
    + Each labeled in their own lists.
    + Each item has its own check box.
    + Users can click on any part of the item and it will check the box and cross out the item clicked.

## All Recipes
+ Lists entire DB of recipes by their featured ingredient.
+ When a feature contains more than 5 entries the list updates to have pagination at the bottom of the list.
+ Each list is given a header of the feature type that is the basis for which recipes follow.
+ Each Recipe displays the name and total recipe time to help users decide what they want to make(At smaller resolutions its just a recipe name).
+ Users can click on recipe header to go to a page containing only that featured item set.

## Recipe List
+ When a list contains more than 5 entries the list updates to have pagination at the bottom of the list.
+ Each Recipe displays the name and total recipe time to help users decide what they want to make(At smaller resolutions its just a recipe name).

## Add Edit Recipes
+ A form that is less frills than the rest of the page. This is to give a more serious feeling when creating/editing recipes.
+ Users can update every part of a recipe except the boolean tags: Lazy Favorite and Grandparent Classic (Which is reserved for the HeadChef of the site to make this decision)
+ There is basic (Python + JS) validation:
    + The image uses JS to check its file size and Python to check its file type.
    + All other input/textarea's use JS with Python as a double check before allowing upload.
    + These checks look at characters, character length, and blank space input(ingredients/steps).
+ Total cook time updates automatically as prep and cook times are adjusted.
+ Recipe Ingerdients and Recipe Steps:
    + Each uses a JS add/remove set of buttons for users to create and remove boxes as they need.
    + Each box is numbered to help users keep track of the step they are at.
    + The header keeps an active count of visible boxes so users know how many are visible without having to scroll down.
    + If a user submits a blank entry box (including spaces) the Python validation will remove said box(s).

## Edit User Info
+ A form that is less frills than the rest of the page. This is to give a more serious feeling when creating/editing recipes.
+ Users are able to update their password, username, email, avatar, and bio.
+ There is basic (Python + JS) validation:
    + The image uses JS to check its file size and Python to check its file type.
    + All other input/textarea's use JS with Python as a double check before allowing upload.
    + These checks look at characters, character length, and blank space input.
    + Spaces are changed to '_' using a regex for password, username, and email
    + JS email validation (proved to be particularly difficult and unique and is detailed in **previous bugs** section):
        + Email validation is limited with suffixes allowed
            + Checks for the email suffix .com, .edu, .net, .org, and @
    + New password checks that both typed passwords are the same
+ Users wishing to create a new password, must click on the create new password button. This keeps users from accidently invalidating the form by starting its validation. This 
is addressed in **Scalability** and **Other Problems**

## Search Bar Returns
+ This page is used to return 3 different search results:
    + All user searches from search bar: for recipe name, feature, and chef. Chef search is used for **Browse Fat_Racoon's Recipes** as well
    + Profile page searches: all uplaoded, favorited, and recently viewed sections.
    + Index browse buttons for: **Browse our Grandparent Classics** and **Browse our Lazy Favorites**.

## Page Performance
![Responsiveness image of the Fat Raccoon's random recipe](static/readme/testing/responsive-fat-raccoon.jpg "Responsiveness image of the Fat Raccoon's random recipe")
+ Responsive design across all devices.
<!-- insert Image tiny JPG/PNG -->
+ All Images tinyified to reduce image download times

## Wireframe and Live Demo
### Wireframe
![Wireframe of the index page](static/readme/wireframe/index-page-large.png "Wireframe of the welcoming page")
+ [Balsamiq](https://balsamiq.com/) was used for the planning process.
+ Wireframes were made for all predetermined size variations of the webpage.
+ Each wireframe contains curly brackets that give a description of its contents and what filler(missing DB data) content should be.
+ [Click here to view all wireframes associated to this project.](static/readme/wireframe "Location of wireframes")

### Live Demo
![Demo of the Index page](static/readme/demo/demo-index-large.jpg "Demo of the Index page")
+ A fully functioning demo can be found on Heroku, [here](https://fat-raccoon.herokuapp.com/ "Deplayment location").
+ [GitHub's](https://github.com/) IDE [GitPod](https://www.gitpod.io/) was used for the construction process.
+ GitHub houses the master branch, [here](https://github.com/Richardaeld/Fat_Racoon_Kitchen)

## Scalability
+ Unify validation for images. So JS and Python check the same material. This would ensure a better UX.
+ Adding user selectable filters to search bar. This would ensure a better UX.
+ Create a user commit form for the recipes. This would give a better sense of community for returning users.
+ Allows users to rate each others recipes. This would give a better sense of community for returning users.
+ Improve email validation to accept a wider ranger of email suffixes (ex. regional suffix, .uk, .fr, .de). This would allow for a larger audiance of users.

<!-- new content -->
+ Improve Validation to use less pre-packaged validation types and more compartmentalized validation.
    + Example: Use classes to set validation for character count, characters allowed, spaces, allowed, etc... all separately.
    + A dynamic system that has a class for amount of characters allowed and a seperte class that allows for characters to be used would allow for a more dynamic validation to be made with JS which would improve validation code over all
+ A stronger form of validation could be used. The validation used is simple and limited. 
    + One good example is users are able to invalidate recipe steps or recipe ingredients by tabing to them.  This forces users to add content or remove the unused box. This is detailed in **bugs** section.    
+ Improve search engine to accept a **space** as an **_** to help users more easily find chefs with a single or multiple "space(s)" in their name.
 
    
<!-- end new content -->

# Technology Languages
+ HTML - Skeleton frame of the application.
+ CSS - Beautifies the skeleton (HTML).
+ JavaScript - Allows for dynamic content on the application.
+ Python - Allows back end programs to run. These programs(frameworks and libraries) are:
    + Flask - Allows use of templating, security, user searching, and other critical functions.
    + Pymongo - Allows flask (python) to communicate with Mongo DB.
    + PythonDNS - Allows for DNS data transfer.
    + Werkzeug - Encrypts data as it is sent between the user and server.
    + Datetime - Allows python to take a date/time stamp.
    + Random - Allows a for a random number generator.
+ Mongo DB - Database that application communicates with and stores information on.

# Testing
## Developer Testing Specifications
### Developer Tested Systems
+ Windows 10 (Chrome 87**, Edge 87**, Firefox 84**)
    + Chrome
        + Developed in Chrome
        + Initially tested in every bootstrap breakpoint during development.
        + Tested in landscape, which is desktop responsiveness level.
        + Tested in portrait, which is tablet responsiveness level.
    + Edge
        + Tested in landscape, which is desktop responsiveness level.
        + Tested in portrait, which is tablet responsiveness level.
    + Firefox
        + Tested in landscape, which is desktop responsiveness level.
        + Tested in portrait, which is tablet responsiveness level.
+ G8 ThinQ (Chrome 87**)
    + Chrome
        + Tested in landscape, which is desktop responsiveness level.
        + Tested in portrait, which is tablet responsiveness level.
+ iPad, 5th gen 13.3(Safari 13**)
    + Safari
        + Tested in landscape, which is desktop responsiveness level.
        + Tested in portrait, which is tablet responsiveness level.

### Developer Testing Methods
+ Every test of **Developer Tests** was preformed on the above listed systems and the specified screen orientation.
+ For landscape and portrait tests, the application is appropriately refreshed. This is a critical part of the test! Part of these tests is that the application is appropriately
refreshed during tests to check for errors. This helps test for stability and ensures that tablet and mobile users have a good experience.
+ After completion of all of the **Developer Tests** on each system, the system was tested again with random moments of spam clicking and switching between landscape/portrait.

## Developer Tests
<!-- new content section -->
### Testing Random Recipe

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.
1. Tester will refresh page until they see a classic banner, a favorite banner, and a favorite/classic banner.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Scroll to bottom of screen.
1. Click the **random recipe** a make sure it links to the proper recipe.
1. Repeat steps 1 - 3 approximately 3 - 5 times to check for randomization of recipe.

#### Document Result(s):
1. Document the recipe name of any broken links.
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Document if banners are never seen.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

### Testing Text Coss Out Function

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.
1. Tester knows the size of click box that should function for cross out effect.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Navigate to any recipe page in any way that you choose.
1. Scroll to **Recipe Ingredients** section and click check box or text to see if it crosses out correctly.
1. Scroll to **Recipe Steps** section and click check box or text to see if it crosses out.
1. Repeat steps 1 - 4 selecting a different path to recipe page each time (until all known paths are used).
1. Repeat step 5 approximately 3 times to check for appropiate overall good UX.

#### Document Result(s):
1. Document any recipe name that's ingredients and steps would not cross out properly.
1. Document the recipe name and choice of path that have any broken links.
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

### Testing All_Recipe And Recipe_List Pagination

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.
1. Pagination doesn't obscure any content.

#### Assumption(s):
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Navigate to **All_Recipe** page (on nav bar **All_Recipes** is called **Recipes**).
1. Find any feature that contains pagination ul.
1. Click through all numbers of pagination (or 5 random pagination numbers which ever comes first).
1. Repeat step 4, for 2 other features with pagination (if present).
1. Select a feature with pagination to navigate to **Recipe_List** page.
1. Click through all numbers of pagination (or 5 random pagination numbers which ever comes first).
1. Repeat steps 1-2 and 6-7 approximately 2 times (if pagination present).

#### Document Result(s):
1. Documentation of recipe name, screen resolution, browser/device, page, and pagination number if any pagination has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

### Testing Recipe Upload

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.
1. Tester will intentionally try to submit incorrect data to check for incorrect validation. 

#### Assumption(s):
1. Tester will create an account for this test and keep a record of said account to be appropriately handled after testing.
1. Tester has a PNG or JPG file under 500kb, a PNG or JPG over 500KB, a non PNG or JPG image file under 500KB, and a none PNG or JPG image file over 500KB.
1. Tester knows what is considered invalid by this form.
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Click on **Login** in nav bar.
1. Click on **Create Account** tab.
1. Fill out all appropiate information and submit said information.
1. Once **Profile** page opens click on **Share Recipe**.
1. Fill out all appropiate information, including an avatar, to submit a new recipe.
1. Navigate to **Profile** and click on **Share Recipe**.
1. Fill out all appropiate information , including an Avatar and choose one part of from (Name, Prep, Cook, Description, Ingredients, or Steps) to inappropriately fill out and attempt to submit.
1. Attempt to inappropriately fill selected part of form in all different types of validation to check if form will incorrectly accept this information.
1. Repeat steps 8 and 9 until all inputs and types of validation have been checked.
1. Attempt to submit same recipe with a PNG or JPG over 500KB, a non PNG or JPG image file under 500KB, and a none PNG or JPG image file over 500KB.
1. Return to original submitted recipe.
1. Repeat steps 8 - 11.

#### Document Result(s):
1. Documentation of any input/textarea that incorrectly accepted information, what form of validation failed (wheather it was JS, Python, or both), and wheather it was a new recipe or edited recipe.
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

### Testing Search Chef Name

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester knows all recipes that belong to **Fat_Raccoon**.
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Click on nav bar's search bar.
1. Input **Fat_Raccoon** into search bar and submit.
1. Check over returns to make sure all appropriate returns are shown.
1. Return to **Index Page** of Fat Raccoon.
1. Scroll to bottom of page where **Random Recipe** is located.
1. Click on chef's name **Fat_Raccoon** under the recipe's name.
1. Check over returns to make sure all appropriate returns are shown.
1. Return to **Index Page** of Fat Raccoon.
1. Scroll to bottom of page where **Random Recipe** is located.
1. Click on **Fat_Raccoon** on the sticky note with the chef's bio.
1. Check over returns to make sure all appropriate returns are shown.
1. Select any recipe from **Fat_Raccoon** and go to its recipe page.
1. Under the avatar image click the name **Fat_Raccoon**.
1. Check over returns to make sure all appropriate returns are shown.
1. Return to **Index Page** of Fat Raccoon.
1. Scroll to bottom of page where **Random Recipe** is located.
1. Click on **Browse Fat_Raccoon Recipes** button.
1. Check over returns to make sure all appropriate returns are shown.

#### Document Result(s):
1. Documentation of any link that does not appropriately link to all of **Fat_Raccoon**'s recipes, (including where the link was located).
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

### Testing Browse Button for Lazy Favorites Recipes

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester knows all recipes tagged as **Lazy Favorite**
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Scroll down to **Random Recipe** section.
1. Click on the button **Browse our Lazy Favorites!**.
1. Check over returned recipes to make sure all appropriate recipes are shown.

#### Document Result(s):
1. Documentation of any recipes that do not appropriately show up when **Browse our Lazy Favorites** button is clicked.
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

### Testing Recipe Favorites Function

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.
1. Favorite icon responds appropriately to recipes status of favorite vs unfavorite.

#### Assumption(s):
1. Tester will create an account for this test and keep a record of said account to be appropriately handled after testing.
1. Tester knows the difference between a favorited recipe and an unfavorited recipe icon.
1. Tester will unfavorite at least a single recipe and check for appropiate response.
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. Click on **Login** in nav bar.
1. Click on **Create Account** tab.
1. Fill out all appropiate information and submit said information.
1. Navigate to any recipe of testers choice.
1. Click on **Not a Favorite** or its icon.
1. Check to be sure accurate text and icon appear.
1. Navigate to a different non favorited recipe page.
1. Click on **Not a Favorite** or its icon.
1. Check to be sure accurate text and icon appear.
1. Navigate to **Profile** page.
1. Click on any favorited recipe in the **10 Recently Favorited Recipes** section.
1. Check for appropriate favorite status and icon.
1. Navigate to **Profile** page.
1. Click on the header for **10 Recently Favorited Recipes** section.
1. Check for appropriate recipes.

#### Document Result(s):
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.
1. Documentation of recipe name, and path choosen to recipe of any favorite recipe that its icon/status was not displayed correctly.
1. Documentation of recipe name that did not accept an appropriate click box to change favorite/unfavorite status.

### Testing Lessons Index Cards

---

#### Expectation(s):
1. Content fills appropriately and doesn't spill out beyond obvious borders.
1. Content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester will refresh screen while in landscape and transition it to portrait at start of each page.
1. Tester will refresh screen while in portrait and transition it to landscape at start of each page.
1. Tester knows that every index card that rotates has a **More on back-->**
1. Tester knows the content of each **Lesson** card.

#### Testing Step(s):
1. Load **Index Page** of Fat Raccoon.
1. navigate to **Lesson** page. 
1. Click every single index card and make sure text is appropriately displayed on both sides

#### Document Result(s):
1. Documentation of any index card that has poor UX, the side the poor UX was on, the resolution, and browser/device used.
1. Documentation of recipe name, screen resolution, browser/device, and page of any content has bad UX.
1. Documentation of recipe name, screen resolution, browser/device, and page anytime there is an incorrect box shadow.

<!-- end new content section -->
## Program Tests
### BrowserStack
<!-- Image of browserStack -->

### Lighthouse
![Light house results](static/readme/testing/lighthouse-fat-raccoon.jpg "Light house results")
+ Identifies problems with performance, accessibility, best practices, and SEO

### JigSaw
<!-- insert Image -->
+ Identifies errors in CSS

### W3C Validator
<!-- insert Image -->
+ Identifies errors in HTML

### JSHint
<!-- insert Image -->
+ Identifies errors in JS

# Bugs and Other Problems
## Previous Bugs
+ Improper variable passed into addfavorite page if user refreshes page.
    + Created a python function, check_for_dups to check boolean status even in refresh (later improved with list comprehension used to remove more lines).
+ Flask was generating a 504 gateway timeout error.
    + A previously harmless while loop turned into an infinit loop because of an if comparison value.
    + Fix was being sure the if comparison values were both int, previously one had been a html location because of a missed len() funciton.
+ Carousel would put up improper amount of items when changing from landscape to portrait.
    + The carousel 'memory' array and position had to be completely reset each time the screen switched between landscape and portrait.
+ Corner of napkin css art was improper size in safari.
    + Had to add -webkit- to clip-path for saafari.
+ Index card art had jagged edges after transform: rotateY(180deg) was applied.
    + Fix was a recommended line of code -webkit-backface-visibility:hidden -- reccomdation found here https://stackoverflow.com/questions/6492027/css-transform-jagged-edges-in-chrome.
+ Needed a nonstandard shaped container to hold a repeating linear gradient.
    + Found solution at MDN using a clip-path:polygon https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path 
+ Program wouldnt upload to heroku properly.
    + Fix was to add the missing space after colon in Procfile.
+ On numerous occasions, used unspecific Python if arguments leading to undesired and often difficult to find bugs.
    + Ex. with general arguments add edit recipe page would not edit recipes, it would only generate new recipes.
    + An extra operator and arguemnt was added to all if post conditions.
    + This later evolved into creating a totally new Flask route for updating and creating recipes.
+ Email wouldnt JS validate properly.
    + **Type: email** was preventing the regex from functioning properly.
    + Fix was changing type to text and added an extra layer of validation to email, email suffix.
+ Login modal wouldnt operate appropriately on any page other than the index.
    + Login modal was added to base and removed from index.
    + base_login was created to replace base for pages user had to be logged in for and needed the modal to NOT be present.
+ User search box, on medium and small responsiveness, creates a line below the main navigation bar and drops the search bar down to that new line
    + The solution used was to use a Bootstrap navigation bar.

## Current Bugs
+ Social links on footer have a repetitive triggering bug. They use JS mouseenter to trigger and trigger improperly due to multiple css layers and a margin. 
    + Multiple attempts have been made to limit event bubbling but no real solution could be found.
        + These attempts have including changing the type of event the trigger uses to stopPropagation().
+ Safari browser Bugs
    + When safari decides sticky-note-right's height is to large the box shadow of its :before has a layer error and overlaps the content of sticky-note-right.    
+ Sticky Note shadow - depending on the magnification used (with a range of 50% - 200%) the :before shadow used will show bad UX.
    + A damage control fix was used to help reduce this occurrence
        + Previously Created "standard" container sizes styles "*size*-container-height" and have them scale with the responsiveness of the site
        + Give empty containers a mininum height
        + Give full containers a set max height

## Other Problems
+ Email validation
    + Validation originally used suffix validation of ".com" and ".edu". However this validation alienated users from making accounts
    + Suffix validation had to be expanded to include ".net" and ".org".
+ Searching mongo DB using collection.db.find("$text": "$search": <value>) unable to return booleans.  This is an issue with users being
able to search "lazy" or "grandparent" tags.
    + A browse button was added that searches for "lazy" and "grandparent" using the equals operator ("$eq")
    + This search requires a specific operator so a button was designed for users. This would allow users to search for these tags and doesnt make the search engine unnecessarily complex
+ Limitations of validation:
    + **recipeGeneralValidation** has a minimum character number however it is used on add_edit_recipe.html for recipe steps and recipe ingredients and users could potientially submit blank entires. 
    There is python validation in place that will not allow a blank entry to be added to the accompying array. However this invalid status could potientially be annoying to users.
    + If an invalid image type is submitted python will return you to the edit page and undo all previously changed/added material. Which could be annoying to users. 
    *Could not find a effective way to prevent users from submitting invalid file types using JS*

# Deployment
## Setup structure on GitPod for developers
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
    + mongo.db.*collection*.create_index([("name", "text"), ("name2","text")])
### Connecting to DB
+ find URI
    + go to cluster
    + select 'connect'
    + select 'connect your application'
    + select driver (python) and version of python
    + copy string provided
    + paste string in env.py as the "MONGO_URI" value
    + Update the pasted string with the DBname and password by replacing <DBname> and <password> (replace angled brackets as well)
### Create the appropiate collections
+ blank
    + This is where the dictionary base for both new users and new recipes is stored
    + Two entries are required to be here
    + The mongo id auto assign is fine for both entries
    + The value Array is a Mongo assigned Array
    + The value null is a Mongo assigned null value
    + The value false is a Mongo assigned boolean value
    + Recipe entery is structured as
        + {
        + name: ""
        + feature: "chicken"
        + ingredients: Array
            + 0: ""
        + steps: Array
            + 0: ""
        + time: Array
            + 0: ""
        + date: ""
        + text: ""
        + avatar: null
        + avatar_id: null
        + grandparent: false
        + lazy: false
        + created_by
        + }

    + User entery is structured as
        + {
        + username: "user"
        + email: ""
        + password: ""
        + avatar: null
        + avatar_id: null
        + bio: ""
        + admin: false
        + recents: Array
        + favorites: Array
        + date: ""
        + }

+ feature
    + Feature is for a recipes feature ingredient
    + There must be a single feature in the collection for the page to function
    + each feature is structured as
        + {
        + name: "chicken"
        + }
+ recipes
    + Recipe is where the sites recipes are stored.
    + There is no set number of entires for the site to function properly, however a better UX is provided when the head chef of the site has several recipes entered.

+ users
    + Users is where the sites user information is stored.
    + There is no set number of entires for the site to function properly, however a better UX is provided if the site has a set head chef.

+ fs.chunks
    + Will be created automatically after first image is uploaded.
    + fs.chunks is for storage of images.
+ fs.files
    + Will be created automatically after first image is uploaded.
    + fs.files is for storage of images.

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
+ Emily Eldridge for help with revising the grammar and flow of this README document.
+ Felipe Souza Alarcon for his suggestion of a recipe themed project, his help and guidance. 
