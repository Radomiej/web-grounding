'use strict';

const student = {
    name: 'Ola',
    points: [4, 5, 3, 4],
};
const passingGrade = 3.5;

function calculateAverage(values) {
    let total = 0;

    for (const value of values) {
        total += value;
    }

    return values.length === 0 ? 0 : total / values.length;
}

const average = calculateAverage(student.points);
const passed = average >= passingGrade;

console.log(`Uczeń: ${student.name}`);
console.log(`Średnia: ${average.toFixed(2)}`);

if (passed) {
    console.log('Wynik: zaliczone');
} else {
    console.log('Wynik: jeszcze niezaliczone');
}
