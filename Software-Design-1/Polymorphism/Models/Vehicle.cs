public class Vehicle {
    public string Name { get; set; } = "Default Name";
    public int ModelYear { get; set; } = 2025;
    protected string Manufacturer { get; set; } = "Default Manufacturer";

    public Vehicle() {
        
    }

    public virtual void Drive() {
        Console.WriteLine("Vehicle is moving");
    }

    public virtual void Stop() {
        Console.WriteLine("Vehicle has stopped");
    }

    private void MaintenanceCheck() {
        Console.WriteLine("Performing maintenance check");
    }

    protected void DisplayManufacturer() {
        Console.WriteLine("Manufacturer: " + this.Manufacturer);
    }
}