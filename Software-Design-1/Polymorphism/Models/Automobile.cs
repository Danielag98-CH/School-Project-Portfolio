public class Automobile : Vehicle {
    public string LicensePlate { get; set; }
    public int SeatingCapacity { get; set; }
    protected bool IsElectric { get; set; }

    public Automobile(string licensePlate, int seatingCapacity, bool isElectric) {
        this.LicensePlate = licensePlate;
        this.SeatingCapacity = seatingCapacity;
        this.IsElectric = isElectric;
    }

    public override void Drive() {
        Console.WriteLine("Automobile is driving");
    }

    public override void Stop() {
        Console.WriteLine("Automobile has parked");
    }

    public void Honk() {
        Console.WriteLine("Honking the horn");
    }

    protected void BatteryCheck() {
        if (this.IsElectric) {
            Console.WriteLine("Checking battery level");
        }
    }
}