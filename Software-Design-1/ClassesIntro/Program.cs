Airplane planeOne = new Airplane("Bucky", 10000, 0);
Airplane planeTwo = new Airplane();

planeTwo.Name = "Mary";


Console.WriteLine($"\n\nplaneOne Name: {planeOne.Name}");
Console.WriteLine($"planeTwo Name: {planeTwo.Name}\n\n");


// planeOne.Fly(80000);

decimal newFuelAmount = planeOne.Refuel(80);

Console.WriteLine($"New fuel amount: {newFuelAmount}\n");


