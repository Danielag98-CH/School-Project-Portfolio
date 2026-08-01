public class Android : Phone {
    public static string Browser { get; } = "Chrome";
    public List<string> Commands = new List<string>{"Ok Google", "Check Email"};
    public List<string> CommandActions = new List<string>{"Listening..", "Checking Email"};

    public void BrowseInternet() {
        Console.WriteLine($"Using {Android.Browser} to browse internet.");
    }

    public void UseAssistant(string givenCommand) {
        for(int i = 0; i < this.Commands.Count; i++) {
            if(this.Commands[i] == givenCommand){
                Console.WriteLine(this.CommandActions[i]);
                return;
            }
        }
        Console.WriteLine($"'{givenCommand}' is not a valid command.");
    }

    public void CallLarryPage() {
        Console.WriteLine("Calling Larry Page");
    }
}