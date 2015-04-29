# Fourcast: CS 4753 Project<br>
Nathan Thillairajah - nkt7hr
Austin Farquhar - alf2fr
Merlin Zhang - mz6ws <br><br><br>
In order to run our project using node.js, run <code> node server.js </code> from the fourcast directory. <br><br>
<strong>Important</strong>: In order to login and actually see the products, you must have MongoDB set up  on localhost through port 27017, and have one database created called <code> mydb</code>. The database connection settings are in <code> config/database.ejs</code> if you need to edit those.
<br><br>
The program will automatically populate the database with some pre-entered products once you launch the server.

<h3> Interactive Elements </h3>
<ul>
<li>Navbar dropdown in top right of screen</li>
<li>Searchbar on navbar (can't actually search yet)</li>
<li>Ability to click on a product from feed (home) or designer profile page</li>
<li>"Add Review" button on product page brings up modal that allows user to enter review (doesn't have ability to record it yet)</li>
<li>Ability to toggle number of stars in review modal</li>
<li>Designer Profile, Home, and Product Pages all pull data dynamically from MongoDB database</li>
</ul>

<h3> Images </h3>
<img src = "http://i.imgur.com/uAULaGK.jpg" />
<p>Login screen </p> <br>
<img src = "http://i.imgur.com/QPgCsnn.jpg" />
<p>Product page </p> <br>
<img src = "https://i.imgur.com/dgtLk3Z.jpg" />
<p>Add review accessible from product page </p> <br>
<img src = "http://i.imgur.com/Z1m4Sxc.jpg" />
<p>Sample designer profile </p> <br>
<img src = "http://i.imgur.com/kLhcGMl.jpg" />
<p>Account management page </p> <br>
<p>We would also like to give credit to this <a href = "http://www.jqueryscript.net/other/Simple-jQuery-Star-Rating-System-For-Bootstrap-3.html"> site </a> for providing the library used for the rating aspect of the product review.</p>