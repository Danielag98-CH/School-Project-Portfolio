public class SmartBox<T> where T : Phone {
    public required string Name { get; set; }
    public required T FeaturedItem { get; set; }
    public List<T> ItemList { get; set; } = new List<T> {};

    public override string ToString(){
        // Notice that we can call "Brand" property because T : Phone.
        string output = $"{this.Name} Brand: {this.FeaturedItem.Brand} | Featured Item: {this.FeaturedItem}\nItemList:\n";

        foreach (T elem in this.ItemList) {
            // Can also call the Name property because T : Phone.
            output += $"{elem.Name}\n";
        }

        return output;
    }

    public T SomeMethod() {
        return this.FeaturedItem;
    }
}