public static class HouseChanger {

    public static string Test {get; set;} = "Test";

    /*
	 * What would you expect the variable in the Program.cs which was passed in
	 * for "heightOne" here to be after this method call?
	 */
    public static int AddMeasurements(int heightOne, int heightTwo) {
        int result = heightOne + heightTwo;
        heightOne = 8;

        return result;
    }

    /*
	 * What would you expect the variable in the Program.cs which was passed in
	 * for "material" here to be after this method call?
	 */
    public static void MaterialTest(string material) {
        material = "brick";
    }

    /*
	 * What would you expect the variable in the Program.cs which was passed in
	 * for "house" here will have its "color" property after this method call?
	 */
    public static void PaintHouse(House house, string newColor) {
        house.Color = newColor;
    }

    public static void ChangeNumDoors(House house, int newNumDoors) {
        // make sure newNumDoors is valid
        if (newNumDoors >= 0) {
            // change number of doors of house passed
            house.NumDoors = newNumDoors;
        }

    }

}