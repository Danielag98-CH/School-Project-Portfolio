public class ElectricCar : Automobile {

    public int BatteryCapacity { get; set; }

    public ElectricCar(string licensePlate, int seatingCapacity, int batteryCapacity)
        : base(licensePlate, seatingCapacity, true) // Calling the base class constructor
    {
        this.BatteryCapacity = batteryCapacity;
    }

    public void ChargeBattery() {
        Console.WriteLine("Charging the battery");
    }

    // You can also override methods from the Automobile class if needed
    public override void Drive() {
        Console.WriteLine("Electric car is driving efficiently");
    }

    public override string ToString() {
        return $"Name: {this.Name} | Manufacturer: {this.Manufacturer}";
    }


}