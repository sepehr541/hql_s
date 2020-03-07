
/* Table Names */
export const CardInfo = "CardInfo(CreditCard, Name)";
export const Visitor = "Visitor(ID, CreditCard)";
export const Room = "Room(ID, Capacity, BedType)";
export const Parking = "Parking(Pnum)";
export const Employee = "Employee(ID, Name, Salary, Position)";
export const Recreational = "Recreactional(ID, Type, Hours)";
export const Customer_Servise = "Customer_Service(ID, Name, Hours)";
export const Food = "Food(CuisineStyle, Category)";
export const Restaurant = "Restaurant(Name, CuisineStyle, Hours)";
export const Events = "Events(EID, Name, StartDate, EndDate)";
export const RoomEssentials = "RoomEssentials(ItemID, Name, Price)";

export const Visitor_Reservation = "Visitor_Reservation(VisitorID, ReservationID)";
export const Visitor_Uses_Service = "Visitor_Uses_Service(VisitorID, ServiceID, Date)";
export const Room_has_RoomEssentials = "Room_has_RoomEssentials(RoomNumber, ItemID, NumberOfItem)";
export const Reservation_has_Parking = "Reservation_has_Parking(Pnum, ReservationID)";
export const Employee_host_Event = "Employee_host_Event(EmployeeID, EventID)";
export const Reservation_Room = "Reservation_Room(RoomNumber, ReservationID)";
export const Employee_Works_In = "Employee_Works_In(EmployeeID, ServiceID)";