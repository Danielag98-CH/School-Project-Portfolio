public class iPhone {
    public static string Company { get; set; } = "Apple";
    public required string Owner { get; set; } = "None";
    public List<string> MusicList { get; set; } 
        = new List<string> {};

    public static string CallSteveJobs() {       
        return "Calling Steve Jobs!";
    }

    public string PlayMusic() {

        return $"{iPhone.Company} Playing {this.MusicList[0]}";
    }


}