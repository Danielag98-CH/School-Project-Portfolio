int[] numbers = new int[8];

int[] numbersAgain = {3, 4, 6};

var x = 8;


//==================


List<int> numbersProper = 
    new List<int>{3, 4, 6};

foreach(int elem in numbersProper){
    Console.WriteLine($"elem: {elem}");
}

Console.WriteLine("\n\n");
numbersProper.Add(8);

foreach(int elem in numbersProper){
    Console.WriteLine($"elem: {elem}");
}

Console.WriteLine($"numbersProper count: {numbersProper.Count}");

List<int> test = new List<int>();
// test.Add(8);

Console.WriteLine($"test count: {test.Count}");


