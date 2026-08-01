
Vehicle vehicleOne = new Vehicle();
Airplane airplaneOne = new Airplane("Delta", 35000, 2);
Automobile carOne = new Automobile("ABC123", 5, true);
Boat boatOne = new Boat(30.5, true, "Yacht");

Vehicle test = new Airplane("Delta", 35000, 2);
test = new Boat(30.5, true, "Yacht");

List<Vehicle> vehicleList = new List<Vehicle>();
vehicleList.Add(vehicleOne);
vehicleList.Add(airplaneOne);
vehicleList.Add(carOne);
vehicleList.Add(boatOne);


Console.WriteLine("\n");
foreach(Vehicle elem in vehicleList) {
    elem.Drive();    
    
}
Console.WriteLine("\n");