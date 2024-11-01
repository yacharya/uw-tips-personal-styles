// Define the questions and words
const questions = [
    ["Competitive", "Joyful", "Considerate",  "Harmonious"],
    ["Powerful", "Good mixer", "Easy on others", "Organized"],
    ["Bold", "Charming", "Loyal", "Easily Led"],
    ["Stubborn", "Attractive", "Sweet", "Avoids"],
    ["Argumentative", "Light-hearted", "Nonchalant", "Adaptable"],
    ["Forceful", "Admirable", "Kind", "Non-resisting"],
    ["Tries new ideas", "Optimistic", "Wants to please", "Respectful"],
    ["Restless", "Popular", "Neighbourly", "Abides by rules"],
    ["Outspoken", "Companionable", "Restrained", "Accurate"],
    ["Decisive", "Talkative", "Controlled", "Conventional"],
    ["Original", "Persuasive", "Gentle", "Humble"],
    ["Assertive", "Confident", "Sympathetic", "Tolerant"],
    ["Will-power", "Open-minded", "Cheerful", "Obliging"],
    ["Unconquerable", "Playful", "Obedient", "Fussy"],
    ["Brave", "Inspiring", "Submissive", "Timid"],
    ["Positive", "Trusting", "Contented", "Peaceful"],
    ["Determined", "Convincing", "Good-natured", "Cautious"],
    ["Aggressive", "Life-of-the-party", "Easily-fooled", "Uncertain"],
    ["Daring", "Expressive", "Satisfied", "Diplomatic"],
    ["Self-reliant", "Fun-loving", "Patient", "Soft-spoken"],
    ["Nervy", "Jovial", "Even-tempered", "Precise"],
    ["Takes risks", "Warm", "Willing to help", "Not extreme"],
    ["Persistent", "Lively", "Generous", "Well-disciplined"],
    ["Eager", "High-spirited", "Willing", "Agreeable"]
];

// Scoring arrays for each style
/*
const scoringArrays = {
    '1': [-0.5, 0, 1, 2, 2.25, 3, 3.5, 4, 4.5, 5, 5.5, 6, 7, 8, 9, 10, 11, 12,14, 16, 18],
    '2': [0, 0.5, 1, 2, 2.2, 2.75, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 9, 10, 11, 12, 14, 16],
    '3': [-0.75, -0.5, 0, 1, 1.5, 1.75, 2, 3, 4, 4.5, 5, 6, 7, 7.5, 8, 9, 10, 12, 14 ,16],
    '4': [-0.5, 0, 0.5, 1, 2, 2.5, 3, 4, 4.5, 4.8, 5, 6, 6.5, 7, 7.5, 8, 9 ,10, 12, 14]
};
*/

const scoringArrays = {
    '1': [10, 15, 21, 30, 36, 43, 51, 57, 62, 68, 73, 80, 87, 90, 94, 97, 100, 103, 107],
    '2': [4, 16, 20, 33, 41, 48, 58, 67, 72, 76, 81, 88, 95, 98, 102, 105, 108],
    '3': [14, 21, 36, 42, 46, 60, 64, 69, 76, 81, 87, 90, 93, 96, 100, 103, 106],
    '4': [10, 22, 31, 39, 45, 63, 66, 74, 81, 87, 93, 97, 100, 103, 107]
};

// Styles mapping
const stylesMap = {
    '1': 'Driver',
    '2': 'Expressive',
    '3': 'Amiable',
    '4': 'Analytical'
};

//Commenting out the style description changes
// Style descriptions
/*
const styleDescriptions = {
    'Analytical': 'Analytical individuals are constantly analyzing, looking for pros and cons and asking questions. They may be brilliant at generating ideas or solving problems, but they may also over-analyze and get stuck in “analysis paralysis”.',
    'Driver': 'Drivers are often strong personalities who are motivated and sometimes forceful in their efforts to reach their goals. They often take the lead and are quick to action. They may come across as dominant and brash.',
    'Expressive': 'Expressive people are sociable, talkative and comfortable with others. They are great at communicating and enthusing others, but are not always great at actual delivery of tasks.',
    'Amiable': 'Amiable people are calm, relaxed, hard to excite and will generally go out of their way not to upset others. They tend to want harmony, but at times this desire and some of their other traits can lead others to think they are indifferent.'
};
*/

// Global variables
let counts = {
    '1': 0, // Driver
    '2': 0, // Expressive
    '3': 0, // Amiable
    '4': 0  // Analytical
};

let currentQuestionIndex = 0;

// Global 'scores' variable
let scores = {};

// Store user selections
let userSelections = {};

// Function to render a question card
function renderQuestionCard(index) {
    const questionCard = document.getElementById('questionCard');
    const progressBar = document.getElementById("progressBar"); // Updated ID
    questionCard.innerHTML = ''; // Clear previous content

    // Update progress bar
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.value = progress;

    const words = questions[index];

    const card = document.createElement('div');
    card.className = 'card';

    // Question text
    const questionText = document.createElement('p');
    questionText.textContent = `Select the word that describes you best:`;
    card.appendChild(questionText);

    // Options
    words.forEach((word, idx) => {
        const wordValue = (idx + 1).toString(); // '1' to '4'
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${index + 1}`;
        input.id = `q${index + 1}-option${idx + 1}`;
        input.value = wordValue;

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = word;

        card.appendChild(input);
        card.appendChild(label);
    });

    questionCard.appendChild(card);

    // Restore previous selection if any
    const previousSelection = userSelections[`q${index + 1}`];
    if (previousSelection) {
        const selectedOption = document.getElementById(`q${index + 1}-option${previousSelection}`);
        if (selectedOption) {
            selectedOption.checked = true;
        }
    }

    // Update navigation buttons
    updateNavigationButtons();
}

// Update the progress bar based on the current question index
function updateProgressBar() {
    const progressBar = document.getElementById("progressBar"); // Updated ID
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.value = progress;
}

// Function to update navigation buttons
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    prevButton.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.textContent = 'Submit';
    } else {
        nextButton.textContent = 'Next';
    }
}

// Function to handle navigation
function handleNavigation(event) {
    const action = event.target.id;

    // Get the selected option
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (!selectedOption) {
        alert('Please select a word before proceeding.');
        return;
    }

    // Save the user's selection
    userSelections[`q${currentQuestionIndex + 1}`] = selectedOption.value;

    if (action === 'nextButton') {
        if (currentQuestionIndex === questions.length - 1) {
            calculateResults();
            return;
        }

        currentQuestionIndex++;
        updateProgressBar();
        renderQuestionCard(currentQuestionIndex);

    } else if (action === 'prevButton') {
        currentQuestionIndex--;
        updateProgressBar();
        renderQuestionCard(currentQuestionIndex);
    }
}

// Function to calculate results
function calculateResults() {
    // Reset counts
    counts = {'1': 0, '2': 0, '3': 0, '4': 0};

    // Tally counts based on user selections
    for (let key in userSelections) {
        const value = userSelections[key];
        counts[value]++;
    }

    // Compute scores using the scoring arrays
    scores = {};
    for (let value in counts) {
        const count = counts[value];
        const scoringArray = scoringArrays[value];
        // Ensure we don't exceed the array length
        const index = Math.min(count, scoringArray.length - 1);
        scores[value] = scoringArray[index];
    }

    // Determine predominant and backup styles
    const sortedStyles = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
    const predominantStyle = stylesMap[sortedStyles[0]];
    const backupStyle = stylesMap[sortedStyles[1]];

    // Display the predominant and backup styles
    document.getElementById('styleName').textContent = predominantStyle;
    document.getElementById('backupStyleName').textContent = backupStyle;

    // Store for later use
    window.predominantStyle = predominantStyle;
    window.backupStyle = backupStyle;

    // Show the bar chart
    drawBarChart(scores);

    // Show the result section
    document.getElementById('result').classList.remove('hidden');

    // Hide the quiz container
    document.getElementById('quizContainer').classList.add('hidden');
}

// Function to draw the bar chart with scale and legend
function drawBarChart(scores) {
    const canvas = document.getElementById('barChart');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const labels = ['Driver', 'Expressive', 'Amiable', 'Analytical'];
    const data = [scores['1'], scores['2'], scores['3'], scores['4']];
    const colors = ['#e74c3c', '#9b59b6', '#3498db', '#2ecc71']; //Contrasting colors - changed from Purple and Blue shades

    // Find the maximum score for scaling
    const maxScore = Math.max(...data);

    // Bar chart settings
    const barWidth = 47.5; //Decreased bar graph width
    const gap = 40; //Increase gap between bar graphs
    const chartHeight = canvas.height - 70; // Leave space for labels and scale

    // Scaling factor
    const scale = chartHeight / (maxScore * 1.2); // Added extra space for scale

    // Draw Y-axis scale and grid lines
    const numYLabels = 5;
    ctx.fillStyle = '#000';
    ctx.font = '12px Poppins';
    for (let i = 0; i <= numYLabels; i++) {
        const y = chartHeight - (chartHeight / numYLabels) * i + 20;
        //const value = (maxScore / numYLabels) * i;
        //ctx.fillText(value.toFixed(1), 10, y);

        // Draw horizontal grid lines
        ctx.beginPath();
        ctx.moveTo(40, y - 5);
        ctx.lineTo(canvas.width - 20, y - 5);
        ctx.strokeStyle = '#e0e0e0';
        ctx.stroke();
    }

    // Draw bars
    data.forEach((score, index) => {
        const barHeight = score * scale;
        const x = index * (barWidth + gap) + 100;
        const y = canvas.height - barHeight - 50;

        // Draw bar
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw score value
        //ctx.fillStyle = '#000';
        //ctx.font = '14px Arial';
        //ctx.fillText(score.toFixed(2), x + barWidth / 4, y - 10);
    });

    // Draw X-axis labels
    labels.forEach((label, index) => {
        const x = index * (barWidth + gap) + 100;
        ctx.fillStyle = '#000';
        ctx.font = '14px Poppins';
        ctx.fillText(label, x + barWidth / 4 - 15, canvas.height - 30);
    });

    // Draw legend
    /*
    const legendX = canvas.width - 130;
    const legendY = 20;
    labels.forEach((label, index) => {
        // Draw color box
        ctx.fillStyle = colors[index];
        ctx.fillRect(legendX, legendY + index * 25, 15, 15);

        // Draw text
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.fillText(label, legendX + 20, legendY + 12 + index * 25);
    });
    */
}

// Function to reset the quiz
function retakeQuiz() {
    // Reset counts
    counts = {'1': 0, '2': 0, '3': 0, '4': 0};
    currentQuestionIndex = 0;

    // Reset scores and user selections
    scores = {};
    userSelections = {};

    // Show the quiz container
    document.getElementById('quizContainer').classList.remove('hidden');
    // Hide the result section
    document.getElementById('result').classList.add('hidden');

    /*
    // Hide style descriptions
    document.getElementById('styleDescriptions').classList.add('hidden');
    */

    // Render the first question
    renderQuestionCard(currentQuestionIndex);
}

// Function to start the quiz
function startQuiz() {
    // Hide the introduction screen
    document.getElementById('introScreen').classList.add('hidden');
    // Show the quiz container
    document.getElementById('quizContainer').classList.remove('hidden');

    // Initialize progress bar to first question
    const progressBar = document.getElementById("progressBar");
    progressBar.value = (1 / questions.length) * 100;

    // Render the first question
    renderQuestionCard(currentQuestionIndex);
}

// Function to show style descriptions
/*
function showStyleDescriptions() {
    const predominantStyleDesc = styleDescriptions[window.predominantStyle];
    const backupStyleDesc = styleDescriptions[window.backupStyle];

    document.getElementById('predominantStyleDescription').textContent = `Your predominant style (${window.predominantStyle}): ${predominantStyleDesc}`;
    document.getElementById('backupStyleDescription').textContent = `Your backup style (${window.backupStyle}): ${backupStyleDesc}`;

    // Show the style descriptions
    document.getElementById('styleDescriptions').classList.remove('hidden');
}
*/

/*
function toggleStyleDescriptions() {
    const styleDescriptionsDiv = document.getElementById('styleDescriptions');
    const explainButton = document.getElementById('explainButton');

    if (styleDescriptionsDiv.classList.contains('hidden')) {
        // If descriptions are hidden, display them
        const predominantStyleDesc = styleDescriptions[window.predominantStyle];
        const backupStyleDesc = styleDescriptions[window.backupStyle];

        document.getElementById('predominantStyleDescription').textContent = `Your predominant style (${window.predominantStyle}): ${predominantStyleDesc}`;
        document.getElementById('backupStyleDescription').textContent = `Your backup style (${window.backupStyle}): ${backupStyleDesc}`;

        styleDescriptionsDiv.classList.remove('hidden');
        explainButton.textContent = 'Hide style descriptions';
    } else {
        // If descriptions are visible, hide them
        styleDescriptionsDiv.classList.add('hidden');
        explainButton.textContent = 'Explain My Styles';
    }
}
*/

// Add event listeners for navigation buttons
document.getElementById('prevButton').addEventListener('click', handleNavigation);

document.getElementById('nextButton').addEventListener('click', handleNavigation);

// Add event listener for retaking the quiz
document.getElementById('retakeButton').addEventListener('click', retakeQuiz);

// Add event listener for beginning the quiz
document.getElementById('beginButton').addEventListener('click', startQuiz);
/*
// Add event listener for explaining styles
document.getElementById('explainButton').addEventListener('click', showStyleDescriptions);
*/

/*
document.getElementById('explainButton').addEventListener('click', toggleStyleDescriptions);
*/