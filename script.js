/**
 * File: script.js
 * Description: Xử lý logic cho ứng dụng To-Do List
 * Author: Khoa Vo
 * Created on: 2025-06-05
 * Last modified on: 2025-06-21
 */

/**
 * Gets the trimmed text from the task input field.
 * 
 * @returns {string} Text value received from users
 */
function getInputValue () {
    return document.getElementById("task-value").value.trim();
};

/**
 * Verifies the user input for an empty task.
 * 
 * Displays an error message for 3 seconds if the input is empty,
 * otherwise clears any error message and confirms valid input.
 *
 * @returns {boolean} Returns true if input is valid, false if empty.
 */
function verifyTasks () {
    // Variables
    const toVerify = getInputValue ();
    const errorSpan = document.getElementById("error-msg");

    // Handling logic
    if (toVerify === "") {
        errorSpan.textContent = "Sorry, the activity should not be empty!";
        errorSpan.classList.add("show");

        // Clear any previous timeout (to avoid stacking)
        clearTimeout(window.errorTimeout);

        // Set a timeout to remove the message after 3 seconds
        window.errorTimeout = setTimeout(() => {
            errorSpan.classList.remove("show");
            errorSpan.textContent = "";
        }, 3000); 

        return false;
    };

    // Clear error and reset input
    errorSpan.textContent = "";
    
    return true;
};

/**
 * Displays a task in the task list with a trash icon for removal.
 *
 * @param {string} value - The text content of the task to be added.
 * @returns {void}
 */
function displayTasks (value) {
    // Variables
    const disPanel = document.getElementById("task-list");
    const li = document.createElement("li");
    const icon = document.createElement("i");
    
    // Enable the list to be visible
    disPanel.style.display = "block";

    // Set up list items
    li.classList.add("set-task");
    li.textContent = value;

    // Set up the icon
    icon.classList.add("fa-solid", "fa-trash");
    icon.style.marginLeft = "10px";
    icon.style.cursor = "pointer";
    icon.addEventListener("click", () => {
        li.remove();
    });

    // Append icon to list item and list item to panel
    li.appendChild(icon);
    disPanel.appendChild(li);
};

/**
 * Initializes the task app by attaching an event listener to the Add button.
 *
 * On click, verifies input and, if valid, displays the task and clears the input field.
 *
 * @returns {void}
 */
function run () {
    // Listener of submit button
    document.getElementById("add-btn").addEventListener("click", function(event) {
        event.preventDefault();
        // Variables
        const isValid = verifyTasks ();
        
        // Handling logic of Listener
        if (isValid) {
            const taskValue = getInputValue();
            displayTasks(taskValue);
            document.getElementById("task-value").value = "";
        };
    });
};

run ();