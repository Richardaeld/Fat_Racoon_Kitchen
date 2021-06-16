# Contents
[Fat Raccoon - Introduction](#fat-raccoon---introduction)

[UX](#ux)
+ [Goals](#goals)
    + [User Goals](#user-goals)
    + [Developer Goals](#developer-goals)
+ [Client Stories](#client-stories)

[Design Choices](#design-choices)
+ [Header and Footer](#header-and-footer)
+ [Login and Create Account Modal](#login-and-create-account-modal)
+ [Index](#index)
+ [Lessons](#lessons)
+ [Profile](#profile)
+ [Recipe](#recipe)
+ [All Recipes](#all-recipes)
+ [Recipe List](#recipe-list)
+ [Add Edit Recipes](#add-edit-recipes)
+ [Edit User Info](#edit-user-info)
+ [Search Bar Returns](#search-bar-returns)
+ [Page Performance](#page-performance)
+ [Wireframe and Live Demo](#wireframe-and-live-demo)
    + [Wireframe](#wireframe)
    + [Live Application](#live-application)
+ [Scalability](#scalability)

[Technology Languages](#technology-languages)

[Testing](#testing)
+ [Developer Testing Specifications](#developer-testing-specifications)
    + [Developer Tested Systems](#developer-tested-systems)
    + [Developer Testing Methods](#developer-testing-methods)
+ [Developer Tests](#developer-tests)
    + [Testing Random Recipe](#testing-random-recipe)
    + [Testing Text Coss Out Function](#testing-text-coss-out-function)
    + [Testing All_Recipe And Recipe_List Pagination](#testing-all_recipe-and-recipe_list-pagination)
    + [Testing Recipe Upload](#testing-recipe-upload)
    + [Testing Search Chef Name](#testing-search-chef-name)
    + [Testing Browse Button for Lazy Favorites Recipes](#testing-browse-button-for-lazy-favorites-recipes)
    + [Testing Recipe Favorites Function](#testing-recipe-favorites-function)
    + [Testing Index Cards on Lesson Page](#testing-index-cards-on-lesson-page)
    + [Testing Profile Updates](#testing-profile-updates)
    + [Testing Delete Recipe - Full C.R.U.D. Test](#testing-delete-recipe---full-c.r.u.d.-test)
    + [Testing Delete Button for Recipes on Profile Page](#testing-delete-button-for-recipes-on-profile-page)
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
+ [Deploy Clone in GitHub - GitPod](#deploy-clone-in-github---gitpod)
+ [Setup structure on GitPod for Developers](#setup-structure-on-gitpod-for-developers)
    + [Flask](#flask)
    + [Pymongo](#pymongo)
+ [Heroku Deployment](#heroku-deployment)
+ [Database Build](#database-build)
    + [Database Structure](#database-structure)
    + [Connecting to Database](#connecting-to-database)
    + [Create the Appropriate Documents](#create-the-appropriate-documents)

[Tools and Credits](#tools-and-credits)
+ [Tools](#tools)
+ [Credits](#credits)
    + [Code Citations](#code-citations)
    + [References and Ideas](#references-and-ideas)

+ [Acknowledgements](#acknowledgements)


# Fat Raccoon - Introduction
<!-- Intro -->
The Fat Raccoon was designed to facilitate a home cooking community for the accumulation of family recipes.
Our notorious and enduring mascot, a plump Raccoon, combined with our "Southern American" home-crafted appearance make the Fat Raccoon application a memorable experience.
This community created recipe compendium should be the last cookbook any home cook should ever need.
<!-- How it works -->
Each recipe uploaded into our app gets its own page with an easy-to-read responsive layout that's ideal for tablet and mobile users.
Additionally, each recipe's ingredient and step sections allow users to cross out items as they progress through the recipe.
Our recipes can be searched through with an in-app search engine that looks for the recipe's name, who created the recipe, and its featured ingredient.
Members of the Fat Raccoon community can easily share their recipes by giving friends and family their username. 
<!-- Personalized cookbook -->
The Fat Raccoon wants to offer its account holders a community driven compendium and a personalized recipe book.
Those with an account can add a bio and avatar to their profile page that will welcome them upon logging in.
This profile page also offers three personalized recipe lists: recipes that the user has uploaded, their favorite recipes, and 10 previously viewed recipes.
<!-- New users, Nonpersonalized cookbook -->
Even if our users don't create an account, they will still have access to a plethora of different search methods that will help them find any recipe they desire.
The opening page of the Fat Raccoon offers a multitude of different searches, including: random recipes based on a featured ingredient, a random assortment of recipes with the grandparent classic tag, a random Fat_Raccoon recipe, and more. 
Users can search our entire recipe compendium which is sorted by featured ingredient and upload date.
Finally, there is our aforementioned in-app search engine that can be found on the navigation bar at any time.
<!-- About us, lessons, and head chef's personal touch -->
The Fat Raccoon's plump mascot started as a joke between the head chefs of this application. 
Both these chefs were overworked, sleep deprived, and often nocturnal home cooks that would use the leftover "garbage" from the fridge to make a meal.
The lessons that these "fat raccoons" learned are offered in the lesson section of the Fat Raccoon app.
The "fat raccoons" also offer their personal recipes under the chef name Fat_Raccoon. They hope that the additional personal touches they add to their recipes will encourage others to do the same.

**Disclaimer:** This is a nonprofit student site and has some 3rd party recipes in it. These recipes are used as database information and are documented as external recipes such in their recipe description section. 

# UX
## Goals
### User Goals
+ I want to find a recipe for dinner. <!-- Testing Random Recipe -->
+ I want to use my smart phone or tablet as a recipe book. <!-- Testing Text Coss Out Function -->
+ I want to find a new chicken dish to cook. <!-- Testing All_Recipe And Recipe_List Pagination-->
+ I want a place to leave a recipe, so I can easily find it later. <!-- Testing Recipe Upload -->
+ I want help deciding what to cook for dinner and I like a specific chef's recipes. <!-- Testing Search Chef Name -->
+ I want an easy-to-make recipe. <!-- Testing Browse Button for Lazy Favorites Recipes -->
+ I can't remember the name of a recipe that I liked on the Fat Raccoon, and I want to find it again. <!-- Testing Recipe Favorites Function -->
+ I lack confidence in my cooking ability and need help. <!-- Testing Lessons Index Cards -->
+ I've decided that I don't like my user bio or avatar anymore and I want to change them. <!-- Tests update of user information/avatar -->
+ I've uploaded a recipe I don't like anymore and I want to remove it. <!-- Tests for deletion of recipe --><!-- Tests C.R.U.D. -->
+ I deleted my recipe but I forgot to unfavorite it. Now I want to remove it from my profile page's **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** sections. <!-- Tests delete button for favorites/recents in profile -->

### Developer Goals
+ As a school project, this application was developed using as little 3rd party code as possible (ex. carousel logic was written by developer and Bootstrap's version was not used on purpose). This 
was a deliberate choice to help the developer gain a better understanding of how languages such as JS and Python function and not done out of ignorance.

+ I want to showcase my Python abilities, by:
    + Importing Python libraries (Ex. datetime, random, etc...).
    + Using Flask's APIs, such as: `flash`, `render_template`, `redirect`, `request`, `session`, and `url_for`.
    + Using a single Jinja template for multiple functions (Ex. `add_edit_recipe.html` uses the same template to create and modify a recipe).    
    + Using Pymongo to communicate with MongoDB database.
    + Creating Python validation logic that:
        + Checks filetype submitted.
        + Checks max and min character length.
        + Checks for allowed characters.
        + Etc....
    + Creating a callable function library instead of repeating code.
    + Minimizing function length.
    + Using a random number generator to randomly select recipes.
    + Using `if` expressions that:
        + Replace blank sections (missing database data) with filler templates.
        + Add a specific banner on random recipe.
        + Etc....
    + Using `for` expressions that:
        + Generate list data for recipe lists. 
        + Generate recipe ingredient lists.
        + Etc....

+ I want to showcase my JS abilities, by:
    + Creating carousel JS logic.
    + Creating pagination JS logic.
    + Creating validation JS logic that:
        + Checks character length.
        + Checks for allowable characters.
        + Compares two passwords to be sure they match.
        + Checks for appropriate email suffix.
        + Replace spaces with `_` using a regex.

+ I want to showcase my MongoDB's (NoSQL database) database abilities by:
    + Restricting user searches to specific content.
        + (Ex. Only allowing users to search for chef name, featured ingredient, and recipe name from the in-app recipe search engine.)
    + Removing non pertinent data sent to the client from the server when applicable. 
        + (Ex. Removing recipe ingredient(s), recipe step(s), and recipe description from the in-app recipe search engine returns.)
    + Searches use operators when applicable.
        + (Ex. The `$or` operator is used to allow a dictionary list of `ObjectId`s to be compiled and sent to MongoDB as a single inquiry.)
    + Creating a new recipe or account document will build upon a prestored blank template instead of creating an entirely new document each time. This allows:
        + For cleaner coded Python when uploading new content.
        + For easily updating the standard for creating new recipe and user documents. 
    + Allow users to upload avatars for their profile and recipes.

+ I want to showcase my artistic ability, by:
    + Creating CSS art.
        + Created sticky notes with a lifting effect.
        + Created drinks with an animation. These drinks are:
            + Stylized as tea with ice in it
            + Animated to have ripples when a user's mouse cursor passes over it.
            + Animated to have the "ice" dip when a user's mouse cursor passes over it.
        + Created napkins that the drinks sit on.
        + Created Polaroid pictures.
        + Created table runners.
        + Created index cards.
    + Creating SVG art.
        + Created favicon and Fat Raccoon logo (raccoon face).
        + Created blank head chef avatar place holder (black and blue silhouette).
        + Created arrows for carousel.

## Client Stories
+ I want to find a recipe for dinner.
    + I opened the Fat Raccoon's main page. I don't know what I want for dinner, so I scrolled down to the bottom of the page. I liked the random recipe I saw on the bottom of the page and decided to use that recipe. 
+ I want to use my smart phone or tablet as a recipe book.
    + I opened the Fat Raccoon's main page and I found a recipe I like. I went to the recipe's page to see what ingredients I need to make the recipe. I found that if I click the item's check box, it crosses out the box and the text of the item.
    I turned my device off and on. I found it didn't automatically reset the screen I was on, so all the boxes are still checked. I think I will keep using my device to easily keep track of what ingredient(s) I still need or what step 
    of the recipe I am on.
+ I want to find a new chicken dish to cook.
    + I opened the Fat Raccoon's main page and I didn't immediately find a chicken recipe that I liked. Instead, I found a button, **Browse by Featured Ingredient!**, and I clicked it. The **Featured Ingredient** section for 
    chicken has all the chicken recipes I could want!
+ I want a place to leave a recipe, so I can easily find it later.
    + I've decided I want a digital place to keep a recipe, so I opened the Fat Raccoon's main page. I created a Fat Raccoon account from the login/create modal. The app took me to my newly created profile page. I 
    clicked the **Share Recipe** button and I filled out all the recipe's information including an image. I've discovered that I can edit my recipe from its recipe page in the Fat Raccoon app. I can also favorite 
    my own recipe from its recipe page. When I go back to my profile, my recipe is displayed in the **10 Recently Uploaded Recipes** and **10 Recently Favorited Recipes** sections so I can easily find my recipe whenever I want it.
+ I want help deciding what to cook for dinner and I like a specific chef's recipes.
    + My friends, Mrs. and Mr. Fat_Raccoon have similar taste in food as me and I want to easily find all of their recipes. I opened the Fat Raccoon's main page and I scrolled to the bottom of the 
    page. I found a button, **Browse Chef Fat_Raccoon's recipes!**, and I clicked the button. I am now able to see all of the recipes from the chef, Fat_Raccoon.
    + My friend has an account on the Fat Raccoon app and I know her/his username. I opened the Fat Raccoon's main page and put my friend's username into the search bar and now I can see all of my friend's
    uploaded recipes.
    + I opened the Fat Raccoon's main page and I clicked on **Recipes** in the navigation bar. I found a recipe on this page that I liked, however, it wasn't made by the chef, Fat_Raccoon! I did find that 
    if I clicked on the chef's name under the picture of their recipe, it takes me to all the recipes submitted by this chef.
+ I want an easy-to-make recipe.
    + It's been a long day, I'm tired, and I want an easy-to-make recipe for dinner. I opened the Fat Raccoon's main page and I scrolled to the bottom of the page. I found a button, **Browse our Lazy Favorites!**, and I clicked this 
    button. I was greeted with numerous recipes that don't require much effort.
+ I can't remember the name of a recipe that I liked on the Fat Raccoon, and I want to find it again.
    + I opened the Fat Raccoon's main page and I realized that I don't remember the name of the recipe I was looking at last night. I remembered I was logged in, so I logged into my
    Fat Raccoon account. I was taken to my profile page where I easily found the recipe I was looking at last night in my **10 Recently Viewed Recipes** section.
    + I opened the Fat Raccoon's main page and I realized that I don't remember the name of the recipe I wanted to try. I logged into my Fat Raccoon account, and I was taken 
    to my profile page. I don't see the recipe in my **10 Recently Viewed Recipes**, however I did favorite the recipe and easily found it in my **10 Recently Favorited Recipes**
    section.
    + I opened the Fat Raccoon's main page and realized that I don't remember the name of the recipe I wanted to try. I logged into my Fat Raccoon account and I was 
    to my profile page. I don't see the recipe in my **10 Recently Viewed Recipes**. I also did not find the recipe in my **10 Recently Favorited Recipes** section.
    I clicked on my **10 Recently Favorited Recipes** header and I'm taken to a list of all my favorite recipes. I found the recipe there.
+ I lack confidence in my cooking ability and need help.
    + I opened the Fat Raccoon's main page and I realized that I'm completely outside of my comfort zone. I want to try a recipe, but every time I cook something is terrible 
    about the experience. I saw the **Lesson** section in the navigation bar and decided to give it a shot. I found numerous helpful tips that gave me the confidence I needed to 
    try a recipe I was intimidated by.
+ I've decided that I don't like my user bio or avatar anymore and I want to change them.
    + I logged into my Fat Raccoon account and I'm taken to the profile page. I clicked on the **Update Profile** button. I chose a new image from my pc and updated my bio to be a better representation of myself.
     I also had to put in my current password before the form allowed me to submit it. I submitted the form and was taken back to my profile page where I saw the updated avatar and bio.
+ I've uploaded a recipe I don't like anymore and I want to remove it.
    + I logged into my Fat Raccoon account and I'm taken to the profile page. I went to the page of my recipe that I want to delete. I clicked the **Delete Recipe** button and I was prompted to type in the recipe's name.
    I typed in the recipe's name and the delete button turned green. I deleted the recipe. I'm taken back to my profile page where the app lets me know I've deleted the recipe.
+ I deleted my recipe but I forgot to unfavorite it. Now I want to remove it from my profile page's **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** sections.
    + I logged into my Fat Raccoon account and I'm taken to the profile page where I am reminded of my error in my **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** sections. When I clicked on the recipe 
    the app notified me that the recipe has been deleted. I saw that a button next to the recipes on **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** looks like a delete icon. I clicked this icon in both sections 
    and the recipe is removed from my **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** sections.

# Design Choices
## Header and Footer
+ Southern theme:
    + Cutting board logo with stylized engraved text.
    + Southern table runner for background.
    + Social media links are stylized as drinks.
    + Gives users a welcoming southern American themed environment. 
+ Plain Bootstrap navigation bar with integrated search engine.

## Login and Create Account Modal
+ Both login and create account modals are accessible from any non-logged-in page.
+ The form validation notifies users, with comment bubbles, if the information they have inputted doesn't meet the forms criteria. These bubbles greatly improve the users form experience.
+ The form validation:
    + Prevents users from submitting invalid information.
    + Uses a dual-layered JS and Python check before any content is allowed to be uploaded.
    + Checks characters, character length, blank space input, and more.
    + Uses a regex that changes spaces to `_` for password, username, and email inputs.
    + Uses an email validation that:
        + Checks for an appropriate email suffix and that the email address contains a `@`.
            + (Ex. `.com`, `.edu`, `.net`, and `.org`)

## Index
+ Index card carousel:
    + Index cards give a home-made look that is welcoming to users.
    + Each featured ingredient has its own index card.
    + Each index card offers three randomly selected recipes based its featured ingredient which helps undecided users find an appropriate recipe.
+ Grandparent classic Polaroids:
    + The recipes used in this section are all considered classic recipes that are comfort foods created by grandparents.
    + The Polaroid design is meant to give users a feeling of nostalgia because of their dated appearance.
    + The recipe's name is added to the bottom of the picture to let users know what recipe they are viewing.
+ Random recipe section:
    + Quick browsing links are provided to give users ample ideas for cooking.
    + A random recipe, with basic information and an image, is provided to give users an idea of what to cook. This section also contains:
        + A banner describing if the random recipe is a lazy favorite, grandparent classic, or both.
        + The head chef's bio and image to help give the app a welcoming feeling.

## Lessons
+ Index cards:
    + A comment is added to each clickable card to notify users they can click on the card for an effect.
    + Each clickable index card can be flipped over, with most of them containing information on both sides.
    + The information provided on the index cards will give new and experienced cooks some kitchen hints and tricks.

## Profile
+ The Profile has a header with two buttons that allow users to share a new recipe or update their profile.
+ Users can clearly see their own uploaded bio and avatar image which gives users a feeling of personalization.
+ Users have access to their entire upload history and favorited recipe history with a single click of those headers.
+ Users will always be able to see their 10 recently uploaded, favorited, and viewed recipes in their respective containers. These containers help users keep track of recipes they want to return to.

## Recipe
+ If a user is logged in and is the recipe's creator:
    + A User can modify or delete that recipe by using its respective header button.
+ If a user is logged in:
    + A user can favorite a recipe so that they can easily return to it later.
+ A Polaroid picture design is added to the recipe's uploaded image which gives a more appealing visual for users.
+ If a user has not uploaded an image, a default blank will be used instead.
+ All of the recipe's general information is displayed and easily viewed.
+ A recipe's ingredients and steps each have:
    + Their own labeled sticky note container.
    + Each item in these containers has its own check box.
    + Users can click on any part of the item or its check box and it will check the box and cross out the item.
    + The cross out function allows users to keep track of which ingredient(s) they require or what step they are on. 

## All Recipes
+ Lists the entire database of recipes by their featured ingredient. This helps users search for a recipe they want.
+ When a featured ingredient container houses more than five recipes, the list updates to integrate pagination at the bottom of the featured ingredient container.
+ The pagination displays only five recipes at a time. This prevents users from becoming overwhelmed with content.
+ Each featured ingredient container is given a header that consists of the featured ingredient's name. This allows users to easily see what is in each container.
+ Each listed recipe displays its name and total time (combined cook and prep time) to help users decide what they want to make, however, at smaller resolutions it's reduced to just a recipe name to improve UX.
+ Users can click on the featured ingredient header to go to a page containing only those featured ingredients.

## Recipe List
+ Has a single featured ingredient container.
+ When a featured ingredient container houses more than five recipes, the list updates to integrate pagination at the bottom of the featured ingredient container.
+ The pagination displays only five recipes at a time. This prevents users from becoming overwhelmed with content.
+ Each listed recipe displays its name and total time (combined cook and prep time) to help users decide what they want to make, however, at smaller resolutions it's reduced to just a recipe name to improve UX.

## Add Edit Recipes
+ Uses a plain form that is intentionally minimalist. This design allows users to focus on the content they are creating.
+ Users can update every part of a recipe except the boolean tags of lazy favorite and grandparent classic.
+ A recipe can be given the tags of lazy favorite and/or grandparent classic by the app's head chef if the recipe meets the requirements.
+ The form validation notifies users, with comment bubbles, if the information they have inputted doesn't meet the forms criteria. These bubbles greatly improve the users form experience.
+ The form validation:
    + Prevents users from submitting invalid information.
    + The image validation uses JS to check its file size and Python to check its file type.
    + All other input and textareas use JS and Python as a dual-layered check before allowing upload.
    + These checks look at characters, character length, and/or blank space input.
+ The total cook time updates automatically as prep and cook times are adjusted, thus users don't have to calculate the total time themselves.
+ A recipe's ingredients and steps each have:
    + A set of JS add/remove buttons for users to create and remove input boxes as they need.
    + An input/textarea box that is numbered to help users keep track of the ingredient/step number they are on.
    + The header of both sections will keep an active count of the created boxes. This shows users how many boxes have been created.
    + If a user submits a blank entry box (including spaces) the Python validation will remove said box(s).

## Edit User Info
+ Uses a plain form that is intentionally minimalist. This design allows users to focus on the content they are creating.
+ Users are able to update their password, username, email, avatar, and bio.
+ The form validation notifies users, with comment bubbles, if the information they have inputted doesn't meet the forms criteria. These bubbles greatly improve the users form experience.
+ The form validation:
    + Prevents users from submitting invalid information.
    + The image validation uses JS to check its file size and Python to check its file type.
    + All other input and textareas use JS and Python as a dual-layered check before allowing upload.
    + These checks look at characters, character length, and blank space input.
    + A regex changes spaces to `_` for password, username, and email inputs.
    + Uses an email validation that:
        + Checks for an appropriate email suffix and that the email address contains a `@`.
            + (Ex. `.com`, `.edu`, `.net`, and `.org`)
    + Creating a new password will use validation that checks both the new password and the confirm new password are identical.
+ Users wishing to create a new password, must click on the **Create New Password** button. This keeps users from accidently invalidating the form by starting the new password validation. This 
is addressed in **Scalability** and **Other Problems**.

## Search Bar Returns
+ Lists all returned recipes in their own sticky note that is filled with:
    + The recipes general information.
    + A banner gfor **Browse our Grandparent Classics**, **Browse our Lazy Favorites**, or both.
    + This allows users to easily find the recipe they are searching for.
    + A place holder message if the search has no results. This place holder will redirect a user to the home page when clicked on. 
+ This page is used to return four different search type results, that:
    + Return user searches from the search bar. These searches:
        + Are restricted to only searching for recipe name, featured ingredient, and created by.
        + Are used with the **Browse Chef Fat_Racoon's Recipes** button.
        + Do not return recipe ingredients, recipe steps, or recipe description of the requested documents. This is to lesson the burden on the server and improve the clients load time.
    + Return the profile page's recently **10 Recently Favorited Recipes**, and **10 Recently Viewed Recipes** searches. These searches:
        + Use the `$or` operator to find favorite or viewed recipes in a single clean search instead of multiple searches. This is to lesson the burden on the server and improve the clients load time.
    + Return the profile page's **10 Recently Uploaded Recipes** searches. These searches:
        + Do not return recipe ingredients, recipe steps, or recipe description of the requested documents. This is to lesson the burden on the server and improve the clients load time.
    + Return the browse button searches for **Browse our Grandparent Classics** and **Browse our Lazy Favorites**. These searches:
        + Use the `$eq` operator to find boolean tags.
        + This search is only capable of looking for true boolean values.

## Page Performance
+ The Fat Raccoon app has a responsive design across all devices.
![Responsiveness image of the Fat Raccoon's random recipe](static/readme/testing/responsive-fat-raccoon.jpg "Responsiveness image of the Fat Raccoon's random recipe")
+ All developer uploaded images are tinyified to reduce image download times and improve UX.
![TinyPNG helps reduce file size and improves UX](static/readme/testing/tinyify.jpg "TinyPNG helps reduce file size and improves UX")

## Wireframe and Live Demo
### Wireframe
+ Each wireframe contains curly brackets that give a description of its contents and what the filler (missing database data) content should be.
![Wireframe of the index page](static/readme/wireframe/index-page-large.png "Wireframe of the index page")
+ [Balsamiq](https://balsamiq.com/) was used for the planning process and wireframe creation.
+ Wireframes were made for all predetermined size variations of the application.
+ Wireframes were made for the models to streamline their design. This also allowed for the models to be shown without over complicating the wireframe design.
+ [Click here to view all wireframes associated to this project.](static/readme/wireframe "Location of wireframes")

### Live Application
+ A fully functioning application can be found on [Heroku](https://fat-raccoon.herokuapp.com/ "Deplayment location").
![Index page of the Fat Raccoon](static/readme/demo/demo-index-large.jpg "Index page of the Fat Raccoon")
+ [GitHub's](https://github.com/) IDE [GitPod](https://www.gitpod.io/) was used for the construction process.
+ GitHub houses the [master branch](https://github.com/Richardaeld/Fat_Racoon_Kitchen).

## Scalability
+ Validation has two options for improvement:
    + Option one, improve the current validation system. That would entail:
        + Unifying Python and JS validation for images. This would improve the UX when a user tries to upload an incorrect image filetype.
        + Improveing email validation to accept a wider range of email suffixes (ex. regional suffix, .uk, .fr, .de). This would allow for a larger audiance of users.
        + Improveing JS validation to use compartmentalized validation instead of the current prepackage system. That would entail:
            + That validation classes could be applied independently of one another, and could have their expected values set in them.
                + (ex. charMax-20)
                + (ex. charMax-100)
                + (ex. charMax-400)
            + This type of dynamic validation system would improve the overall readability and function of the JS validation code.
    + Option two, update to a validation system that only uses Python. That would entail:
        + Implementing WTForms and would allow Python to actively check if an email is real. This would also remove the need for a suffix check system.
        + Implementing Pillow and would allow python to actively resize an uploaded image and not just refuse one. This would greatly improve a user's experience with uploading images.
        + The role of JS would be reduced to only visual cues for what data is expected to be input and would greatly reduce the amount of JS code and its complexity.
        + This would also make the forms more secure.
+ Adding user selectable filters to the search bar. This would ensure a better more efficient user search.
+ Expand recipe pages to show the recipe creator's bio and/or avatar. This would give users more pride in their content.
+ Create a user comment form for the recipes. This would give a better sense of community for users.
+ Create a user rating system for the recipes. This would give a better sense of community for users.
+ Improve search engine to accept a **space** as an `_` to help users more easily find chefs with a single or multiple "space(s)" in their name.

# Technology Languages
+ HTML - Skeleton frame of the application.
+ CSS - Beautifies the skeleton (HTML).
+ JavaScript - Allows for user interaction and limited dynamic function on the application.
+ Python - Allows dynamic function and back end programs to run. These programs (frameworks, libraries, and databases) are:
    + Flask - Allows use of templating, security, user searching, and other critical functions.
    + Pymongo - Allows Flask (Python) to communicate with MongoDB.
    + PythonDNS - Allows for DNS data transfer.
    + Werkzeug - Encrypts data as it is sent between the user and server.
    + Datetime - Allows Python to take a date/time stamp.
    + Random - Allows for a random number generator.
+ MongoDB - NoSQL database that the application communicates with and stores information on.

# Testing
## Developer Testing Specifications
### Developer Tested Systems
+ Windows 10 (Chrome 87**, Edge 87**, Firefox 84**)
    + Chrome
        + Developed in Chrome.
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
        + Tested in landscape, which is tablet responsiveness level.
        + Tested in portrait, which is Mobile responsiveness level.
+ iPad, 5th gen 13.3(Safari 13**)
    + Safari
        + Tested in landscape, which is tablet responsiveness level.
        + Tested in portrait, which is tablet responsiveness level.

### Developer Testing Methods
+ Every test of **Developer Tests** was preformed on the above listed systems and the specified screen orientation.
+ The tester will perform each test of **Developer Tests** three times: 
    + Once in landscape.
    + Once in portrait.
    + Once with random moments of spam clicking and switching between landscape/portrait. This final test is critical to insure tablet and mobile users have an enjoyable experience.

## Developer Tests
### Testing Random Recipe

---

#### Tests User Story
+ I want to find a recipe for dinner. <!-- Testing Random Recipe -->

#### Expectation(s):
1. The recipe displayed in random recipe is actually random.
1. The random recipe's banner functions correctly.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will keep performing this test until they see a classic banner, a favorite banner, and a favorite/classic banner.
1. The tester has a list of recipes that contain the favorite, classic, and favorite/classic boolean tag.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Scroll to the bottom of the page.
1. Click the **random recipe** to make sure it links to the proper recipe.
1. Repeat steps 1 - 3 approximately five times to check for randomization of recipe.

#### Document Result(s):
1. If any links are broken, record:
    + The test name, recipe name, and a brief description of the problem.
1. If any recipe displays an incorrect banner, record:
    + The test name, recipe name, banner anticipated, banner displayed, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Text Coss Out Function

---

#### Tests User Story
+ I want to use my smart phone or tablet as a recipe book. <!-- Testing Text Coss Out Function -->

#### Expectation(s):
1. The content of the **Recipe Steps** and **Recipe Ingredients** sections crosses out correctly.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester knows the size for each clickable area that causes the cross out effect and will be choosing a different place to click every time.
1. The tester knows multiple ways to get to a recipe's page.
1. The tester is not repeatingly using the same path to a recipe page.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Navigate to a recipe page of the testers choosing.
1. Scroll to the **Recipe Ingredients** section and click a check box or text to see if it crosses out correctly.
1. Scroll to the **Recipe Steps** section and click a check box or text to see if it crosses out correctly.
1. Repeat steps 2 - 4 approximately three times. (Choose a different path to the recipe page each time or until all known paths are used).

#### Document Result(s):
1. If the content from the **Recipe Steps** or **Recipe Ingredients** sections does not cross out properly, record:
    + The test name, recipe name, **Recipe Steps** and/or **Recipe Ingredients** (which ever one was problematic), and a brief description of the problem.
1. If any links are broken, record:
    + The test name, recipe name, choice of path to said recipe, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing All_Recipe And Recipe_List Pagination

---

#### Tests User Story
+ I want to find a new chicken dish to cook. <!-- Testing All_Recipe And Recipe_List Pagination-->

#### Expectation(s):
1. Pagination appears when its supposed to.
1. Pagination doesn't obscure any content.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will create dummy recipes for this test (if necessary), and keep a record of the dummy recipes.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Recipes** on the navigation bar. (This is the Jinja template, **All_Recipes**)
1. Find any featured ingredient container that contains a pagination `ul` (or make some recipes to trigger pagination).
1. Click through five random pagination numbers of the pagination `ul`.
1. Repeat step 4, for one other featured ingredient with a pagination `ul`.
1. Find any featured ingredient container with a pagination `ul` and click on the **Featured Ingredient** header. (This will open the Jinja template, **Recipe_List**.)
1. Click through five random pagination numbers of the pagination `ul`.
1. Repeat steps 2, 6, and 7 approximately one time.

#### Document Result(s):
1. If a user account was created to fullfill the test's requirments, record:
    + The username, email address of the account, and that this is a test account.
1. If any recipe dummy data was created to fullfill the test's requirments, record:
    + The names of all of the recipes created, the username of the account that created the recipes, and that they are all dummy data.
1. If any pagination has bad UX, record:
    + The test name, recipe name, featured ingredient, screen resolution, browser/device, page (**All_Recipes** or **Recipe_List**), pagination number, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Recipe Upload

---

#### Tests User Story
+ I want a place to leave a recipe, so I can easily find it later. <!-- Testing Recipe Upload -->

#### Expectation(s):
1. The recipe uploads without error.
1. The recipe displays correctly on its page.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will intentionally try to submit incorrect data to check for incorrect validation.
1. The tester will create an account for this test, and will keep a record of the account.
1. The tester has a PNG or JPG image under 500kb, a PNG or JPG image over 500KB, a non PNG or JPG image file under 500KB, and a none PNG or JPG image file over 500KB.
1. The tester knows the difference between JS and Python validation.
1. The tester knows what this form considers invalid and will check every part of the validation. (Example, max character, min character, spaces, characters, etc....)

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Login** on the navigation bar.
1. Click on the **Create Account** tab.
1. Fill out all the appropriate information and submit said information.
1. Once the **Profile** page is loaded, click on the **Share Recipe** button.
1. Fill out all the appropriate information, including an avatar, and submit the new recipe.
1. Once the new recipe page is loaded, check over the newly created recipe for all appropriate information.
1. Navigate back to the **Profile** page and click on the **Share Recipe** button.
1. Fill out the form with all appropriate information, including an avatar.
1. Choose one element of the form to incorrectly fill out and attempt to submit.
1. Repeat step 10 until all of the form's user inputs (recipe name, prep time, cook time, recipe description, recipe ingredients, and recipe steps) have had their validation tested. 
1. Attempt to submit same recipe with a PNG or JPG image over 500KB, a non PNG or JPG image file under 500KB, and a none PNG or JPG image file over 500KB.
1. Return to the original submitted recipe's page.
1. Click on the **Edit Recipe** button.
1. Repeat steps 9 - 12.

#### Document Result(s):
1. A user account was created to fullfill the test's requirments, record:
    + The username, email address of the account, and that this is a test account.
1. If any form of validation fails, record:
    + The test name, any input/textarea that incorrectly accepted or refused information, what form of validation failed (type of validation and if was JS and/or Python), if it was a new recipe or edited recipe, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Search Chef Name

---

#### Tests User Story
+ I want help deciding what to cook for dinner and I like a specific chef's recipes. <!-- Testing Search Chef Name -->

#### Expectation(s):
1. The chef searches return the correct information.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester knows all the recipes that belong to the chef Fat_Raccoon.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on the navigation bar's search bar.
1. Input, "Fat_Raccoon" into the search bar and submit.
1. Check over the returns to make sure all appropriate returns are shown.
1. Return to the **Index Page** of the Fat Raccoon.
1. Scroll to the bottom of the page, where the **Random Recipe** is located.
1. Click on the chef's name, Fat_Raccoon, which is under the recipe's name.
1. Check over the returns to make sure all appropriate returns are shown.
1. Return to the **Index Page** of the Fat Raccoon.
1. Scroll to the bottom of the page, where the **Random Recipe** is located.
1. Find the sticky note with **Head Chef** on it and click on the text, Fat_Raccoon, which is at the bottom of that sticky note.
1. Check over the returns to make sure all appropriate returns are shown.
1. Select any recipe from the chef Fat_Raccoon and go to that recipe's page.
1. Under the avatar image, click on the name, Fat_Raccoon.
1. Check over the returns to make sure all appropriate returns are shown.
1. Return to the **Index Page** of the Fat Raccoon.
1. Scroll to the bottom of the page, where the **Random Recipe** is located.
1. Click on the **Browse Fat_Raccoon Recipes** button.
1. Check over the returns to make sure all appropriate returns are shown.

#### Document Result(s):
1. If there is is any broken links or incorrect recipe returns, record:
    + The page (Jinja template), location on the page where the link can be found, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Browse Button for Lazy Favorites Recipes

---

#### Tests User Story
+ I want an easy-to-make recipe. <!-- Testing Browse Button for Lazy Favorites Recipes -->

#### Expectation(s):
1. All recipes with the lazy favorite boolean tag are returned.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. Tester knows all recipes tagged as lazy favorite.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Scroll down to the **Random Recipe** section.
1. Click on the button **Browse our Lazy Favorites!**.
1. Check over the returned recipes to make sure all appropriate recipes are shown.

#### Document Result(s):
1. If any lazy favorite recipes are not shown or non lazy favorite recipes are shown, record:
    + Any lazy favorite recipes that are missing, incorrect recipes that have shown up, and a brief description of the problem. 
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Recipe Favorites Function

---

#### Tests User Story
+ I can't remember the name of a recipe that I liked on the Fat Raccoon, and I want to find it again. <!-- Testing Recipe Favorites Function -->

#### Expectation(s):
1. The favorite icon responds appropriately to recipe status of favorite and unfavorite.
1. The tester knows the entire click box allocated to changing the favorite status of a recipe.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will create an account for this test, and will keep a record of this account.
1. the tester knows the difference between a favorite recipe and an unfavorite recipe icon.
1. The tester will favorite and unfavorite a recipe using a random part of its click box.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Login** on the navigation bar.
1. Click on the **Create Account** tab.
1. Fill out all the appropriate information and submit said information.
1. Navigate to any recipe of the testers choice.
1. Click on **Not a Favorite** or its icon.
1. Check to be sure the accurate text and icon appear.
1. Navigate to a different non favorited recipe page.
1. Click on **Not a Favorite** or its icon.
1. Check to be sure the accurate text and icon appear.
1. Navigate to the **Profile** page.
1. Click on any favorited recipe in the **10 Recently Favorited Recipes** section and go to that recipe's page.
1. Check for the appropriate favorite status and icon.
1. Click on **Favorite** or its icon.
1. Check for appropriate favorite status and icon.
1. Navigate to the **Profile** page.
1. Click on the header for the **10 Recently Favorited Recipes** section.
1. Check for the appropriate recipe(s).

#### Document Result(s):
1. A user account was created to fullfill the test's requirments, record:
    + The username, email address of the account, and that this is a test account.
1. if Favorite status or icon is displayed incorrectly, record:
    + The test name, recipe name, path choosen to the recipe, and a brief description of the problem.
1. If click box for changing favorite status does not respond correctly, record:
    + The test name, recipe name and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Index Cards on Lesson Page

---

#### Tests User Story
+ I lack confidence in my cooking ability and need help. <!-- Testing Lessons Index Cards -->

#### Expectation(s):
1. Index cards rotate appropriately and have a good UX.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester knows that every index card with two sides of information must have **More on back-->** on it.
1. The tester knows the content of each **Lesson** card.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Lesson** on the navigation bar.
1. Click every single index card and make sure the text is appropriately displayed on both sides.

#### Document Result(s):
1. If text is present on both sides of the index card and **More on back-->** is missing from the face, record:
    + The test name, the header of the index card, and a brief description of the problem.
1. If any index card has poor UX, record:
    + The test name, the side it was experienced on, the header of the index card, the resolution, browser/device used, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Profile Updates

---

#### Tests User Story
+ I've decided that I don't like my user bio or avatar anymore and I want to change them. <!-- Tests update of user information/avatar -->

#### Expectation(s):
1. A Fat Raccoon account can be logged out and logged back in with a new password.
1. A user account can be created and modified.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will create an account for this test, and will keep a record of said account.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Login** on the navigation bar.
1. Click on the **Create Account** tab.
1. Fill out all the appropriate information and submit said information.
1. Click on the **Update Profile** button.
1. Click on the **Create New Password** button.
1. Upload an avatar, enter a bio, the current password, a new email, a new username and a new password in both the new password and confirm new password areas. Then submit all the data.
1. View all submitted data and check for accuracy.
1. Click on **Logout** on the navigation bar.
1. Click on **Login** on the navigation bar and enter new login information.
1. Click on the **Update Profile** button.
1. Upload a new avatar, a new bio, the current password, and submit.
1. View all submitted data and check for accuracy.

#### Document Result(s):
1. A user account was created to fullfill the test's requirments, record:
    + The current username and email address of the account (labeled as current), the previous username and email address (labeled as previous), and that this is a test account.
1. If any user profile content does not update properly, record:
    + The test name, the header of the content that does not update correctly and a brief description of the problem.
1. If unable to log back into the test account, record:
    + The test name, the current username and email address of the account (labeled as current), the previous username and email address (labeled as previous), and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Delete Recipe - Full C.R.U.D. Test

---

#### Tests User Story
+ I've uploaded a recipe I don't like anymore and I want to remove it. <!-- Tests for deletion of recipe --><!-- Tests C.R.U.D. -->

#### Expectation(s):
1. A recipe will be created, viewed, edited, and deleted.
1. A missing recipe message is flashed when a user tries to view a deleted recipe.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will create an account for this test, and will keep a record of the account.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Login** on the navigation bar.
1. Click on the **Create Account** tab.
1. Fill out all the appropriate information and submit said information.
1. Once the **Profile** page opens, click on the **Share Recipe** button.
1. Fill out all the appropriate information, including an avatar, and submit the new recipe.
1. Check over newly created recipe for all appropriate information.
1. Favorite the recipe.
1. Click the **Edit Recipe** button.
1. Enter all new information, including a new avatar, and submit the updated recipe.
1. Check over the newly edited recipe for all updated information.
1. Click the **Delete Recipe** button.
1. Enter recipe's name and click the modal's **delete** button.
1. Once the **Profile** page opens, click on the deleted recipe's name in the **10 Recently Favorited Recipes** or **10 Recently Viewed Recipes**.
1. The application should prompt you with the response, "Sorry this recipe has been removed".

#### Document Result(s):
1. A user account was created to fullfill the test's requirments, record:
    + The username, email address of the account, and that this is a test account.
1. If the recipe created was not viewable, record:
    + The test name, recipe name and a brief description of the problem.
1. If the recipe did not update properly, record:
    + The test name, recipe name, the content that didnt update correctly, and a brief description of the problem.
1. If the recipe did not delete properly, record:
    + The test name, recipe name and a brief description of the problem.
1. If the missing recipe message did not flash, record:
    + The test name, recipe name, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

### Testing Delete Button for Recipes on Profile Page

---

#### Tests User Story
+ I deleted my recipe but I forgot to unfavorite it. Now I want to remove it from my profile page's **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** sections. <!-- Tests delete button for favorites/recents in profile -->

#### Expectation(s):
1. The button that removes a recipe from the **10 Recently Favorited Recipes** or **10 Recently Viewed Recipes** sections functions properly.
1. The page content fills appropriately and doesn't spill out beyond obvious borders.
1. The page content doesn't overlap and is easily read.

#### Assumption(s):
1. The tester will create an account for this test, and will keep a record of the account.
1. The tester will use different dummy information per recipe, and will keep a record of all dummy recipes.
1. The tester knows how to favorite a recipe.
1. The tester knows how to remove a recipe from **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes**.

#### Testing Step(s):
1. Load the **Index Page** of the Fat Raccoon.
1. Click on **Login** on the navigation bar.
1. Click on the **Create Account** tab.
1. Fill out all the appropriate information and submit said information.
1. Once the **Profile** page opens, click on the **Share Recipe** button.
1. Fill out all the appropriate information, including an avatar, and submit the new recipe.
1. Favorite this recipe.
1. Go to the **Profile** page and click on the **Share Recipe** button.
1. Fill out all the appropriate information, including an avatar, and submit another new recipe.
1. Favorite this recipe.
1. Repeat steps 8 - 10, five times.
1. Go to one of these newly created recipe's page and delete the recipe.
1. Once the **Profile** page opens, click on the deleted recipe's name in the **10 Recently Favorited Recipes** or **10 Recently Viewed Recipes** sections and be sure the missing recipe message flashes.
1. Removes the recipe from the **10 Recently Favorited Recipes** section and again in the **10 Recently Viewed Recipes** section using the remove icon.
1. Check to be sure the appropriate recipes were removed from the **10 Recently Favorited Recipes** and **10 Recently Viewed Recipes** section lists.

#### Document Result(s):
1. A user account was created to fullfill the test's requirments, record:
    + The username, email address of the account, and that this is a test account.
1. Recipe dummy data was created to fullfill the test's requirments, record:
    + The test name, the names of all of the recipes created, the username of the account used to create the recipes, which recipes were deleted by the tester, and that these are dummy data.
1. If the remove recipe icon in the **10 Recently Favorited Recipes** or **10 Recently Viewed Recipes** sections does not function properly, record:
    + The test name, recipe name, the account username, screen resolution, browser/device, and a brief description of the problem.
1. If any content has bad UX, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the bad UX.
1. If there is an incorrect box shadow, record:
    + The test name, recipe name, screen resolution, browser/device, page (Jinja template), and a brief description of the incorrect box shadow.

## Program Tests
### BrowserStack
+ Allows a wide range of devices to be quickly and easily tested.
+ [Google Nexus 5 - Default Browser](static/readme/testing/browserstack/4.4_Google-Nexus-5_portrait_real-mobile.jpg)
+ [OS X Big Sur - Chrome 71](static/readme/testing/browserstack/macbsr_chrome_71.0.jpg)
+ [Windows 10 - Chrome 71](static/readme/testing/browserstack/win10_chrome_71.0.jpg)

### Lighthouse
+ Identifies problems with performance, accessibility, best practices, and SEO.
![Light house results](static/readme/testing/lighthouse-fat-raccoon.jpg "Light house results")

### JigSaw
+ Identifies errors in CSS
![Jigsaw results](static/readme/testing/w3c-jigsaw.jpg "Jigsaw results")
+ Errors are present for some of the CSS art but MDN shows they are not a problem.
    + A background "stacking gradient" example can be seen at [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients#stacked_gradients).
    + A background "repeating linear gradient" example can be seen at [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images/Using_CSS_gradients#Repeating_linear_gradients).
+ Warnings are present for some of the vendor extensions but those extensions are necessary and the errors can be ignored.

### W3C Validator
+ Identifies errors in HTML.
+ Helpful for proper semantic HTML and ARIA practice.
![W3C validator results](static/readme/testing/w3c.jpg "W3c validator results")

### JSHint
+ Identifies errors in JS.
![JSHint results](static/readme/testing/jshint.jpg)
+ Pagination's function flags a warning, because a second function is imbedded within it. This `<array>.forEach()` function is imbedded because of the original design and is a technical oversight.
    + This issue is addressed in the **Other Problems** section.

# Bugs and Other Problems
## Previous Bugs
+ A recipe page would redirect to an error page if refreshed.
    + Caused by:
        + A user refreshing the recipe page after changing the recipes favorite status.
    + Fix:
        + Created a Python function, `check_for_dups`, to check boolean status of favorite (even in refresh).
        + Now instead of redirecting to an error page it changes the favorite status of the recipe.
+ Flask was generating a 504 gateway timeout error.
    + Caused by:
        + A `while` loop not breaking correctly.
    + Fix:
        + Added a missing `len()` function. This changed a string value into a comparable int value.
+ Carousel would post an incorrect amount of index cards the on screen.
    + Caused by:
        + Changing screen width or resolution size.
    + Fix:
        + The carousel's 'memory' array had to reset each time the screen resolution changed.
+ Corner of the napkin CSS art was an incorrect size in the Safari browser.
    + Caused by:
        + A missing vendor extension.
    + Fix:
        + Had to add `-webkit-clip-path` for the Safari browser.
+ Index card CSS art had jagged edges after `transform: rotateY(180deg)` was applied.
    + Caused by:
        + A missing vendor extension.
    + Fix:
        + A recommended line of code, `-webkit-backface-visibility:hidden` [from stackoverflow](https://stackoverflow.com/questions/6492027/css-transform-jagged-edges-in-chrome).
+ Heroku would not upload correctly.
    + Caused by:
        + GitPod incorrectly creating the Procfile.
    + Fix:
        + Adding the missing space after the colon in the Procfile.
+ Updating (editing) a recipe would create a new recipe.
    + Caused by:
        + Forms having the same Flask route and relying on an `if` statement to sort them properly.
    + Fix:
        + Created an additional route for updating a recipe, so both create and update each had separate routes.
+ Email's JS validation wouldn't validate.
    + Caused by:
        + `type: email` was preventing the regex from functioning properly.
    + Fix:
        + Changing the `type: email` to `type: text`. 
+ Login/create modal would only function on `index.html`.
    + Caused by:
        + The model was only written on `index.html`.
    + Fix:
        + Login/create modal was added to `base.html` and removed from `index.html`.
+ The original search bar would display on a separate line below the navigation bar when the resolution was at tablet responsiveness level or smaller. 
    + Caused by:
        + Unknown.
    + Fix:
        + Replaced the original navigation bar with a Bootstrap navigation bar.

## Current Bugs
+ Social links animation triggers continuously when a user mouses over.
    + Caused by:
        + Multiple containers stacked on top of one another to create the CSS art. This creates a JS bubbling effect.
    + Attempted fix(s):
        + Limiting the bubbleing phenomena with a single "top" level container, limition of trigger function (`stopPropagation()`), and other methods.
    + Thought(s):
        + If the animation triggers once this would be a viable solution, however this solution was over looked because it decreased the "wow" factor of the animation.
+ Social links animation is off center on the Safari Browser.
    + Caused by:
        + Unknown.
    + Attempted fix(s):
        + Different vendor prefixes.
    + Thought(s):
        + Uncertain how to fix this for Safari browsers
+ `sticky-note-right`'s pseudo-element (`:before`) has a `box-shadow` that extends over the sticky note on Safari browsers.
    + Caused by:
        + A sticky note container being to tall.
    + Attempted fix(s):
        + None.
    + Thought(s):
        + Problem disappeared after HTML structure was rewritten to make proper use of Bootstrap's `container` and `container-fluid` classes.
+ Sticky note's pseudo-element(s) have a `box-shadow` that occasinally displays its transparent body.
    + Caused by:
        + Containers that are too tall, too wide, too short, and/or too thin.
    + Attempted fix(s):
        + Containers with a minimum and maximum base size were created (`<size>-content-height`).
        + The pseudo-element(s) and `box-shadow` were updated to allow for greater variation in their container size.
    + Thought(s):
        + The attempted fixes only minimized appearance of the bug.
        + More reduction in the size of the pseudo-element(s) and an increase in the size of the `box-shadow` could remove this bug further. However, it will take a considerable amount of time to find this "golden-ratio" for all screen resolutions and browser/device combinations.

## Other Problems
+ Lack of accepted email suffixes (email validation).
    + Caused by:
        + Limitations of the JS validation logic.
    + Attempted fix(s):
        + Expanded suffixes allowed to include `.net` and `.org`.
    + Thought(s):
        + Email validation should be handled by Python only, instead of JS and Python. This could allow Python to check if the email account is real and remove the reliance on suffixes for validation.
+ MongoDB's general user search, `mongo.db.<collection>.find("$text": "$search": <value>)`, is unable to return booleans. Thus, users are not able to search for the grandparent classic or lazy favorite boolean tags.
    + Caused by:
        + MongoDB code.
    + Attempted fix(s):
        + A set of browse buttons were added to `index.html`. These buttons have a preset search value that uses the operator `$eq`, thus they are able to return boolean tags.
    + Thought(s):
        + If more time was available, the addition of filters to the search bar would have been a better solution than the addition of the browse buttons.
+ Current validation system needs to be changed or updated.
    + Caused by:
        + Original poor design. This design incorporated JS as the primary validator with HTML and Python acting as backup validatation.
        + Limitations in JS to validate email information properly.
    + Attempted fix(s):
        + Removed all HTML's validation.
        + Adjusted JS and Python validation to be more compatible with each other. 
    + Thought(s):
        + Two options are detailed in **Scalability**.
+ Pagination's JS structure could be revised.
    + Caused by:
        + The original pagination function has an imbedded inner function and is a technical inefficient design.
    + Attempted fix(s):
        + None.
    + Thought(s):
        + This could be fixed by moving the inner function, however all the dummy data had been removed from the database by the time this error had been discovered. Thus a newly reconstructed pagination function could not be appropriately and time efficiently tested.
        + Although technically inefficient, this imbedded function is only used in pagination and isn't required anywhere else.
+ Needed a triangle shaped container that could hold a `repeating-linear-gradient`.
    + Caused by:
        + A specific artistic need in CSS.
    + Attempted Fix(s):
        + Originally tried using `<svg><polygon></svg>`, however this would not hold or duplicate an acceptable `repeating-linear-gradient`.
    + Thought(s):
        + Found solution at [MDN using a clip-path:polygon](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path).
+ If a user has over ten favorited recipes they might not be able to delete a recipe from their profile's favorite list.
    + Caused by:
        + Having over ten favorite recipes and wanting to remove a recipe that's outside the **10 Recently Favorited Recipes**'s ten recipe ceiling.
    + Attempted Fix(s):
        + None. This was discovered to late in project to attempt a fix.
    + Thought(s):
        + The original fix, added the ability to remove recipes from the users favorite list while the user was on their profile page. This was added to allow users to remove recipes that had been deleted and would not be 
        otherwise removable from their favorites list.
        + The narrow scoped fix doesn't take into consideration if a user has over ten favorites and one of the original favorite recipes was deleted.
        + Expanding upon the Jinja template `search_bar_returns.html` to allow removal of a favorite recipe would be a fix for this issue.

# Deployment
## Deploy Clone in GitHub - GitPod
+ Go to the location of the original repository in GitHub, [https://github.com/Richardaeld/Fat_Racoon_Kitchen](https://github.com/Richardaeld/Fat_Racoon_Kitchen).
+ Click on the **Code** button to get the drop down menu.
+ Copy the HTTPS address provided.
+ Create a new GitHub/GitPod project (to house the new clone) and then open this new project.
+ Go to the Bash and type, `git clone <HTTPS>`, paste the HTTPS address found in the GitHub page (don't forget the space after "clone"), and press enter.
+ A clone will be created within a new folder called, "Fat_Racoon_Kitchen" (name of the original repository).
+ Unpack everything from this new folder to the root of the GitPod project tree and the project will be setup within GitPod (minus the database which we will setup shortly).
+ Open the file `run.py` and search for "head_chef".
+ Update the "fat_raccoon" to your new head chef's in-app username.

## Setup Structure on GitPod for Developers
### Flask
+ Install Flask:
    + In bash (of GitPod clone) type, `pip3 install Flask` and press enter.
+ Create Python env file:
    + Create a new file called `env.py` in root directory of GitPod clone.
        + Add the text `env.py` to the list within the `gitignore` file (NEVER PUSH THIS FILE). If `gitignore` does not exist, create it in the root directory of the GitPod clone.
        + Add the text `__pycache__/` to the list within the `gitignore` file (NEVER PUSH THIS FILE)
            + Within `env.py` create the lines:
                + `import os`
                + `os.environ.setdefault("IP", "0.0.0.0")`
                + `os.environ.setdefault("PORT", "5000")`
                + `os.environ.setdefault("SECRET_KEY", "")`
                    + This missing value can be created with [RandomKeygen](https://randomkeygen.com/)
                + `os.environ.setdefault("MONGO_URI", "")`
                    + This missing value will be added after MongoDB database creation.
                + `os.environ.setdefault("MONGO_DBNAME", "<root database>")`
                    + This missing value will be added after MongoDB database creation.

### PyMongo
+ Install PyMongo:
    + In bash (of GitPod clone) type, `pip3 install flask-pymongo` and press enter.
    + In bash (of GitPod clone) type, `pip3 install dnspython` and press enter.

## Heroku Deployment
+ Log into Heroku.
+ Create a new app on Heroku by clicking **New** and following the directions.
+ Prep your GitPod repository for Heroku:
    + Go to your GitPod project that houses the clone from the previous section. 
        + In bash (of GitPod clone) type, `pip3 freeze --local > requirements.txt` and press enter.
        + In bash (of GitPod clone) type, `echo web: python run.py > Procfile` and press enter.
            + Check contents of Procfile, because two problems can occur:
                + If the opened Procfile has a blank line at the bottom, delete this line.
                + Be sure there is a space after the colon in the Procfile.
        + This creates the two files needed for Heroku to identify what it needs to run the app.
+ Link Heroku and GitHub:
    + Log into Heroku.
    + From the **Personal apps** page, click on the new app that was just created in Heroku.
    + Click on **Deploy**.
    + Click on **GitHub** from **Deployment method** section.
    + Enter your GitHub information and the name of the cloned repository into the "Connect to GitHub" section.
+ Share `env.py` information with Heroku.
    + Click on **Settings**.
    + Click on **Reveal Config Vars** from **Config Vars** section.
    + Add all of the `env.py` key and value pairs without their quotations. 
        + (Ex. key - `IP`)
        + (Ex. value - `0.0.0.0`)
+ Enable automatic deployment or manually deploy updates.
    + Automatic Deployment:
        + Click on **Deploy**.
        + Click on **Enable Automatic Deploys** in **automatic deploys** section.
        + Click on **Deploy Branch** in **manual deploy** section to start initial deployment.
    + Manual Deployment:
        + Click on **Deploy Branch** in **manual deploy** section any time there is content you want to update the active app with.

## Database Build
### Database Structure
+ Log into MongoDB.
+ Click on **Create a New Cluster** button (in top right corner).
    + Follow directions.
+ Click on **Collections** in your new cluster.
+ Click on **Create Database**.
    + Create your inital `<root database>` and it's first collection, "users"
    + Click your `<root database>`'s name.
    + Click **Create Collection** and create remaining necessary collections: "blank", "feature", and "recipes".
+ Create index (for user search restrictions). This can be input through GitPod or MongoDB.
    + MongoDB:
        + Click on the `<root database>`'s name.
        + Click on **recipes** collection.
        + Click on **Indexes** in the information secton for **recipes**.
        + Click on **Create Index**.
        + Create the index using the below format.
        + `{`
        +   `name: text,`
        +   `feature: text,`
        +   `created_by: text`
        + `}`
    + GitPod:
        + In bash (of GitPod clone) type, `python3` and push enter.
        + In bash (of GitPod clone) type, `from <app name> import mongo` and push enter.
        + Using the below format type in the 'names' of the content users are allowed to search through (Ex. <collection> == recipes, <name> == created_by, <name2> == name, <name3> == feature).
        + `mongo.db.<collection>.create_index([('<name>', 'text'), ('<name2>','text'), ('<name3>','text')])`

### Connecting to Database
+ Find URI.
    + Log into MongoDB.
    + Click on the **Connect** button.
    + Click on the **Connect your application** button.
    + Select driver (Python) and version (of Python).
    + Copy string provided.
+ Update missing information in GitPod.
    + Open the GitPod repository that contains the clone and open `env.py` file.
    + Paste this string into the value for the key `MONGO_URI`.
    + Update the pasted string with the collection name(<DBname>) and the password for the cluster (<password>).
    + When you have replaced <DBname> and <password> copy the string.
    + Type in the `<root database>`'s name as the value for the key `MONGO_DBNAME`.
+ Update missing information in Heroku.
    + Log into Heroku.
    + Select the new app that was previously created.
    + Click on **Settings**.
    + Click on **Reveal Config Vars** from **Config Vars** section.
    + Paste in copied string from GitPod into the value for the key `MONGO_URI`.
    + Type in the `<root database>`'s name as the value for the key `MONGO_DBNAME`.

### Create the Appropriate Documents
+ Blank:
    + This is where the blank dictionary base for new users and new recipes is stored.
    + Two entries are required to be here.
    + The mongo `_id` auto assign is fine for both entries.
    + The value, `Array` is MongoDB assigned as `Array` and its type must be changed from `string`.
    + The value, `null` is MongoDB assigned as `Null` and its type must be changed from `string`.
    + The value, `false` is user input and can be assigned after its type has been changed from `string` to `boolean`.
    + Recipe entry is structured as:
        + `{`
        + `_id: <auto assigned value>`
        + `name: ""`
        + `feature: "chicken"`
        + `ingredients: Array`
            + `0: ""`
        + `steps: Array`
            + `0: ""`
        + `time: Array`
            + `0: ""`
        + `date: ""`
        + `text: ""`
        + `avatar: null`
        + `avatar_id: null`
        + `grandparent: false`
        + `lazy: false`
        + `created_by`
        + `}`

    + User entry is structured as:
        + `{`
        + `_id: <auto assigned value>`
        + `username: "user"`
        + `email: ""`
        + `password: ""`
        + `avatar: null`
        + `avatar_id: null`
        + `bio: ""`
        + `admin: false`
        + `recents: Array`
        + `favorites: Array`
        + `date: ""`
        + `}`

+ The feature collection:
    + The feature collection stores the applications featured ingredients.
    + There must be a minimum of one featured ingredient document in the feature collection for the application to function.
    + For the best UX, a featured ingredient document amount of approximately ten is advised. However, more would also be acceptable.
    + Each featured ingredient is structured as:
        + `{`
        + `name: "chicken"`
        + `}`
+ The recipes collection:
    + The recipe collection stores the applications recipes.
    + There is no set number of documents for the application to function properly, however a better UX is provided when the head chef of the application has several recipe documents entered.
+ The users collection:
    + The users collection stores the applications user information.
    + There is no set number of documents for the application to function properly, however a better UX is provided if the application has a set head chef.
    + It is also recommended that the head chef's admin status in MongoDB be set to `admin: true`. The admin status will allow the head chef to quickly and easily alter inappropriate recipes or images.
+ The fs.chunks collection:
    + Will be created automatically after the first image is uploaded.
    + The fs.chunks collection is for the storage of image data.
+ The fs.files collection:
    + Will be created automatically after the first image is uploaded.
    + The fs.files collection is for the storage of image file data.

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
    + A framework used to help speed up development and provide a better overall UX.
+ [Flask](https://flask.palletsprojects.com/en/1.1.x/)
    + A basic guide to the current version of Flask.
+ [MongoDB](https://docs.mongodb.com/manual/)
    + A basic guide to MongoDB's syntax and function.
+ [MDN Web Docs](https://developer.mozilla.org/en-US/)
    + Invaluable source of information about JavaScript, HTML, and CSS.
+ [PyMongo](https://pymongo.readthedocs.io/en/stable/)
    + A basic guide to the current version of PyMongo
+ [Stack Overflow](https://stackoverflow.com/)
    + A great souce of information for finding a starting place and direction to research.
+ [TestLodge](https://blog.testlodge.com/how-to-write-test-cases-for-software-with-sample/)
    + Used to help formulate the test syntax structure.
+ [W3Schools](https://www.w3schools.com/)
    + Extremely helpful for explaining base HTML, CSS, and JavaScript principles.
+ [Werkzeug](https://werkzeug.palletsprojects.com/en/1.0.x/)
    + A basic guide to the current version of Werkzeug.
+ [World Wide Web Consortium (W3C)](https://www.w3.org/)
    + Used to understand basic standardization practices for web based apps.

# Acknowledgements
+ Emily Eldridge for help with revising the grammar and flow of this README document.
+ Felipe Souza Alarcon for his suggestion of a recipe themed project, his help and guidance.
