/* Table Names */
const CardInfo = "CardInfo(CreditCard, Name)";
const Visitor = "Visitor(ID, CreditCard)";
const Room = "Room(ID, Capacity, BedType)";
const Parking = "Parking(Pnum)";
const Employees = "Employees(employeeID, name, position, salary)";
const Recreational = "Recreactional(ID, Type, Hours)";
const CustomerServise = "CustomerService(ServiceID, ServiceType, startAt, closesAt)";
const Food = "Food(CuisineStyle, Category)";
const Restaurant = "Restaurant(Name, CuisineStyle, Hours)";
const Events = "Events(eventID, eventName, startDate, endDate)";
const RoomEssentials = "RoomEssentials(ItemID, Name, Price)";
const VisitorReservation = "VisitorReservation(VisitorID, ReservationID)";
const VisitorUsesService = "VisitorUsesService(VisitorID, ServiceID, Date)";
const RoomHasRoomEssentials = "RoomHasRoomEssentials(RoomNumber, ItemID, NumberOfItem)";
const ReservationHasParking = "ReservationHasParking(Pnum, ReservationID)";
const EmployeeHostEvent = "EmployeeHostEvent(EmployeeID, EventID)";
const ReservationRoom = "ReservationRoom(ReservationID, RoomNumber)";
const EmployeeWorksIn = "EmployeeWorksIn(EmployeeID, ServiceID)";
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
    Employees,
    Recreational,
    CustomerServise,
    Food,
    Restaurant,
    Events,
    RoomEssentials,
    VisitorReservation,
    VisitorUsesService,
    RoomHasRoomEssentials,
    ReservationHasParking,
    EmployeeHostEvent,
    ReservationRoom,
    EmployeeWorksIn,
    Reservation,
    defaultCallback,
};