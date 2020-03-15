CREATE TABLE Parking (
    Pnum INTEGER PRIMARY KEY
);

Create TABLE Room (
        ID INTEGER PRIMARY KEY,
        Capacity INTEGER NOT NULL,
        BedType CHAR VARYING (20) NOT NULL
);

Create TABLE Visitor (
        Visitor_ID INTEGER PRIMARY KEY,
        CardNumber INTEGER,
        Name VARCHAR(25)
 );

 Create TABLE Employee (
            ID INTEGER PRIMARY KEY,
            Name CHAR(20),
            Salary INTEGER,
            Position CHAR(20)
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
            FOREIGN KEY(CuisineStyle) REFERENCES food (CuisineStyle) ON DELETE CASCADE ON UPDATE CASCADE
            
 );

 Create TABLE Customer_Service (
            ID INTEGER ,
            Type CHAR(20),
            Hours INTEGER,
            PRIMARY KEY (ID)

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

CREATE TABLE Visitor_Reservation (
            Visitor_ID INTEGER,
            Reservation_ID INTEGER,
            Primary Key(Visitor_ID, Reservation_ID),
            FOREIGN Key (Visitor_ID) references Visitor,
            Foreign Key (Reservation_ID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE Visitor_Uses_Services (
            VisitorID INTEGER,
            ServiceID INTEGER,
            usage_Date DATE,
            PRIMARY KEY (VisitorID , ServiceID),
            FOREIGN KEY (VisitorID) references Visitor,
            FOREIGN KEY (ServiceID) references Customer_Service 
            ON Delete Cascade 
            ON Update Cascade
);

Create TABLE Reservation_Has_Assigned_Parking (
            Pnum INTEGER,
            ReservationID INTEGER,
            Primary Key (Pnum, ReservationID),
            Foreign Key (Pnum) references Parking,
            Foreign Key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE Employees_Host_Events (
            Employee_ID INTEGER,
        --     EventID INTEGER,
            Primary Key (Employee_ID),
            Foreign Key (Employee_ID) references Employee
        --     Foreign Key (EventID) references Event
        --     ON Delete Cascade
        --     ON Update Cascade
);

Create TABLE Reservation_Room (
            ReservationID INTEGER,
            RoomNumber INTEGER,
            PRIMARY KEY (RoomNumber, ReservationID),
            FOREIGN key (RoomNumber) references Room,
            Foreign key (ReservationID) references Reservation
            ON Delete Cascade
            ON Update Cascade
);

Create TABLE Employee_Works_In (
            Employee_ID INTEGER,
            Service_ID INTEGER,
            Primary Key (Employee_ID, Service_ID),
            FOREIGN Key (Employee_ID) references Employee,
            FOREIGN Key (Service_ID) references Customer_Service
            ON Delete Cascade
            ON Update Cascade
);