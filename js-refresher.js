const students = [
{ id: 1, name: "Amina", year: 3, grades: [9, 8, 10],
contact: { github: "amina-dev" } },
{ id: 2, name: "Emir", year: 2, grades: [6, 7, 7] },
{ id: 3, name: "Lejla", year: 3, grades: [10, 9, 9],
contact: { github: "lejla-codes" } },
{ id: 4, name: "Tarik", year: 3, grades: [7, 6, 8] },
];


const greet = (student) => { return `Hi ${student.name}, you are in year ${student.year}`};


students.forEach((student)=>{
    console.log(greet(student));
});


const names =  students.map((student) => {
   return student.name;
});

console.log(names);

const thirdYearStudents = students
    .filter((student) => {

        if(student.year == 3){
            return student.year
        }
    })
    .map((student) => {
        return student.name;
    });

console.log(thirdYearStudents);


const average = (grades) => {
    const sum = grades.reduce((total, grade) => {
        return total + grade;
    }, 0);

    return sum / grades.length;
};

const studentsWithAverage = students.map((student) => {
    return {
        ...student,
        average: average(student.grades)
    };
});

studentsWithAverage.forEach((student) => {
    console.log(`${student.name}: ${student.average.toFixed(2)}`);
});



const updatedStudents = students.map((student) => {
    if (student.name === "Emir") {
        return {
            ...student,
            year: 3
        };
    }

    return student;
});

console.log(`Original: Emir is in year ${students[1].year}`);
console.log(`Updated: Emir is in year ${updatedStudents[1].year}`);



students.forEach((student) => {
    const github = student.contact?.github ?? "no GitHub";

    console.log(`${student.name}: ${github}`);
});



async function loadUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const user = await response.json();

        console.log(`User ${id}: ${user.name}`);

    } catch (error) {
        console.log(`Could not load user ${id}`);
    }
}

loadUser(1);
