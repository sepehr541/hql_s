
/* Table Names */
const CardInfo = "CardInfo(CreditCard, Name)";
const Visitor = "Visitor(ID, CreditCard)";
const Room = "Room(ID, Capacity, BedType)";
const Parking = "Parking(Pnum)";
const Employee = "Employee(ID, Name, Salary, Position)";
const Recreational = "Recreactional(ID, Type, Hours)";
const Customer_Servise = "Customer_Service(ID, Name, Hours)";
const Food = "Food(CuisineStyle, Category)";
const Restaurant = "Restaurant(Name, CuisineStyle, Hours)";
const Events = "Events(EID, Name, StartDate, EndDate)";
const RoomEssentials = "RoomEssentials(ItemID, Name, Price)";
const Visitor_Reservation = "Visitor_Reservation(VisitorID, ReservationID)";
const Visitor_Uses_Service = "Visitor_Uses_Service(VisitorID, ServiceID, Date)";
const Room_has_RoomEssentials = "Room_has_RoomEssentials(RoomNumber, ItemID, NumberOfItem)";
const Reservation_has_Parking = "Reservation_has_Parking(Pnum, ReservationID)";
const Employee_host_Event = "Employee_host_Event(EmployeeID, EventID)";
const Reservation_Room = "Reservation_Room(RoomNumber, ReservationID)";
const Employee_Works_In = "Employee_Works_In(EmployeeID, ServiceID)";
const Reservation  = "Reservation(ReservationID, StartDate, EndDate, Price, pcount)"

/**
 * default callback for testing queries
 * @param {Error} err 
 * @param {Object} results 
 */
const defaultCallback = (err, results) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Successful ${results.command} query`);
    }
}

module.exports = {
    CardInfo,
    Visitor,
    Room,
    Parking,
    Employee,
    Recreational,
    Customer_Servise,
    Food,
    Restaurant,
    Events,
    RoomEssentials,
    Visitor_Reservation,
    Visitor_Uses_Service,
    Room_has_RoomEssentials,
    Reservation_has_Parking,
    Employee_host_Event,
    Reservation_Room,
    Employee_Works_In,
    Reservation,
    defaultCallback,
};