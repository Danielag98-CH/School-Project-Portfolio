Console.WriteLine("\n========= Example 1: Pass-by-value with primitives ====================\n");

int firstHeight = 12;
int secondHeight = 2;

Console.WriteLine($"firstHeight: {firstHeight}");
Console.WriteLine($"secondHeight: {secondHeight}");

Console.WriteLine("\n--------------------------------------------------");
Console.WriteLine("int result = HouseChanger.AddMeasurements(firstHeight, secondHeight);");
int result = HouseChanger.AddMeasurements(firstHeight, secondHeight);
Console.WriteLine("--------------------------------------------------\n");

Console.WriteLine($"result: {result}");
Console.WriteLine($"firstHeight AFTER AddMeasurements: {firstHeight}");

Console.WriteLine("\n==================================================================");


Console.WriteLine("\n========= Example 2: Pass-by-value with object references ====================\n");

House houseOne = new House { Name = "Root Note", Color = "green", NumDoors = 2 };

Console.WriteLine($"Color of 'houseOne': {houseOne.Color}");

Console.WriteLine("\n--------------------------------------------------");
Console.WriteLine("HouseChanger.PaintHouse(houseOne, \"red\");");
HouseChanger.PaintHouse(houseOne, "red");
Console.WriteLine("--------------------------------------------------\n");

Console.WriteLine($"Color of 'houseOne' after PaintHouse(): {houseOne.Color}");

Console.WriteLine("\n==================================================================");

Console.WriteLine("\n========= Example 3: Method scope and local variables ====================\n");

string materialOne = "wood";
Console.WriteLine($"materialOne: {materialOne}");

Console.WriteLine("\n--------------------------------------------------");
Console.WriteLine("HouseChanger.MaterialTest(materialOne);");
HouseChanger.MaterialTest(materialOne);
Console.WriteLine("--------------------------------------------------\n");

Console.WriteLine($"materialOne after MaterialTest: {materialOne}");

Console.WriteLine("\n==================================================================");

Console.WriteLine("\n========= Example 4: Reference comparison ====================\n");

House houseTwo = new House { Name = "JavaVino", Color = "amber", NumDoors = 2 };
House houseThree = houseTwo;

Console.WriteLine($"Do 'houseTwo' and 'houseThree' refer to the same object?... \nhouseTwo == houseThree => {houseTwo == houseThree}");

Console.WriteLine($"\n'houseTwo' color: {houseTwo.Color}");
Console.WriteLine($"'houseThree' color: {houseThree.Color}");


Console.WriteLine("\n----------------------------------------------------");
Console.WriteLine("HouseChanger.PaintHouse(houseTwo, \"blue\");");
HouseChanger.PaintHouse(houseTwo, "blue");
Console.WriteLine("----------------------------------------------------\n");
Console.WriteLine($"'houseTwo' color AFTER PaintHouse(): {houseTwo.Color}");
Console.WriteLine($"'houseThree' color: AFTER PaintHouse(): {houseThree.Color}");

Console.WriteLine("\n==================================================================");