// Data Source
const courses = [
    {
        id: 1,
        title: "Introduction a Linux",
        date: "2023-05-22",
        description: "Les bases fondamentales pour comprendre Linux et ces enjeux",
        tags: ["Linux", "Serveur"],
        pdfUrl: "cours/LinuxCoursLTS.pdf"
    },
//    {
//        id: 5,
//        title: "Introduction au HTML5 & CSS3",
//        date: "2024-01-15",
//        description: "Les bases fondamentales pour créer des pages web modernes. Structure sémantique et mise en page flexible.",
//        tags: ["HTML", "CSS", "Frontend"],
//        pdfUrl: "assets/cours-html-css.pdf" // Placeholder path
//    },
//    {
//        id: 2,
//        title: "JavaScript Moderne (ES6+)",
//        date: "2024-02-10",
//        description: "Maîtrisez les nouvelles fonctionnalités de JavaScript : Arrow functions, Destructuring, Modules, et plus.",
//        tags: ["JavaScript", "ES6", "Programmation"],
//        pdfUrl: "assets/cours-js-moderne.pdf"
//    },
//    {
//        id: 3,
//        title: "Bases de React.js",
//        date: "2024-03-05",
//        description: "Comprendre la logique des composants, le state et les props pour construire des interfaces dynamiques.",
//        tags: ["React", "Frontend", "Framework"],
//        pdfUrl: "assets/cours-react-bases.pdf"
//    },
//    {
//        id: 4,
//        title: "Git & GitHub pour Débutants",
//        date: "2024-03-20",
//        description: "Apprenez à versionner votre code et à collaborer avec d'autres développeurs.",
//        tags: ["Git", "DevOps", "Outils"],
//        pdfUrl: "assets/cours-git.pdf"
//    }
];

// DOM Elements
const courseList = document.getElementById('course-list');
const modal = document.getElementById('pdf-modal');
const modalContent = document.querySelector('.modal-content');
const pdfFrame = document.getElementById('pdf-frame');
const closeModal = document.querySelector('.close-modal');

// Render Courses
function renderCourses() {
    courseList.innerHTML = courses.map(course => `
        <article class="course-card">
            <div class="course-date">${formatDate(course.date)}</div>
            <h3 class="course-title">${course.title}</h3>
            <div class="tags">
                ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p class="course-desc">${course.description}</p>
            <button class="view-btn" onclick="openPDF('${course.pdfUrl}')">
                <i data-lucide="eye"></i> Voir le cours
            </button>
        </article>
    `).join('');

    // Re-initialize icons for new elements
    if(window.lucide) {
        lucide.createIcons();
    }
}

// Helper: Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// PDF Modal Logic
window.openPDF = function(url) {
    // In a real scenario, check if file exists or handle 404
    // For now, we just set the src.
    // Note: If no PDF exists, it might show a browser error in the iframe.
    pdfFrame.src = url;
    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
};

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.classList.add('hidden');
        pdfFrame.src = ''; // Stop loading
    }, 300);
});

// Close on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal.click();
    }
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderCourses();
});
