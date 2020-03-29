CREATE TABLE Parking (
    Pnum INTEGER PRIMARY KEY
);

Create TABLE Room (
        ID INTEGER PRIMARY KEY,
        Capacity INTEGER NOT NULL,
        BedType CHAR VARYING (20) NOT NULL
);

Create TABLE Visitor (
        VisitorID INTEGER PRIMARY KEY,
        -- CardNumber INTEGER,
        Name VARCHAR(25),
        EMIAL VARCHAR(40),
        phone INTEGER
);

Create TABLE Employee (
            ID INTEGER PRIMARY KEY,
            Name CHAR(20),
            Salary INTEGER,
            Position CHAR(20),
            username VARCHAR(100),
            FOREIGN KEY(username) REFERENCES verifyuser
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
            ID INTEGER PRIMARY KEY,
            Type CHAR(20),
            Hours INTEGER
);

Create TABLE RoomEssentials (
            itemID INTEGER,
            Name CHAR(20),
            Price INTEGER
);

Create TABLE Reservation (
            ReservationID INTEGER PRIMARY KEY,
            StartDate DATE NOT NULL,
            EndDate DATE NOT NULL,
            Price INTEGER NOT NULL,
            pCount INTEGER NOT NULL
);

CREATE TABLE VisitorReservation (
            VisitorID INTEGER,
            ReservationID INTEGER,
            Primary Key(VisitorID, ReservationID),
            FOREIGN Key (VisitorID) references Visitor,
            Foreign Key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE VisitorUsesServices (
            VisitorID INTEGER,
            ServiceID INTEGER,
            usage_Date DATE,
            PRIMARY KEY (VisitorID , ServiceID),
            FOREIGN KEY (VisitorID) references Visitor,
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
            Foreign Key (EmployeeID) references Employee,
            Foreign Key (EventID) references Event
            ON Delete Cascade
            ON Update Cascade 
);

Create TABLE ReservationRoom (
            ReservationID INTEGER,
            RoomNumber INTEGER,
            PRIMARY KEY (RoomNumber, ReservationID),
            FOREIGN key (RoomNumber) references Room,
            Foreign key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE EmployeeWorksIn (
            EmployeeID INTEGER,
            ServiceID INTEGER,
            Primary Key (EmployeeID, ServiceID),
            FOREIGN Key (EmployeeID) references Employee,
            FOREIGN Key (ServiceID) references CustomerService
            ON Delete Cascade
            ON Update Cascade
);

Create Table RoomPrice (
    roomType VARCHAR(20) NOT NULL,
    Price REAL NOT NULL
);


CREATE TABLE verifyuser (
    username VARCHAR(100),
    passwordHash bytea UNIQUE NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE OrderConfirmation(
    ordeconfid INTEGER,
    resvid INTEGER,
    visid INTEGER,
    PRIMARY KEY (ordeconfid,resvid, visid),
    FOREIGN key (resvid) REFERENCES Reservation,
    FOREIGN KEY (visid) REFERENCES Visitor
    ON Delete Cascade
    ON Update Cascade 
);

