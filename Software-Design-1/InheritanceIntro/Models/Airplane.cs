public class Airplane : Vehicle {
    public string Airline { get; private set; }
    public int MaxAltitude { get; private set; }
    protected int NumEngines { get; set; }

    public Airplane(string airline, int maxAltitude, int numEngines) {
        Console.WriteLine("Airplane constructor!");
        this.Airline = airline;
        this.MaxAltitude = maxAltitude;
        this.NumEngines = numEngines;
    }

    public override void Drive() {
        Console.WriteLine("Airplane is flying");
    }

    public override void Stop() {
        Console.WriteLine("Airplane is landing");
    }

    public void DeployLandingGear() {
        Console.WriteLine("Deploying landing gear");
    }

    protected void EngineCheck() {
        Console.WriteLine("Checking " + this.NumEngines + " engines");
    }

}