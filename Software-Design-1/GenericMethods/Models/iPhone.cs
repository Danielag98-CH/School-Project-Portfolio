public class iPhone : Phone {
    public static string Browser { get; } = "Safari";
    public List<string> Commands = new List<string> { "Hey Siri", "Check Weather" };
    public List<string> CommandActions = new List<string> { "Listening..", "Displaying Weather" };

    public void BrowseInternet() {
        Console.WriteLine($"Using {iPhone.Browser} to browse internet.");
    }

    public void UseAssistant(string givenCommand) {
        for (int i = 0; i < this.Commands.Count; i++) {
            if (this.Commands[i] == givenCommand) {
                Console.WriteLine(this.CommandActions[i]);
                return;
            }
        }
        Console.WriteLine($"'{givenCommand}' is not a valid command.");
    }

    public void CallSteveJobs() {
        Console.WriteLine("Calling Steve Jobs");
    }
}