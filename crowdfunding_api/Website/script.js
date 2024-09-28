// Load active fundraisers on the home page
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("index.html")) {
        fetch('/fundraisers')
            .then(response => response.json())
            .then(fundraisers => {
                const fundraiserList = document.getElementById('fundraiser-list');
                fundraisers.forEach(fundraiser => {
                    const fundraiserDiv = document.createElement('div');
                    fundraiserDiv.classList.add('fundraiser');
                    fundraiserDiv.innerHTML = `
                        <h3>${fundraiser.CAPTION}</h3>
                        <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                        <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING}</p>
                        <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING}</p>
                        <p><strong>City:</strong> ${fundraiser.CITY}</p>
                        <p><strong>Category:</strong> ${fundraiser.CATEGORY_NAME}</p>
                    `;
                    fundraiserList.appendChild(fundraiserDiv);
                });
            })
            .catch(err => console.error('Error fetching fundraisers:', err));
    }
});

// Handle search functionality
document.getElementById('searchForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const city = document.getElementById('city').value;

    if (!category && !city) {
        alert('Please select at least one search criteria.');
        return;
    }

    const query = `?category=${category}&city=${city}`;
    fetch(`/search${query}`)
        .then(response => response.json())
        .then(fundraisers => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = ''; 

            if (fundraisers.length === 0) {
                searchResults.innerHTML = '<p style="color:red;">No fundraisers found</p>';
            } else {
                fundraisers.forEach(fundraiser => {
                    const fundraiserDiv = document.createElement('div');
                    fundraiserDiv.classList.add('fundraiser');
                    fundraiserDiv.innerHTML = `
                        <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">
                            <h3>${fundraiser.CAPTION}</h3>
                        </a>
                        <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                        <p><strong>City:</strong> ${fundraiser.CITY}</p>
                    `;
                    searchResults.appendChild(fundraiserDiv);
                });
            }
        })
        .catch(err => console.error('Error searching fundraisers:', err));
});

// Load specific fundraiser details on the fundraiser page
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("fundraiser.html")) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        fetch(`/fundraiser/${id}`)
            .then(response => response.json())
            .then(fundraiser => {
                const fundraiserDetails = document.getElementById('fundraiser-details');
                fundraiserDetails.innerHTML = `
                    <h2>${fundraiser.CAPTION}</h2>
                    <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                    <p><strong>Target Funding:</strong> ${fundraiser.TARGET_FUNDING}</p>
                    <p><strong>Current Funding:</strong> ${fundraiser.CURRENT_FUNDING}</p>
                    <p><strong>City:</strong> ${fundraiser.CITY}</p>
                    <p><strong>Category:</strong> ${fundraiser.CATEGORY_NAME}</p>
                    <button onclick="donate()">Donate</button>
                `;
            })
            .catch(err => console.error('Error fetching fundraiser details:', err));
    }
});

// Clear search form
function clearCheckboxes() {
    document.getElementById('category').value = '';
    document.getElementById('city').value = '';
}

// Simulate the donate button
function donate() {
    alert('This feature is under construction.');
}
