/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

/* function getLength(jumpings: number[]): number {
  let totalNumber = 0;

  totalNumber = jumpings.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );

  return totalNumber;
} */

/*------------------1-----------------------*/
function getLength(jumpings: number[]): number {
  return jumpings.reduce((jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump);
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

/* class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  student.passed =
    student.name == "Sebastian"
      ? student.handedInOnTime
        ? true
        : false
      : false;

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
} */

/*------------------2-----------------------*/
class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name == "Sebastian") {
      student.passed = student.handedInOnTime ? true: false;
  }

  if (student.passed) {
    return "VG";
  } else {
    return "IG";
  }
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

/* class Temp {
  constructor(public q: string, public where: Date, public v: number) {}
}

function averageWeeklyTemperature(heights: Temp[]) {
  let r = 0;

  for (let who = 0; who < heights.length; who++) {
    if (heights[who].q === "Stockholm") {
      if (heights[who].where.getTime() > Date.now() - 604800000) {
        r += heights[who].v;
      }
    }
  }

  return r / 7;
} */

/*------------------3-----------------------*/
class Temp {
  constructor(
    public cityName: string, 
    public when: Date, 
    public temperature: number
  ) {}
}

function averageWeeklyTemperature(highestTemp: Temp[]) {
  let averageTemp = 0;
  const ONE_WEEK_IN_MS = 604800000;
  const NUMBER_OF_DAYS = 7;

  for (let i = 0; i < highestTemp.length; i++) {
    if (highestTemp[i].cityName === "Stockholm") {
      if (highestTemp[i].when.getTime() > Date.now() - ONE_WEEK_IN_MS) {
        averageTemp += highestTemp[i].temperature;
      }
    }
  }

  return averageTemp / NUMBER_OF_DAYS;
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

/* function showProduct(
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string,
  parent: HTMLElement
) {
  let container = document.createElement("div");
  let title = document.createElement("h4");
  let pris = document.createElement("strong");
  let imageTag = document.createElement("img");

  title.innerHTML = name;
  pris.innerHTML = price.toString();
  imageTag.src = image;

  container.appendChild(title);
  container.appendChild(imageTag);
  container.appendChild(pris);
  parent.appendChild(container);
} */


/*------------------4-----------------------*/
function showProduct (title:string, price: number, image: string, container: HTMLElement) {
  container.innerHTML = `
  <div>
    <h4>
      ${title}
    </h4>
    <strong>
      ${price}
    </strong>
    <img src="${image}">
  </div>
  `;
}


/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */
/* function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#passedstudents");
      listOfStudents?.appendChild(container);
    } else {
      let container = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = false;

      container.appendChild(checkbox);
      let listOfStudents = document.querySelector("ul#failedstudents");
      listOfStudents?.appendChild(container);
    }
  }
} */

/*------------------5-----------------------*/
function presentStudents(students: Student[]) {
  for (const student of students) {
    let container = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
  
    if (student.handedInOnTime) {
      presentPassedStudents(checkbox, container);
    } else {
      presentFailedStudents(checkbox, container);
    }
  }
}

function presentPassedStudents(checkbox: HTMLInputElement, container: HTMLDivElement) {
  checkbox.checked = true;
  container.appendChild(checkbox);
  let listOfStudents = document.querySelector("ul#passedstudents");
  listOfStudents?.appendChild(container);
}

function presentFailedStudents(checkbox: HTMLInputElement, container: HTMLDivElement) {
  checkbox.checked = false;
  container.appendChild(checkbox);
  let listOfStudents = document.querySelector("ul#failedstudents");
  listOfStudents?.appendChild(container);
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
/* function concatenateStrings() {
  let result = "";
  result += "Lorem";
  result += "ipsum";
  result += "dolor";
  result += "sit";
  result += "amet";

  return result;
} */

/*------------------6-----------------------*/
function concatenateStrings() {
  let textList: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];

  return textList.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/
/* function createUser(
  name: string,
  birthday: Date,
  email: string,
  password: string
) {
  // Validation

  let ageDiff = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

  console.log(userAge);

  if (!(userAge < 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
} */

/*------------------7-----------------------*/
class User {
  constructor(
    public name: string,
    public birthday: Date,
    public email: string,
    public password: string
  ) {}

  calculateAge(): number {
    let ageDiff = Date.now() - this.birthday.getTime();
    let ageDate = new Date(ageDiff);
    let userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    return userAge;
  }
}

function createUser(newUser: User) {
  let newUserAge = newUser.calculateAge();

  if (newUserAge > 20) {
  } else {
    return "Du är under 20 år";
  }
}