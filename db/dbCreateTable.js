// const { pool } = require('./dbInit');

// /**
//  * QUICK QUERY TEMPLATE
//  * pool.query(
//         ``,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });
//  */


// function InitializeTables() {
//     /* Queries for creating tables */

//     pool.query(`CREATE TABLE Parking (
//             Pnum INTEGER PRIMARY KEY
//         )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE Room (
//         ID INTEGER PRIMARY KEY,
//         Capacity INTEGER,
//         BedType CHAR 20
//         )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE Visitor (
//         Visitor_ID INTEGER PRIMARY KEY,
//         CardNumber INTEGER,
//         Name VARCHAR(20)
//     )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     // pool.query(
//     //     `Create TABLE CardInfo (
//     //         CardNumber INTEGER PRIMARY KEY REFERENCES Visitor,
//     //         Name VARCHAR(20),
//     //         On Delete Cascade,
//     //         On Update Cascade,
//     //         )`,
//     //     (err, result) => {
//     //         if (err) {
//     //             console.log(err.stack);
//     //         }
//     //     }
//     // );

//     pool.query(
//         `Create TABLE Employee (
//             ID INTEGER PRIMARY KEY,
//             Name CHAR(20),
//             Salary INTEGER,
//             Position CHAR(20)
//         )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );



//     pool.query(
//         `Create TABLE Recreational (
//             ID INTEGER PRIMARY KEY,
//             Type CHAR(20)
//         )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE Restaurant (
//             Name CHAR(20) PRIMARY KEY,
//             CuisineStyle CHAR(20) FORIEGN KEY REFERENCES Food NOT NULL,
//             On Delete Cascade,
//             On Update Cascade
//             )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE Food (
//             CuisineStyle CHAR(20) PRIMARY KEY,
//             Category CHAR(20),
//         )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE Customer_Service (
//             ID INTEGER,
//             Type CHAR(20),
//             Hours INTEGER,
//         )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE RoomEssentials (
//             itemID INTEGER,
//             Name CHAR(20),
//             Price INTEGER,
//             )`,
//         (err, result) => {
//             if (err) {
//                 console.log(err.stack);
//             }
//         }
//     );

//     pool.query(
//         `Create TABLE Reservation {
//             Reservation ID INTEGER PRIMARY KEY,
//             Start Date DATE,
//             End Date DATE,
//             Price INTEGER,
//             # of visitors INTEGER,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Visitor_Reservation {
//             Visitor_ID INTEGER,
//             Reservation_ID INTEGER,
//             Primary Key(Visitor_ID, Reservation_ID),
//             Foriegn Key Visitor_ID references Visitor,
//             Foriegn Key Reservation_ID references Reservation,
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Visitor_Reservation {
//             Visitor_ID INTEGER,
//             Reservation_ID INTEGER,
//             Primary Key(Visitor_ID, Reservation_ID),
//             Foriegn Key Visitor_ID references Visitor,
//             Foriegn Key Reservation_ID references Reservation,
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Visitor_Uses_Services{
//             Visitor_ID INTEGER
//             Service_ID INTEGER
//             Date DATE
//             PRIMARY KEY(Vistor_ID ,Service_ID)
//             Foreign KEY Visitor_ID references Visitor
//             Foreign KEY Service_ID references
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Reservation_Has_Assigned_Parking {
//             Pnum INTEGER,
//             Reservation ID INTEGER,
//             Primary Key (Pnum, Reservation_ID),
//             Foriegn Key Pnum references Parking,
//             Foriegn Key Reservation_ID references Reservation
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Employees_Host_Events {
//             Employee_ID INTEGER,
//             EventID INTEGER,
//             Primary Key (Employee_ID, EventID),
//             Foriegn Key Employee_ID references Employee,
//             Foriegn Key EventID references Event,
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Reservation_Room {
//             Room_Number INTEGER
//             Reservation_ID INTEGER
//             PRIMARY KEY (Room_Number , Reservation_ID )
//             Foreign key Room_Number references Room
//             Foreign key Reservation_ID references Reservation,
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

//     pool.query(
//         `Create TABLE Employee_Works_In {
//             Employee_ID INTEGER,
//             Service_ID INTEGER,
//             PrimaryKey (Employee_ID, Service_ID)
//             Foriegn Key Employee_ID references Employee,
//             Foriegn Key Service_ID references Customers_Service,
//             On Delete Cascade,
//             On Update Cascade,
//             }`,
//         (err, result) => { 
//             if (err) {
//                 console.log(err.stack);
//             }
//     });

// }

// module.exports = InitializeTables;

