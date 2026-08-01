public class EmployeeWriter {
    public required string DirPath { get; set; }

    public void Write(Employee employee, EmployeeOptions? options = null) {
        Directory.CreateDirectory(this.DirPath);

        // Move into the directory
        Directory.SetCurrentDirectory(this.DirPath);

        if (null == options) {
            options = new EmployeeOptions { };
        }

        string fileName = $"{employee.Id}.txt";
        string content = $"Selected Employee:\n\tID: {employee.Id}\n\tFull Name: {employee.FullName}\n\tAnnual Salary: {employee.AnnualSalary}";

        if (options.IncludePosition) {
            content
                += $"\n\tPosition ID: {employee.Position.Id}\n\tPosition Description: {employee.Position.Description}";
        }

        if (options.IncludeBenefits) {
            content += "\n\tBenefits:\n";

            foreach (Benefit benefit in employee.Benefits) {
                content += @$"ID: {benefit.Id}
                    Description: {benefit.Description}
                    Additional Amount: {benefit.Additional}
                    -----------------------------------------
                ";
            }
        }


        // Write out to the file
        File.WriteAllText(fileName, content);
        Directory.SetCurrentDirectory("..");
    }

    public void WriteAll(List<Employee> employees, EmployeeOptions? options = null) {
        /**
            Write out all employees in the list
            in the same format as the Write()
            method does.
        */
        foreach (Employee employee in employees) {
            this.Write(employee, options);
        }
    }
}