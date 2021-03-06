//------------------------------------ CONNECT TO DB WITH NODE-POSTGRES-----------------------------------

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

//------------------------------------GET USER BY EMAIL --------------------------------------
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
//---------------------------------------------------------------------------------------------
const getUserWithEmail = function(email) {
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


//------------------------------------GET USER ID for LOGGED IN VIEW --------------------------
/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
//---------------------------------------------------------------------------------------------
const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users WHERE users.id = $1`, [id])
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


//------------------------------------ ADD USER @ SIGNUP --------------------------------------
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
//---------------------------------------------------------------------------------------------
const addUser =  function(user) {
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


//------------------------------------ RESERVATIONS --------------------------------------------
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
//---------------------------------------------------------------------------------------------

const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
                    SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
                    FROM reservations 
                    JOIN properties ON properties.id = reservations.property_id 
                    JOIN property_reviews ON property_reviews.property_id = properties.id
                    WHERE reservations.guest_id = $1
                    GROUP BY properties.id, reservations.id;
                    `, [guest_id])

  .then((result) => result.rows)
  .catch((err) => {
    console.log(err.message);
  });  
// return records of reservations related to that specific user

}
exports.getAllReservations = getAllReservations;

//------------------------------------ GET ALL PROPERTIES (search)-----------------------------
/**https://web.compass.lighthouselabs.ca/activities/966
 * Get all properties.
 * @param {{}} options An object containing query options.
          * {
            city,
            owner_id,
            minimum_price_per_night,
            maximum_price_per_night,
            minimum_rating;
          }
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
//---------------------------------------------------------------------------------------------

const getAllProperties = function (options, limit = 10) {
 
  // 1 - Setup an array to hold any parameters that may be available for the query.
  const queryParams = [];

  // 2 - Start the query with all information that comes before the WHERE clause.
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3 - Check if a city has been passed in as an option. Add the city to the params array and create a WHERE clause for the city.
  /* 
  ---------- We can use the length of the array to dynamically get the $n placeholder number. Since this is the first parameter, it will be $1.

  ----------- The % syntax for the LIKE clause must be part of the parameter, not the query. */

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} \n`;
    }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND (cost_per_night >= $${queryParams.length - 1} AND cost_per_night <= $${queryParams.length}) 
  \n`;
  }
    queryString += `GROUP BY properties.id \n` 

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} \n`;
  }

  // 4 Add any query that comes after the WHERE clause.
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5 - Console log everything just to make sure we've done it right.
  //console.log(queryString, queryParams);

  // 6 - Run the query.
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;


//------------------------------------ADD PROPERTIES--------------------------------------------

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
          * {
            owner_id: int,
            title: string,
            description: string,
            thumbnail_photo_url: string,
            cover_photo_url: string,
            cost_per_night: string,
            street: string,
            city: string,
            province: string,
            post_code: string,
            country: string,
            parking_spaces: int,
            number_of_bathrooms: int,
            number_of_bedrooms: int
          }
 */
const addProperty = function(property) {

const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces,property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code];

let queryString = `
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES 
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *; 
`;

return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.addProperty = addProperty;


//-----------------------------------------------------------------------------------------------

//NOTE: FAKE AUTO DATA HAS DEAD LINKS, USED THIS QUERY TO UPDATE SOME OF THEM
// UPDATE properties
// SET thumbnail_photo_url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
// WHERE thumbnail_photo_url = 'https://images.pexels.com/photos/1368687/pexels-photo-1368687.jpeg?auto=compress&cs=tinysrgb&h=350';

// UPDATE properties
// SET cover_photo_url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
// WHERE cover_photo_url = 'https://images.pexels.com/photos/1027512/pexels-photo-1027512.jpeg?auto=compress&cs=tinysrgb&h=350';
