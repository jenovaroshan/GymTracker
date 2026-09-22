/* =========================
   GYMTRACKER
   MAIN JAVASCRIPT
========================= */


/* =========================
   DATA
========================= */

let workouts =
    JSON.parse(
        localStorage.getItem("gymWorkouts")
    ) || [];


let profile = {
    name: "roshan",
    age: 19,
    weight: 71,
    height: 175
};


/* =========================
   SAVE DATA
========================= */

function saveData() {

    localStorage.setItem(
        "gymWorkouts",
        JSON.stringify(workouts)
    );
}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateStats() {

    let totalSets = 0;

    let totalReps = 0;


    workouts.forEach(function(workout) {

        totalSets += workout.sets;

        totalReps +=
            workout.sets *
            workout.reps;

    });


    document.getElementById(
        "workoutCount"
    ).textContent = workouts.length;


    document.getElementById(
        "setCount"
    ).textContent = totalSets;


    document.getElementById(
        "repCount"
    ).textContent = totalReps;
}


/* =========================
   PROFILE
========================= */

function showProfile() {

    alert(
        "👤 MY PROFILE\n\n" +

        "Name: " +
        profile.name +

        "\nAge: " +
        profile.age +
        " years" +

        "\nWeight: " +
        profile.weight +
        " kg" +

        "\nHeight: " +
        profile.height +
        " cm"
    );
}


/* =========================
   OPEN WORKOUT FORM
========================= */

function openWorkoutForm() {

    closePanels();

    document
        .getElementById("workoutSection")
        .classList.remove("hidden");

    document
        .getElementById("exerciseInput")
        .focus();
}


/* =========================
   SAVE WORKOUT
========================= */

function saveWorkout() {

    let exercise =
        document
            .getElementById("exerciseInput")
            .value
            .trim();


    let sets =
        Number(
            document
                .getElementById("setsInput")
                .value
        );


    let reps =
        Number(
            document
                .getElementById("repsInput")
                .value
        );


    let weight =
        Number(
            document
                .getElementById("weightInput")
                .value
        );


    if (exercise === "") {

        alert(
            "Please enter exercise name."
        );

        return;
    }


    if (sets <= 0 || reps <= 0) {

        alert(
            "Please enter valid sets and reps."
        );

        return;
    }


    let workout = {

        id: Date.now(),

        exercise: exercise,

        sets: sets,

        reps: reps,

        weight: weight,

        date:
            new Date()
                .toLocaleDateString()

    };


    workouts.push(workout);


    saveData();

    updateStats();

    clearWorkoutForm();

    closePanels();


    alert(
        "✅ Workout Added Successfully!"
    );
}


/* =========================
   CLEAR FORM
========================= */

function clearWorkoutForm() {

    document
        .getElementById("exerciseInput")
        .value = "";

    document
        .getElementById("setsInput")
        .value = "";

    document
        .getElementById("repsInput")
        .value = "";

    document
        .getElementById("weightInput")
        .value = "";
}


/* =========================
   WORKOUT HISTORY
========================= */

function showHistory() {

    closePanels();


    let section =
        document
            .getElementById("historySection");


    let list =
        document
            .getElementById("historyList");


    section.classList.remove("hidden");


    if (workouts.length === 0) {

        list.innerHTML =
            "<p>No workouts added yet.</p>";

        return;
    }


    list.innerHTML = "";


    workouts
        .slice()
        .reverse()
        .forEach(function(workout) {

            let card =
                document.createElement("div");


            card.className =
                "workout-card";


            card.innerHTML = `

                <h3>
                    🏋️ ${workout.exercise}
                </h3>

                <p>
                    📅 ${workout.date}
                </p>

                <p>
                    💪 ${workout.sets} Sets ×
                    ${workout.reps} Reps
                </p>

                <p>
                    ⚖️ Weight:
                    ${workout.weight || 0} kg
                </p>

                <div class="workout-actions">

                    <button
                        onclick="editWorkout(${workout.id})"
                    >
                        ✏️ Edit
                    </button>

                    <button
                        class="delete"
                        onclick="deleteWorkout(${workout.id})"
                    >
                        🗑️ Delete
                    </button>

                </div>
            `;


            list.appendChild(card);

        });
}


/* =========================
   EDIT WORKOUT
========================= */

function editWorkout(id) {

    let workout =
        workouts.find(
            function(item) {
                return item.id === id;
            }
        );


    if (!workout) {
        return;
    }


    let exercise =
        prompt(
            "Exercise name:",
            workout.exercise
        );


    if (!exercise) {
        return;
    }


    let sets =
        prompt(
            "Number of sets:",
            workout.sets
        );


    if (!sets) {
        return;
    }


    let reps =
        prompt(
            "Reps per set:",
            workout.reps
        );


    if (!reps) {
        return;
    }


    let weight =
        prompt(
            "Weight in kg:",
            workout.weight
        );


    workout.exercise =
        exercise;

    workout.sets =
        Number(sets);

    workout.reps =
        Number(reps);

    workout.weight =
        Number(weight) || 0;


    saveData();

    updateStats();

    showHistory();


    alert(
        "✅ Workout updated successfully!"
    );
}


/* =========================
   DELETE WORKOUT
========================= */

function deleteWorkout(id) {

    let confirmDelete =
        confirm(
            "Delete this workout?"
        );


    if (!confirmDelete) {
        return;
    }


    workouts =
        workouts.filter(
            function(workout) {
                return workout.id !== id;
            }
        );


    saveData();

    updateStats();

    showHistory();
}


/* =========================
   PROGRESS
========================= */

function showProgress() {

    closePanels();


    document
        .getElementById("progressSection")
        .classList.remove("hidden");


    let totalSets = 0;

    let totalReps = 0;


    workouts.forEach(function(workout) {

        totalSets += workout.sets;

        totalReps +=
            workout.sets *
            workout.reps;

    });


    document
        .getElementById(
            "progressWorkout"
        )
        .textContent =
        workouts.length;


    document
        .getElementById(
            "progressSets"
        )
        .textContent =
        totalSets;


    document
        .getElementById(
            "progressReps"
        )
        .textContent =
        totalReps;


    let workoutPercent =
        Math.min(
            workouts.length * 10,
            100
        );


    let setPercent =
        Math.min(
            totalSets,
            100
        );


    let repPercent =
        Math.min(
            totalReps / 2,
            100
        );


    document
        .getElementById(
            "workoutProgressBar"
        )
        .style.width =
        workoutPercent + "%";


    document
        .getElementById(
            "setProgressBar"
        )
        .style.width =
        setPercent + "%";


    document
        .getElementById(
            "repProgressBar"
        )
        .style.width =
        repPercent + "%";
}


/* =========================
   BMI CALCULATOR
========================= */

function calculateBMI() {

    let height =
        prompt(
            "Enter your height in cm:",
            profile.height
        );


    if (!height || isNaN(height)) {

        alert(
            "Please enter a valid height."
        );

        return;
    }


    let weight =
        prompt(
            "Enter your weight in kg:",
            profile.weight
        );


    if (!weight || isNaN(weight)) {

        alert(
            "Please enter a valid weight."
        );

        return;
    }


    let heightMeters =
        Number(height) / 100;


    let bmi =
        Number(weight) /
        (
            heightMeters *
            heightMeters
        );


    bmi =
        bmi.toFixed(1);


    let category;


    if (bmi < 18.5) {

        category =
            "Underweight";

    }
    else if (bmi < 25) {

        category =
            "Normal weight";

    }
    else if (bmi < 30) {

        category =
            "Overweight";

    }
    else {

        category =
            "Obesity";

    }


    alert(

        "⚖️ BMI RESULT\n\n" +

        "BMI: " +
        bmi +

        "\nCategory: " +
        category

    );
}


/* =========================
   CALORIES CALCULATOR
========================= */

function calculateCalories() {

    let weight =
        prompt(
            "Enter your weight in kg:",
            profile.weight
        );


    if (!weight || isNaN(weight)) {

        alert(
            "Please enter a valid weight."
        );

        return;
    }


    let duration =
        prompt(
            "Workout duration in minutes:"
        );


    if (!duration || isNaN(duration)) {

        alert(
            "Please enter a valid duration."
        );

        return;
    }


    /*
       Approximate workout calorie estimate.
       This is not a medical measurement.
    */

    let calories =

        (Number(weight) / 70) *

        7 *

        Number(duration);


    calories =
        Math.round(calories);


    alert(

        "🔥 CALORIES BURNED\n\n" +

        "Duration: " +
        duration +
        " minutes\n\n" +

        "Estimated Calories: " +
        calories +
        " kcal"

    );
}


/* =========================
   CLEAR ALL DATA
========================= */

function clearData() {

    if (workouts.length === 0) {

        alert(
            "No workout data to delete."
        );

        return;
    }


    let confirmDelete =
        confirm(
            "⚠️ Delete ALL workout data?"
        );


    if (!confirmDelete) {
        return;
    }


    workouts = [];


    localStorage.removeItem(
        "gymWorkouts"
    );


    updateStats();

    closePanels();


    alert(
        "🗑️ All workout data deleted."
    );
}


/* =========================
   CLOSE PANELS
========================= */

function closePanels() {

    document
        .getElementById(
            "workoutSection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "historySection"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "progressSection"
        )
        .classList.add("hidden");
}


/* =========================
   INITIAL LOAD
========================= */

updateStats();