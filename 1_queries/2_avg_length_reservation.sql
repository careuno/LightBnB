/* https://web.compass.lighthouselabs.ca/days/w05d3/activities/957


Our product managers want a query to see the average duration of a reservation.

Get the average duration of all reservations.

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
 */

 SELECT AVG(end_date - start_date) AS average_duration
 FROM reservations; 
