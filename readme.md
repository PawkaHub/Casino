### Purpose of Code Sample
1.) Showcase advanced ES6/Node/React/Webpack concepts and techniques, as well as integration with a basic database and simple user auth.

2.) Showcase modularity of code and implementation of architecture that would easily allow for the addition of new game modes with little effort.

3.) Showcase a small sampling of front end design skills, as well as provide a code sample that highlights the difference between implementing an application in mobx vs redux, to serve as a potential further discussion point.

### Running The Code Sample

1) Install Yarn from [https://yarnpkg.com/docs/install](https://yarnpkg.com/docs/install)

2) Clone Repo
```
git clone git@github.com:PawkaHub/Casino.git
```

3) Enter Project Directory
```
cd Casino
```

4) Install dependencies via Yarn
```
yarn
```

5) Run the server with development settings
```
yarn run serve
```

6) Server should now be running on [http://localhost:1234](http://localhost:1234), go ahead and log in with whatever email, name and password you want (an account will be created automatically for you) and play as many games of Blackjack as you like!

### Real World Improvements
In a real world example, some of the following improvements would have to be be added to the code sample that were left out for the sake of time and brevity. There are certainly more improvements that would have to be done beyond just the ones listed below, but it's worth highlighting some of them to demonstrate that they've been thought of.

1.) Typescript/Flow and Unit Tests

2.) Make use of observables in models class

3.) Store loose strings in a Constants file

4.) Stricter validation for database input types

5.) Access control for database data

### Notes
1.) The database is only stored in server memory, not to a file for persistent storage; so restarting the server will reset your database.

2.) Architecture is designed to be able to easily add new game modes with minimal effort.

3.) To simulate a logout, put the following code into your browser console and refresh the page.

```
localStorage.removeItem('casino-session-token');
```

4.) To see the data within the local store, put the following code into your browser console and explore the input as you see fit.
```
store.showData();
```

5.) For the sake of time, the design has not been tested on mobile, so it is best used on a desktop or laptop browser in Google Chrome.
