
public class House {
    public required string Name { get; set; }
    public required string Color { get; set; }
    public required int NumDoors { get; set; }

    public void KnockOnDoor() {
        Console.WriteLine($"Knocking on door of {this.Name}.");
    }

}