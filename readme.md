# ToDo List as a SPA
- Originally following the uDemy course [Build a Single Page Application with jQuery & AJAX](https://www.udemy.com/course/jquery-ajax/)
- I plan to make this "my own" by refactoring from jQuery's AJAX to use fetch API


### From the course
- Refactored a mult-page app to a SPA using AJAX
- Use Gulp in the build process to transpile template literal syntax, fetch syntax
  - Original project used some outdated packages, including gulp. Had to make some changes
- Separated the monolithic application into separate "client" and "server" apps. Enabled CORS as an implication of this.
  - Run the server with `nodemon`
  - Run the client using python Simple HTTP server 


> # Setup Instructions
>
>  - Paste the following into your terminal - `git clone git@github.com:nax3t/ajax-jquery-tutorial.git`
>     - If that gives you an error then you need to [setup SSH](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/) or use the HTTPS link instead: `git clone https://github.com/nax3t/ajax-jquery-tutorial.git` *(this requires use of your github credentials, the password will be hidden while typing)*
> - Now `cd` into `ajax-jquery-tutorial` and run `npm install`
> - Start your mongo daemon `mongod` in a separate terminal tab
> - Install `nodemon` globally (if you don't already have it installed) with `npm i -g nodemon`
> - Run your application in its own terminal tab with `nodemon`
> - Navigate to `localhost:3000` in your browser

> *Note: If you're working from c9 then see below:
> - Change the following lines at the bottom of app.js:

> ```JS
> app.listen(process.env.PORT, process.env.IP, function(){
>     console.log("The server has started!");
> });
> ```

> - Now run your server with `node app.js` or `nodemon` and view the app from the Preview tab in your workspace
