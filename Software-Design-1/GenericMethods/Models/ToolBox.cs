using System.Numerics;

namespace GenericMethods.Models;

public class Toolbox {
    public required string Name { get; set; }

    public List<string> Tools { get; set; } = new List<string> { "Hammer", "Wrench", "Screwdriver", "Pliers" };

    public override string ToString() {
        string output = $"Toolbox: {this.Name}";

        foreach (string tool in this.Tools) {
            output += $"- {tool}\n";
        }

        return output;
    }

    public string? FindTool(string toolName) {
        return this.Tools.Find(tool => tool == toolName);
    }

    public T Echo<T>(T item) {
        Console.WriteLine($"Echoing: {item?.ToString()}");

        return item;
    }

    public SwapResult<T> Swap<T>(T a, T b) {
        return new SwapResult<T> {
            First = b,
            Second = a
        };
    }

    public T AddNumbers<T>(T a, T b) where T : INumber<T> {
        return a + b;
    }

    public bool ComparePhoneNames<T1, T2>(T1 a, T2 b)
        where T1 : Phone
        where T2 : Phone {

        Console.WriteLine($"Comparing {a} and {b}...");

        return a.Name == b.Name;
    }


    public void Display<T>(T item) {
        Console.WriteLine($"Item: {item}");
    }
}
