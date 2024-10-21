//home
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Calendar
    const calendarTitle = document.getElementById('calendar-title');
    const calendarContainer = document.getElementById('calendar-container');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        calendarTitle.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        calendarContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        let table = '<table class="calendar"><thead><tr>';

        for (let i = 0; i < 7; i++) {
            table += `<th>${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</th>`;
        }

        table += '</tr></thead><tbody><tr>';

        for (let i = 0; i < firstDay.getDay(); i++) {
            table += '<td></td>'; // Empty cells before the first day
        }

        for (let day = 1; day <= daysInMonth; day++) {
            table += `<td>${day}</td>`;
            if ((day + firstDay.getDay()) % 7 === 0) {
                table += '</tr><tr>'; // New row after every week
            }
        }

        table += '</tr></tbody></table>';
        calendarContainer.innerHTML = table;
    }

    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Render the calendar for the first time
    renderCalendar();

    // Modal Functionality
    const modals = {
        'problems-modal': document.getElementById('problems-modal'),
        'solutions-modal': document.getElementById('solutions-modal'),
        'treatments-modal': document.getElementById('treatments-modal'),
    };

    const closeButtons = {
        'close-problems': document.getElementById('close-problems'),
        'close-solutions': document.getElementById('close-solutions'),
        'close-treatments': document.getElementById('close-treatments'),
    };

    function openModal(modalId) {
        modals[modalId].style.display = 'block';
    }

    function closeModal(modalId) {
        modals[modalId].style.display = 'none';
    }

    for (const modalId in modals) {
        closeButtons[`close-${modalId.split('-')[0]}`].onclick = () => closeModal(modalId);
        modals[modalId].onclick = (event) => {
            if (event.target === modals[modalId]) {
                closeModal(modalId);
            }
        };
    }
});

// Fetch random mental health-related image from Unsplash
const unsplashAccessKey = 'DQUjhq_RjsznRN1WadWG945YLieXrZehuSffHYfdMmQ'; // Replace with your Unsplash API key

function getRandomImage() {
  const url = `https://api.unsplash.com/photos/random?query=mental-health&client_id=${unsplashAccessKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.regular;
      const imageElement = `<img src="${imageUrl}" alt="Random Mental Health Image">`;
      document.getElementById('random-image').innerHTML = imageElement;
    })
    .catch(error => console.error('Error fetching image:', error));
}

getRandomImage();

// Fetch videos related to mental health from YouTube
const youtubeAPIKey = 'AIzaSyBc4ycRzcif-_mEdDD9mT4PD20wv0ILwcA'; // Replace with your YouTube API key
const channelId = 'UC6nSFpj9HTCZ5t-N3Rm3-HA'; // Example channel, replace with relevant channel ID

function getYouTubeVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=4&type=video&q=mental+health`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videoContainer = document.getElementById('video-container');
      videoContainer.innerHTML = ''; // Clear existing videos

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const iframeElement = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        videoContainer.innerHTML += iframeElement;
      });
    })
    .catch(error => console.error('Error fetching videos:', error));
}

getYouTubeVideos();

//trending
// Fetching Mental Health News using News API
const apiKey = 'b2b687770c2041eca8b94c47b1ee6365'; // Replace with your News API key
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    const response = await fetch(`https://newsapi.org/v2/everything?q=mental-health&apiKey=${apiKey}`);
    const data = await response.json();
    displayNews(data.articles);
}

function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear the previous news
    articles.slice(0, 4).forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Fetch news on page load
fetchNews();


//unsplash api
// Unsplash API - Fetch Mental Health Images
const unsplashApiKey = 'DQUjhq_RjsznRN1WadWG945YLieXrZehuSffHYfdMmQ'; // Replace with your Unsplash API key
const trendingInfoContainer = document.querySelectorAll('.info-box, .side-info');

async function fetchMentalHealthImages() {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=mental-health&client_id=${unsplashApiKey}`);
    const data = await response.json();
    displayImages(data.results);
}

function displayImages(images) {
    trendingInfoContainer.forEach((infoBox, index) => {
        const image = images[index];
        const imgTag = document.createElement('img');
        imgTag.src = image.urls.small;
        infoBox.prepend(imgTag);
    });
}

// Fetch images on page load
fetchMentalHealthImages();

// YouTube API - Fetch Mental Health Videos
const youtubeApiKey = 'AIzaSyBc4ycRzcif-_mEdDD9mT4PD20wv0ILwcA'; // Replace with your YouTube API key
const videoContainer = document.querySelector('.video-container');

async function fetchMentalHealthVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=mental-health&maxResults=3&type=video&key=${youtubeApiKey}`);
    const data = await response.json();
    displayVideos(data.items);
}

function displayVideos(videos) {
    videoContainer.innerHTML = ''; // Clear previous videos
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoHtml = `
            <div class="video">
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p>${video.snippet.title}</p>
            </div>
        `;
        videoContainer.innerHTML += videoHtml;
    });
}

// Fetch videos on page load
fetchMentalHealthVideos();



//treatments
// Replace 'YOUR_API_KEY' with your actual YouTube API key
const API_KEY = 'AIzaSyDP_bwfaLbv0Yct9U1SDoA8cgyimMGj__0';
let defaultQuery = 'mental health treatments'; // Default search query
const maxResults = 6; // Number of videos to fetch

// Function to fetch and display YouTube videos
function fetchVideos(query) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = ''; // Clear any existing content

            data.items.forEach(item => {
                const videoBox = document.createElement('div');
                videoBox.classList.add('treatment-box');
                
                videoBox.innerHTML = `
                    <iframe width="100%" height="250" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p class="title">${item.snippet.title}</p>
                    <p>${item.snippet.description.substring(0, 80)}...</p>
                `;
                
                videoContainer.appendChild(videoBox);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
    }
// Search button event listener
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-query').value;
    if (query) {
        fetchVideos(query);
    }
});

// Fetch default videos on page load
fetchVideos(defaultQuery);

