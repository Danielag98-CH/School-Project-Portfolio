using System.Text.Json;

EmployeeWriter writer = new EmployeeWriter { DirPath = "./Employees" };

string jsonFilePath = "./company_info.json";
string json = File.ReadAllText(jsonFilePath);

Company? companyA
    = JsonSerializer.Deserialize<Company>(json);

EmployeeOptions empOptions = new EmployeeOptions { IncludePosition = true, IncludeBenefits = true };

Employee singleEmployee = companyA.Employees[0];

// writer.Write(singleEmployee, empOptions);

writer.WriteAll(companyA.Employees);

