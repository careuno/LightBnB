const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

pool.connect(()=> {
  console.log('connected to the database');
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);

  return pool
  .query(`SELECT * FROM users WHERE users.email = $1`, [email])
  .then((result) => { 
    return result.rows[0] || null //you need to do [0] because otherwise it will return an array with the object and not be able to access the object.key pairs
    //console.log(result.rows || null)
  })
  .catch((err) => {
    console.log(err.message);
  });

}
exports.getUserWithEmail = getUserWithEmail;

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL
// );



/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users WHERE users.id = $1`, [id])
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });
  
  
  
  //return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);

  return pool
  .query(`INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;`, [user.name, user.email, user.password]) //RETURNING * to the end of an INSERT query to return the objects that were inserted ()
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });



}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  
  return pool
  .query(`SELECT * FROM reservations WHERE guest_id = $1`, [guest_id])
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });

  //---- return records of reservations related to that specific user
  
  //return getAllProperties(null, 2);
  
  
  // CREATE TABLE reservations (
  //   id SERIAL PRIMARY KEY NOT NULL,
  //   start_date DATE NOT NULL,
  //   end_date DATE NOT NULL,
  //   property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  //   guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  // );
  
  // CREATE TABLE users (
  //   id SERIAL PRIMARY KEY NOT NULL,
  //   name VARCHAR(255) NOT NULL,
  //   email VARCHAR(255) NOT NULL,
  //   password VARCHAR(255) NOT NULL
  // );



}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */



const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};


exports.getAllProperties = getAllProperties;







/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
