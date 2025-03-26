function executeWithDelay(callback, delay) {
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");

    // Show the container and update initial message
    messageContainer.style.display = "block";
    message.innerHTML = "<p>Callback executed after 5 seconds</p>";

    // Execute the callback after the specified delay
    setTimeout(callback, delay);
}

function fetchData() {
    fetch('https://dummyjson.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Show the posts header
            document.getElementById("posts-header").style.display = "block";

            // Map posts to HTML and display them
            const postsHTML = data.posts.map(post => `<p>${post.title}</p>`).join('');
            document.getElementById("message").innerHTML = postsHTML;
        })
        .catch(error => {
            // Display error message
            document.getElementById("message").innerHTML = `<p style="color: red;">Error fetching data: ${error.message}</p>`;
        });
}
