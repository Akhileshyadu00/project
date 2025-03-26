document.getElementById("fetchButton").addEventListener("click", fetchPosts);

function fetchPosts() {
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");
    const postsHeader = document.getElementById("posts-header");

    // Show the message container and set "Loading..." text
    messageContainer.style.display = "block";
    message.innerHTML = "<p>Loading... Please wait.</p>";
    postsHeader.style.display = "none";

    // Create a promise with a timeout of 5 seconds
    const fetchPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject("Operation timed out");
        }, 5000);

        fetch('https://dummyjson.com/posts')
            .then(response => {
                clearTimeout(timeout); // Clear timeout if response is received in time
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error.message));
    });

    // Handle promise resolution or rejection
    fetchPromise
        .then(data => {
            postsHeader.style.display = "block";
            const postsHTML = data.posts.map(post => `<p>${post.title}</p>`).join('');
            message.innerHTML = postsHTML;
        })
        .catch(error => {
            message.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
        });
}
