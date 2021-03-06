INSERT INTO users (name, email)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com'), 
('Louisa Meyer', 'jacksonrose@hotmail.com'), 
('Dominic Parks', 'victoriablackwell@outlook.com'), 
('Sue Luna', 'jasonvincent@gmx.com'), 
('Rosalie Garza', 'jacksondavid@gmx.com'), 
('Etta West', 'charlielevy@yahoo.com'), 
('Margaret Wong', 'makaylaweiss@icloud.com'), 
('Leroy Hart', 'jaycereynolds@inbox.com');


-- Used this to set default password instead of entering it in manually for my INSERT QUERIES, YOU WOULD NEED TO RUN THIS CODE ON THE DATABASE AGAIN IF YOU WANT TO DROP and \i migrations & \i seeds, otherwise you will get an error since password constraint is NOT NULL

-- ALTER TABLE users
-- ALTER COLUMN password 
-- SET DEFAULT '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.';



-- CREATE TABLE properties (
--   id SERIAL PRIMARY KEY NOT NULL,
--   owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

--   title VARCHAR(255) NOT NULL,
--   description TEXT,
--   thumbnail_photo_url VARCHAR(255) NOT NULL,
--   cover_photo_url VARCHAR(255) NOT NULL,
--   cost_per_night INTEGER  NOT NULL DEFAULT 0,
--   parking_spaces INTEGER  NOT NULL DEFAULT 0,
--   number_of_bathrooms INTEGER  NOT NULL DEFAULT 0,
--   number_of_bedrooms INTEGER  NOT NULL DEFAULT 0,

--   country VARCHAR(255) NOT NULL,
--   street VARCHAR(255) NOT NULL,
--   city VARCHAR(255) NOT NULL,
--   province VARCHAR(255) NOT NULL,
--   post_code VARCHAR(255) NOT NULL,

--   active BOOLEAN NOT NULL DEFAULT TRUE
-- );


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 2, 3, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true), 
(2, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 1040, 2, 4, 4, 'Canada', '1650 Hejto Center ', 'Bohbatev', 'Alberta', '83680', true), 
(3, 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 900, 6, 2, 3, 'Canada', '513 Powov Grove', 'Genwezuj', 'Newfoundland And Labrador', '44583', true), 
(4, 'Headed know', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 850, 2, 1, 3, 'Canada', '1392 Gaza Junction', 'Jaebvap', 'Ontario', '38051', true), 
(5, 'Port out', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg', 530, 3, 1, 2, 'Canada', '169 Nuwug Circle', 'Upetafpuv', 'Nova Scotia', '81059', true), 
(6, 'Fun glad', 'description', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg', 250, 1, 1, 1, 'Canada', '340 Dokto Park', 'Vutgapha', 'Newfoundland And Labrador', '00159', true), 
(7, 'Shine twenty', 'description', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 460, 2, 1, 2, 'Canada', '834 Buwmi Road', 'Upfufa', 'Quebec', '29045', true), 
(8, 'Game fill', 'description', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80', 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80', 730, 3, 1, 3, 'Canada', '651 Nami Road', 'Rotunif ', 'Ontario', '58224', true); 


-- CREATE TABLE reservations (
--   id SERIAL PRIMARY KEY NOT NULL,
--   start_date DATE NOT NULL,
--   end_date DATE NOT NULL,
--   property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
--   guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE
-- );


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 2, 3), 
('2019-01-04', '2019-02-01', 2, 2), 
('2021-10-01', '2021-10-14', 1, 4), 
('2014-10-21', '2014-10-21', 3, 5), 
('2016-07-17', '2016-08-01', 3, 4), 
('2018-05-01', '2018-05-27', 4, 8), 
('2022-10-04', '2022-10-23', 5, 1), 
('2015-09-13', '2015-09-30', 6, 8),
('2023-05-27', '2023-05-28', 4, 2),
('2023-04-23', '2023-05-02', 8, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
(2, 5, 10, 3, 'messages'),
(1, 4, 1, 4, 'messages'),
(8, 1, 2, 4, 'messages'),
(3, 8, 5, 4, 'messages'),
(4, 2, 7, 5, 'messages'),
(4, 3, 4, 4, 'messages'),
(5, 6, 3, 5, 'messages');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (831, 195, 1011943, 3, 'Mu ozconas cuusoese kifefake cevletal gi fafsisar neza pafvum fepuje felsi tevcu nonu fa nod vukpoaj raw.');
