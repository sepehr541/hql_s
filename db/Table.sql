CREATE TABLE Parking (
    Pnum INTEGER PRIMARY KEY
);

CREATE TABLE verifyuser (
    username VARCHAR(100),
    passwordHash bytea UNIQUE NOT NULL,
    PRIMARY KEY (username)
);

Create TABLE Employees (
            employeeID INTEGER PRIMARY KEY,
            Name CHAR(20),
            Position VARCHAR(20),
            Salary INTEGER,
);

Create TABLE Recreational (
            ID INTEGER PRIMARY KEY,
            Type CHAR(20)
);

Create TABLE Food (
            CuisineStyle CHAR(20) PRIMARY KEY,
            Category CHAR(20)
);

Create TABLE Restaurant (
            Name CHAR(20) PRIMARY KEY,
            CuisineStyle CHAR(20) NOT NULL,
            FOREIGN KEY(CuisineStyle) REFERENCES food (CuisineStyle) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
);

Create TABLE CustomerService (
            ServiceID INTEGER PRIMARY KEY,
            ServiceType VARCHAR(20) UNIQUE NOT NULL ,
            startAt TIME NOT NULL,
            closesAt TIME NOT NULL
);

Create TABLE RoomEssentials (
            itemID INTEGER PRIMARY KEY,
            itemName CHAR(20) NOT NULL,
            price INTEGER NOT NULL
);

Create TABLE Room (
        ID INTEGER PRIMARY KEY,
        Capacity INTEGER NOT NULL,
        BedType CHAR VARYING (20) NOT NULL
);

CREATE TABLE RoomHasEssentials (
    roomnumber Integer,
    itemid integer,
    PRIMARY KEY (roomnumber, itemid),
    Foreign KEY (roomnumber) REFERENCES room 
    ON Delete Cascade
    ON Update Cascade,
    FOREIGN KEY (itemid) REFERENCES roomessentials
    ON Delete Cascade
    ON Update Cascade
);

Create Table RoomPrice (
    roomType VARCHAR(20) NOT NULL,
    Price REAL NOT NULL
);

Create TABLE Reservation (
            ReservationID INTEGER PRIMARY KEY,
            StartDate DATE NOT NULL,
            EndDate DATE NOT NULL,
            Price INTEGER NOT NULL,
            pCount INTEGER NOT NULL
);

Create TABLE Visitors (
        VisitorID INTEGER PRIMARY KEY,
        -- CardNumber INTEGER,
        visitorname VARCHAR(25),
        email VARCHAR(40),
        phone INTEGER
);

CREATE TABLE VisitorReservation (
            VisitorID INTEGER,
            ReservationID INTEGER,
            Primary Key(VisitorID, ReservationID),
            FOREIGN Key (VisitorID) references Visitors,
            Foreign Key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE VisitorUsesServices (
            VisitorID INTEGER,
            ServiceID INTEGER,
            usage_Date DATE,
            PRIMARY KEY (VisitorID , ServiceID),
            FOREIGN KEY (VisitorID) references Visitors,
            FOREIGN KEY (ServiceID) references CustomerService 
            ON Delete Cascade 
            ON Update Cascade
);

Create TABLE ReservationHasAssignedParking (
            Pnum INTEGER,
            ReservationID INTEGER,
            Primary Key (Pnum, ReservationID),
            Foreign Key (Pnum) references Parking,
            Foreign Key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE EmployeesHostEvents (
            EmployeeID INTEGER,
            EventID INTEGER,
            Primary Key (EmployeeID),
            Foreign Key (EmployeeID) references Employees,
            Foreign Key (EventID) references Events
            ON Delete Cascade
            ON Update Cascade 
);

Create TABLE ReservationRoom (
            ReservationID INTEGER,
            RoomNumber INTEGER,
            PRIMARY KEY (RoomNumber, ReservationID),
            FOREIGN key (RoomNumber) references Room
            ON Delete Cascade
            ON Update Cascade,
            Foreign key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);


CREATE TABLE events (
    eventID SERIAL PRIMARY KEY,
    eventName VARCHAR(20) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL
);

-- Create TABLE EmployeesHostEvents (
--             EmployeeID INTEGER,
--         --     EventID INTEGER,
--             Primary Key (EmployeeID),
--             Foreign Key (EmployeeID) references Employees
--         --     Foreign Key (EventID) references Event
--         --     ON Delete Cascade
--         --     ON Update Cascade
-- );

Create TABLE EmployeeWorksIn (
            EmployeeID INTEGER,
            ServiceID INTEGER,
            Primary Key (EmployeeID, ServiceID),
            FOREIGN Key (EmployeeID) references Employees
            ON Delete Cascade
            ON Update Cascade,
            FOREIGN Key (ServiceID) references CustomerService
            ON Delete Cascade
            ON Update Cascade
);




CREATE TABLE OrderConfirmation(
    ordeconfid INTEGER,
    resvid INTEGER,
    visid INTEGER,
    PRIMARY KEY (ordeconfid,resvid, visid),
    FOREIGN key (resvid) REFERENCES Reservation,
    FOREIGN KEY (visid) REFERENCES Visitors
    ON Delete Cascade
    ON Update Cascade 
);

