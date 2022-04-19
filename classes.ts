class Department {
  static fiscalYear = 2022;
  protected employees: string[] = []; //protected makes it unaccesable from outside but accessable from classes that extend the base class
  //instead of protected we can put private, private is modifier and it doesnt allow properties to be accessible from outside, for example we cannot add new Employee like this accounting.employees[2] = "Anna", or in Finance department we cannot add employees if its private

  constructor(private readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return {
      name: name,
    };
  }

  describe(this: Department) {
    console.log(`Department (${this.id}: ${this.name})`);
  }

  methodToOverride() {
    console.log(
      "Method that must be overriden in each class that extends on Department, because it has abstract class"
    );
  }

  addEmployee(emploee: string) {
    //validation etc...
    this.employees.push(emploee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "Accounting");
console.log(accounting);
accounting.describe();

accounting.addEmployee("Slobodan");
accounting.addEmployee("Max");

accounting.printEmployeeInformation();

/* LONGER CODE VERSION */

class Product {
  title: string;
  price: number;
  private isListed: boolean;

  constructor(name: string, pr: number) {
    this.title = name;
    this.price = pr;
    this.isListed = true;
  }
}

/* SHORT CODE VERSION */

class ProductShortened {
  private isListed: boolean;

  constructor(public title: string, public price: number) {
    this.isListed = true;
  }
}

class ITDepartment extends Department {
  //inheritance by using extends option, we must also call super()
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  methodToOverride() {
    console.log(
      "Method that must be overriden in each class that extends on Department, because it has abstract class"
    );
  }
}

const itDept = new ITDepartment("d1", ["Slobodan"]);

itDept.describe();
itDept.name = "NEW NAME IT DEPT";
itDept.printEmployeeInformation();

console.log(itDept);

class FinanceDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Finance");
    this.lastReport = reports[0];
  }

  describe() {
    //here we override method describe from Department
    console.log("Finance Department - ID:");
  }

  addEmployee(name: string) {
    if (name === "Slobodan") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const finance = new FinanceDepartment("d3", []);

finance.addReport("We have made 3,2M profit in last quarter");

finance.printReports();
finance.addEmployee("Slobodan");
finance.addEmployee("Manu");
finance.printEmployeeInformation(); //MANU only because Slobodan can not be employee according to method

//we access GETTERS without () finance.mostRecentReport
finance.mostRecentReport = "This quarter we made 5,5 M profit";
finance.mostRecentReport;
finance.printReports();

const employee1 = Department.createEmployee("Slobodan"); //created using static method
console.log(employee1, Department.fiscalYear); //{name: 'Slobodan'} 2022

//SINGLETON PATTERN is used when we want to make sure to have only one object based on a class. To enforce this we put the private keyword in front of a constructor, for example

class Management extends Department {
  private static instance: Management;

  admins: string[];
  private constructor(id: string, admins: string[]) {
    super(id, "Top Menagement");
    this.admins = admins;
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Management("m1", []);
    return this.instance;
  }

  methodToOverride() {
    console.log(
      "Method that must be overriden in each class that extends on Department, because it has abstract class"
    );
  }
}

const management = Management.getInstance();
const management2 = Management.getInstance(); //these two will be exactly equal, they are the same object, same instance - SINGLETON PATTERN

/* 
1. STATIC METHOD is a method you call directly on a class, not on an object created based on it.
2. The Idea behind INHERITANCE is to allow you to share some common functionality and yet create more specialized blueprints.
3. An ABSTRACT CLASS is a class that cant be instantiated but has to be extended.
4. SINGLETON CLASS is configured such tat you dont create it with new but by calling a method which then ensures that only one instance of the class exists at any given time.
*/