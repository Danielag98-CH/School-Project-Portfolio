public class Airplane {
    public string Name { get; set; }
    public int MaxAltitude { get; private set; }
    public decimal FuelLevel { get; private set; }

    public Airplane() { }
    
    public Airplane(string givenName, int maxAlt, decimal fuelLevel) {
        this.Name = givenName;
        this.MaxAltitude = maxAlt;
        this.FuelLevel = fuelLevel;
    }

    public void Fly(int altitude) {
        /*
            1) Altitude within range? => DONE
            2) Do we have fuel? => DONE
            3) Fly!
        */
        if(altitude > this.MaxAltitude) {
            Console.WriteLine($"{this.Name} has max alt of {this.MaxAltitude}.");
        
        } else if (this.FuelLevel <= 0) {
            Console.WriteLine($"{this.Name} does not have fuel.");

        } else {
            Console.WriteLine($"{this.Name} is flying at {altitude} feet.");
            this.FuelLevel -= altitude * 0.001m; // Simulate fuel consumption.
        }

    }

   public decimal Refuel(decimal amount) {
    if(amount <= 0) {
        Console.WriteLine("Refuel amount must be positive!");

        return this.FuelLevel;
    }

    this.FuelLevel += amount;

    return this.FuelLevel;
   }
}