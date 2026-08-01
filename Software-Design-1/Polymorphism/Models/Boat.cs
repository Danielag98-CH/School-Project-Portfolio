public class Boat : Vehicle {
    public double Length { get; set; }
    public bool InPort { get; set; } = true;
    protected string BoatType { get; set; }

    public Boat(double length, bool inPort, string boatType) {
        this.Length = length;
        this.InPort = inPort;
        this.BoatType = boatType;
    }

    public override void Drive() {
        Console.WriteLine("Boat is sailing");
    }

    public override void Stop() {
        this.Anchor();
    }

    public void Anchor() {
        Console.WriteLine("Dropping the anchor");
    }

    protected void SailCheck() {
        if (this.InPort) {
            Console.WriteLine("Docked");
        }
    }
}