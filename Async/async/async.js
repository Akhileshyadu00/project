document.getElementById("fetchButton").addEventListener("click", fetchPosts);

async function fetchPosts() {
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");
    const postsHeader = document.getElementById("posts-header");

    // Show the message container and set "Loading..." text
    messageContainer.style.display = "block";
    message.innerHTML = "<p>Loading... Please wait.</p>";
    postsHeader.style.display = "none";

    // Timeout promise (5 seconds)
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Operation timed out")), 5000)
    );

    try {
        // Fetch data with timeout
        const response = await Promise.race([
            fetch('https://dummyjson.com/posts'),
            timeoutPromise
        ]);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Display posts
        postsHeader.style.display = "block";
        message.innerHTML = data.posts.map(post => `<p>${post.title}</p>`).join('');
    } catch (error) {
        // Display error message
        message.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
