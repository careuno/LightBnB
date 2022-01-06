/* https://web.compass.lighthouselabs.ca/days/w05d3/activities/957


Get details about a single user.

Select their id, name, email, and password.
Select a single user using their email address. Use tristanjacobs@gmail.com for now.

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


 */

 SELECT id, name, email, password 
 FROM users
 WHERE email = 'tristanjacobs@gmail.com';

