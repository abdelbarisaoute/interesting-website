// Data storage for articles and projects
let articlesData = [];
let projectsData = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Check which page we're on and load appropriate content
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/') {
        loadHomePage();
    }
});

// Load data from JSON files or localStorage
async function loadData() {
    try {
        // Try to load from JSON files first
        const articlesResponse = await fetch('data/articles.json');
        const projectsResponse = await fetch('data/projects.json');
        
        if (articlesResponse.ok) {
            articlesData = await articlesResponse.json();
        }
        
        if (projectsResponse.ok) {
            projectsData = await projectsResponse.json();
        }
    } catch (error) {
        console.log('Loading from default data');
        // Use default data if JSON files don't exist
        articlesData = getDefaultArticles();
        projectsData = getDefaultProjects();
    }
    
    // Also check localStorage for user-added content
    const savedArticles = localStorage.getItem('userArticles');
    const savedProjects = localStorage.getItem('userProjects');
    
    if (savedArticles) {
        articlesData = [...articlesData, ...JSON.parse(savedArticles)];
    }
    
    if (savedProjects) {
        projectsData = [...projectsData, ...JSON.parse(savedProjects)];
    }
}

// Default articles data
function getDefaultArticles() {
    return [
        {
            id: 1,
            title: "Getting Started with Web Development",
            description: "A comprehensive guide to starting your journey in web development, covering HTML, CSS, and JavaScript basics.",
            date: "2024-01-15",
            content: "Full article content here..."
        },
        {
            id: 2,
            title: "The Power of Minimalistic Design",
            description: "Exploring how minimalism in web design can improve user experience and site performance.",
            date: "2024-02-20",
            content: "Full article content here..."
        },
        {
            id: 3,
            title: "Building Dynamic Websites with JavaScript",
            description: "Learn how to create interactive and dynamic websites using modern JavaScript techniques.",
            date: "2024-03-10",
            content: "Full article content here..."
        }
    ];
}

// Default projects data
function getDefaultProjects() {
    return [
        {
            id: 1,
            title: "Portfolio Website",
            description: "A minimalistic personal portfolio website built with HTML, CSS, and JavaScript.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#",
            github: "#"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A simple yet powerful task management application with local storage support.",
            technologies: ["JavaScript", "LocalStorage", "CSS Grid"],
            link: "#",
            github: "#"
        },
        {
            id: 3,
            title: "Weather Dashboard",
            description: "Real-time weather information dashboard with a clean and intuitive interface.",
            technologies: ["API Integration", "JavaScript", "Responsive Design"],
            link: "#",
            github: "#"
        }
    ];
}

// Load articles page
function loadArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    articlesGrid.innerHTML = '';
    
    articlesData.forEach(article => {
        const articleCard = createArticleCard(article);
        articlesGrid.appendChild(articleCard);
    });
}

// Create article card element
function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
        <h3>${article.title}</h3>
        <p class="date">${formatDate(article.date)}</p>
        <p>${article.description}</p>
    `;
    return card;
}

// Load projects page
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projectsData.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const techTags = project.technologies ? 
        project.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join(' ') : '';
    
    const links = [];
    if (project.link && project.link !== '#') {
        links.push(`<a href="${project.link}" class="project-link" target="_blank">View Project</a>`);
    }
    if (project.github && project.github !== '#') {
        links.push(`<a href="${project.github}" class="project-link" target="_blank">GitHub</a>`);
    }
    
    card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${techTags ? `<div class="skills-grid">${techTags}</div>` : ''}
        ${links.length > 0 ? `<div class="project-links">${links.join('')}</div>` : ''}
    `;
    return card;
}

// Load home page previews
function loadHomePage() {
    // Load latest articles preview
    const latestArticlesDiv = document.getElementById('latestArticles');
    if (latestArticlesDiv && articlesData.length > 0) {
        const latestArticles = articlesData.slice(0, 3);
        latestArticles.forEach(article => {
            const preview = document.createElement('div');
            preview.innerHTML = `
                <h4>${article.title}</h4>
                <p class="date">${formatDate(article.date)}</p>
            `;
            preview.style.marginBottom = '1rem';
            latestArticlesDiv.appendChild(preview);
        });
    }
    
    // Load featured projects preview
    const featuredProjectsDiv = document.getElementById('featuredProjects');
    if (featuredProjectsDiv && projectsData.length > 0) {
        const featuredProjects = projectsData.slice(0, 3);
        featuredProjects.forEach(project => {
            const preview = document.createElement('div');
            preview.innerHTML = `
                <h4>${project.title}</h4>
                <p style="font-size: 0.9rem; color: #666;">${project.description}</p>
            `;
            preview.style.marginBottom = '1rem';
            featuredProjectsDiv.appendChild(preview);
        });
    }
}

// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!searchTerm) {
        searchResults.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }
    
    searchResults.innerHTML = '';
    
    // Search articles
    const matchingArticles = articlesData.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
    );
    
    // Search projects
    const matchingProjects = projectsData.filter(project =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
    );
    
    if (matchingArticles.length === 0 && matchingProjects.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
    }
    
    let resultsHTML = '<h3>Search Results</h3>';
    
    if (matchingArticles.length > 0) {
        resultsHTML += '<h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">Articles</h4>';
        matchingArticles.forEach(article => {
            resultsHTML += `
                <div class="result-card">
                    <span class="type">Article</span>
                    <h3>${article.title}</h3>
                    <p class="date">${formatDate(article.date)}</p>
                    <p>${article.description}</p>
                </div>
            `;
        });
    }
    
    if (matchingProjects.length > 0) {
        resultsHTML += '<h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">Projects</h4>';
        matchingProjects.forEach(project => {
            resultsHTML += `
                <div class="result-card">
                    <span class="type">Project</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `;
        });
    }
    
    searchResults.innerHTML = resultsHTML;
}

// Allow search with Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Format date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Export functions for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadArticles,
        loadProjects,
        performSearch
    };
}
