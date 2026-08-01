iPhone phoneOne = new iPhone {Owner = "Patrick"};
phoneOne.MusicList.AddRange(new List<string> {"A", "B", "C"});

iPhone phoneTwo = new iPhone { Owner = "Jadon" };
phoneTwo.MusicList.AddRange(new List<string> {"D", "E", "F"});

Console.WriteLine("\n");
Console.WriteLine($"phoneOne Owner: {phoneOne.Owner}");
Console.WriteLine("Songs:");
foreach(string song in phoneOne.MusicList) {
    Console.WriteLine($"{song}");
}
Console.WriteLine("\n");
Console.WriteLine("==================");
Console.WriteLine($"phoneTwo Owner: {phoneTwo.Owner}");
Console.WriteLine($"{phoneTwo.Owner} playing: {phoneTwo.PlayMusic()}");
Console.WriteLine($"Company: {iPhone.Company}");
Console.WriteLine($"Call: {iPhone.CallSteveJobs()}");

Console.WriteLine("\n");