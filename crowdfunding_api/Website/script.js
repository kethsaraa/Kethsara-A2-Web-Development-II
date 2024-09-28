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
