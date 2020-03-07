CREATE TABLE Parking (
    Pnum INTEGER PRIMARY KEY
);

Create TABLE Room (
        ID INTEGER PRIMARY KEY,
        Capacity INTEGER,
        BedType CHAR VARYING (20)
);

Create TABLE Visitor (
        Visitor_ID INTEGER PRIMARY KEY,
        CardNumber INTEGER,
        Name VARCHAR(20)
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
            ID INTEGER,
            Type CHAR(20),
            Hours INTEGER
);

Create TABLE RoomEssentials (
            itemID INTEGER,
            Name CHAR(20),
            Price INTEGER
);


