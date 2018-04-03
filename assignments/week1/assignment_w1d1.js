"use strict";

document.addEventListener("DOMContentLoaded", function() {
    // Exercise 1
    (() => {
        const items = Array.from(document.querySelectorAll("[data-time]"));
        const filteredItems = items.filter(item => item.textContent.indexOf("ECMA6") > -1);
        const mappedItemsByTime = items.map(item => item.getAttribute("data-time"));
        const mappedItemsToSecond = items.map(item => item.getAttribute("data-time").split(":")[1]);
        const reducedItems = items.reduce((total, time) => {
            let totalMinute = parseInt(total.split(":")[0]);
            let totalSecond = parseInt(total.split(":")[1]);
            const minute = parseInt(time.getAttribute("data-time").split(":")[0]);
            const second = parseInt(time.getAttribute("data-time").split(":")[1]);
            totalMinute += minute;

            if(totalSecond + second >= 60) {
                totalMinute += 1;
                totalSecond = totalSecond + second > 60 ? totalSecond + second - 60 : 0;
            } else {
                totalSecond += second;
            }

            return totalMinute.toString() + ":" + totalSecond.toString();
        }, "0:00");
        console.log("Exercise 1\n");
        console.log("Items: ", items);
        console.log("Filtered Items: ", filteredItems);
        console.log("Mapped array by time: ", mappedItemsByTime);
        console.log("Mapped array of second: ", mappedItemsToSecond);
        console.log("Total Time: ", reducedItems);
        console.log("\n\n\n");
    })();

    // Exercise 2
    (() => {
        const library = [
            { prof: 'Asaad Saad', course: 'WAP', courseID: 'CS452' },
            { prof: 'Rakesh Shrestha', course: 'WAA', courseID: 'CS545' },
            { prof: 'Steve Nolle', course: 'SWE', courseID: 'CS425' }
        ];
        library.sort().reverse();
        console.log("Exercise 2\n");
        console.log("Prof array sorted by course name: ", library);
        console.log("\n\n\n");
    })();

    // Exercise 3
    (() => {
        const numbers = [3, 62, 234, 7, 23, 74, 23, 76, 92];
        const filteredNumbers = numbers.filter(number => number > 70);
        console.log("Exercise 3\n");
        console.log("Numbers: ", numbers);
        console.log("Numbers greater than 70: ", filteredNumbers);
        console.log("\n\n\n");
    })();

    // Exercise 4
    (() => {
        class BMICalculator {
            constructor(height, weight) {
                this.height = height;
                this.weight = weight;
            }

            calculate() {
                return this.weight / (this.height * this.height);
            }
        }

        document.getElementById("calculate").onclick = function () {
            let height = parseFloat(document.getElementsByName("height")[0].value);
            const weight = parseFloat(document.getElementsByName("weight")[0].value);
            const unit = document.getElementsByName("unit")[0].value;
            const output = document.getElementById("output");
            if(!height && !weight) {
                output.classList.add("error");
                output.innerHTML = "Height and weight inputs can not be empty!";
                return;
            }
            if(!height) {
                output.classList.add("error");
                output.innerHTML = "Height input can not be empty!";
                return;
            }
            if(!weight) {
                output.classList.add("error");
                output.innerHTML = "Weight input can not be empty!";
                return;
            }
            if(!unit) {
                output.classList.add("error");
                output.innerHTML = "You should select unit!";
                return;
            }
            height /= 100;
            output.className = output.className.replace("error", "");

            const calculator = new BMICalculator(height, weight);
            const bmi = calculator.calculate();
            if(bmi < 15) {
                output.innerHTML = `Your bmi is ${bmi}. You're very severely underweight`;
            } else if(bmi >= 15 && bmi < 16) {
                output.innerHTML = `Your bmi is ${bmi}. You're severely underweight`;
            } else if(bmi >= 16 && bmi < 18.5) {
                output.innerHTML = `Your bmi is ${bmi}. You're underweight`;
            } else if(bmi >= 18.5 && bmi < 25) {
                output.innerHTML = `Your bmi is ${bmi}. You're normal (healthy weight)`;
            } else if(bmi >= 25 && bmi < 30) {
                output.innerHTML = `Your bmi is ${bmi}. You're overweight`;
            } else if(bmi >= 30 && bmi < 35) {
                output.innerHTML = `Your bmi is ${bmi}. You're moderately obese`;
            } else if(bmi >= 35 && bmi < 40) {
                output.innerHTML = `Your bmi is ${bmi}. You're severely obese`;
            } else if(bmi >= 40) {
                output.innerHTML = `Your bmi is ${bmi}. You're very severely obese`;
            }
        };
    })();

    // Exercise 5
    (() => {
        function Person(name) {
            this.name = name;
            this.subject = "";
        }
        Person.prototype.teach = function(subject) {
            return `${this.name} is now teaching ${subject}`
        };
        const TeacherA = new Person("Asaad Saad");
        const TeacherB = new Person("Rujuan Xing");
        console.log("Exercise 5\n");
        console.log(TeacherA.teach("WAP"));
        console.log(TeacherB.teach("MWA"));
        console.log("\n\n\n");
    })();

    // Exercise 6
    (() => {
        String.prototype.filter = function(args) {
            return this.replace(new RegExp(args.join("|"), "g"), "***");
        };

        console.log("Exercise 6\n");
        console.log("This house is nice!".filter(["house", "nice"]));
        console.log("\n\n\n");
    })();

    // Exercise 7
    (() => {
        Array.prototype.bubbleSort = function() {
            const length = this.length;
            for(let i in this) {
                for(let j = 0; j < (length - i - 1); j++) {
                    if(this[j] > this[j + 1]) [this[j], this[j + 1]] = [this[j + 1], this[j]];
                }
            }
            return this;
        }

        console.log("Exercise 7\n");
        console.log("Sorted array: ", [6, 4, 0, 3, -2, 1].bubbleSort());
        console.log("\n\n\n");
    })();
});