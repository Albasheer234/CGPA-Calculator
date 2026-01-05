// Course grade points mapping
const gradePoints = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0,
};

// Course data array
let courses = [];

// DOM elements
const courseCodeInput = document.getElementById("courseCode");
const courseUnitInput = document.getElementById("courseUnit");
const gradeSelect = document.getElementById("grade");
const addCourseBtn = document.getElementById("addCourseBtn");
const calculateBtn = document.getElementById("calculateBtn");
const coursesTableBody = document.getElementById("coursesTableBody");
const totalUnitsElement = document.getElementById("totalUnits");
const totalQualityPointsElement = document.getElementById("totalQualityPoints");
const cgpaValueElement = document.getElementById("cgpaValue");
const resultSection = document.getElementById("resultSection");

// Error elements
const courseCodeError = document.getElementById("courseCodeError");
const courseUnitError = document.getElementById("courseUnitError");
const gradeError = document.getElementById("gradeError");

// Clear error messages
function clearErrors() {
  courseCodeError.style.display = "none";
  courseUnitError.style.display = "none";
  gradeError.style.display = "none";
}

// Show error message
function showError(element, message) {
  element.textContent = message;
  element.style.display = "block";
}

// Add a course to the list
function addCourse() {
  clearErrors();

  // Get input values
  const courseCode = courseCodeInput.value.trim();
  const courseUnit = parseInt(courseUnitInput.value);
  const grade = gradeSelect.value;

  // Validate inputs
  if (!courseCode) {
    showError(courseCodeError, "Course code is required");
    return;
  }

  if (isNaN(courseUnit) || courseUnit < 1 || courseUnit > 10) {
    showError(courseUnitError, "Course unit must be a number between 1 and 10");
    return;
  }

  if (!grade) {
    showError(gradeError, "Please select a grade");
    return;
  }

  // Calculate grade point and quality point
  const gradePoint = gradePoints[grade];
  const qualityPoint = gradePoint * courseUnit;

  // Add to courses array
  courses.push({
    code: courseCode,
    unit: courseUnit,
    grade: grade,
    gradePoint: gradePoint,
    qualityPoint: qualityPoint,
  });

  // Update table
  updateTable();

  // Clear form and focus on course code
  courseCodeInput.value = "";
  courseUnitInput.value = "";
  gradeSelect.value = "";
  courseCodeInput.focus();
}

// Update the courses table
function updateTable() {
  if (courses.length === 0) {
    coursesTableBody.innerHTML =
      '<tr class="empty-row"><td colspan="5">No courses added yet. Add your first course above.</td></tr>';
    return;
  }

  let tableHTML = "";
  courses.forEach((course, index) => {
    tableHTML += `
                    <tr>
                        <td>${course.code}</td>
                        <td>${course.unit}</td>
                        <td>${course.grade}</td>
                        <td>${course.gradePoint}</td>
                        <td>${course.qualityPoint}</td>
                    </tr>
                `;
  });

  coursesTableBody.innerHTML = tableHTML;
}

// Calculate CGPA
function calculateCGPA() {
  if (courses.length === 0) {
    alert("Please add at least one course before calculating CGPA.");
    return;
  }

  let totalUnits = 0;
  let totalQualityPoints = 0;

  courses.forEach((course) => {
    totalUnits += course.unit;
    totalQualityPoints += course.qualityPoint;
  });

  const cgpa = totalQualityPoints / totalUnits;

  // Update result section
  totalUnitsElement.textContent = totalUnits;
  totalQualityPointsElement.textContent = totalQualityPoints;
  cgpaValueElement.textContent = cgpa.toFixed(2);

  // Show result section
  resultSection.style.display = "block";

  // Scroll to results
  resultSection.scrollIntoView({ behavior: "smooth" });
}

// Event listeners
addCourseBtn.addEventListener("click", addCourse);

// Allow Enter key to add course
courseCodeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addCourse();
});

courseUnitInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addCourse();
});

gradeSelect.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addCourse();
});

calculateBtn.addEventListener("click", calculateCGPA);

// Initialize with focus on course code
courseCodeInput.focus();
