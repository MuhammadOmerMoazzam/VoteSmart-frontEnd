document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  function setupCreatePoll() {
    document
        .getElementById("addOptionBtn")
        .addEventListener("click", function () {
            const candidateSection = document.getElementById("candidatesSection");
            const candidateInfo = document.createElement("div");
            candidateInfo.className = "candidate-info";

            candidateInfo.innerHTML = `
                <div class="form-group">
                    <label for="candidateName">Name:</label>
                    <input type="text" name="candidateName[]" required>
                </div>
                
                <div class="form-group">
                    <label for="candidateDescription">Description:</label>
                    <textarea name="candidateDescription[]" rows="2" required></textarea>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            `;

            candidateSection.appendChild(candidateInfo);

            // Add event listener to remove a candidate
            document.querySelectorAll(".remove-btn").forEach((button) => {
                button.addEventListener("click", function () {
                    button.parentElement.remove();
                });
            });
        });


    // Check if the user is authenticated
    function checkAuthStatus() {
        fetch("http://localhost:8080/api/auth/status", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                const authButtons = document.getElementById("auth-buttons");
                const profileIcon = document.getElementById("profileIcon");
                const userId = data.userId;

                console.log(data);

                if (data.authenticated) {
                    // Hide login/signup buttons and show profile icon
                    authButtons.style.display = "none";
                    profileIcon.style.display = "block";
                    // Optionally, store userId in localStorage if needed
                } else {
                    // Show login/signup buttons and hide profile icon
                    authButtons.style.display = "block";
                    profileIcon.style.display = "none";
                }
            })
            .catch((error) => {
                console.error("Error checking authentication status:", error);
            });
    }

    // Call the function when the page loads
    window.onload = checkAuthStatus;

    // Redirect to the user's profile page when the profile icon is clicked
    function redirectToProfile() {
        const userId = localStorage.getItem("userId");
        if (userId) {
            window.location.href = `/profile/${userId}`; // Replace with the actual profile page URL
        }
    }

    // Add an event listener for the form submission
    document
        .getElementById("pollForm")
        .addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting the default way

            // Collecting form data
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;

            // Collecting candidate information
            const candidates = [];
            const candidateNames = document.querySelectorAll(
                'input[name="candidateName[]"]'
            );
            const candidateAges = document.querySelectorAll(
                'input[name="candidateAge[]"]'
            );
            const candidateDescriptions = document.querySelectorAll(
                'textarea[name="candidateDescription[]"]'
            );

            for (let i = 0; i < candidateNames.length; i++) {
                candidates.push({
                    name: candidateNames[i].value,
                    age: candidateAges[i].value,
                    description: candidateDescriptions[i].value,
                });
            }

            // Sending the POST request to the backend API
            fetch(
                "http://localhost:8080/api/polls/create?title=" +
                encodeURIComponent(title) +
                "&description=" +
                encodeURIComponent(description),
                {
                    credentials: "include",
                    method: "POST", // Use POST method
                    headers: {
                        "Content-Type": "application/json", // Specify content type as JSON
                    },
                    body: JSON.stringify(candidates), // Send the candidates list as JSON body
                }
            )
                .then((response) => response.json()) // Parse the response as JSON
                .then((data) => {
                      const id = data.id
                      const URL = `127.0.0.1:3000/pages/poll.html?id=${id}`
                    console.log("Poll created successfully:", data);
                    showPopup(`Poll created successfully! But it is currently on pending to be approved, success 

                      Your Poll Share Link ${URL}` );
                    // Optionally, reset the form or redirect after success
                    document.getElementById("pollForm").reset();
                })
                .catch((error) => {
                    console.error("Error creating poll:", error);
                    showPopup("Error: " + error.message, "error");
                });
        });

    // Function to show popup notifications
    function showPopup(message, type) {
      const popupModal = document.getElementById("popupModal");
      const popupMessage = document.getElementById("popupMessage");
      const popupContent = document.querySelector(".popup-content");
  
      // Set the message
      popupMessage.innerText = message;
  
      // Add success or error class
      popupContent.classList.add(type); // 'success' or 'error'
  
      // Show the modal
      popupModal.style.display = "flex";
  }
  
  // Close the popup modal
  function closePopup() {
      const popupModal = document.getElementById("popupModal");
      popupModal.style.display = "none"; // Hide the modal
  
      // Remove any success or error classes
      const popupContent = document.querySelector(".popup-content");
      popupContent.classList.remove("success", "error");
  }
  
  // Add event listener to close the popup when the 'x' button is clicked
  document.querySelector(".popup-close").addEventListener("click", closePopup);
  
}


  function setupIndex() {
    let currentIndex = 0;
    const images = document.querySelectorAll(".carousel-image");
    const overlayGroups = document.querySelectorAll(".overlay-group");
    const totalImages = images.length;

    function showNextImage() {
      images[currentIndex].classList.remove("active");
      overlayGroups[currentIndex].classList.remove("active");

      currentIndex = (currentIndex + 1) % totalImages;

      images[currentIndex].classList.add("active");
      overlayGroups[currentIndex].classList.add("active");
    }

    images[0].classList.add("active");
    overlayGroups[0].classList.add("active");
    setInterval(showNextImage, 3000);

    window.onscroll = function () {
      const scrollTopBtn = document.getElementById("scrollTopBtn");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    };

    document
      .getElementById("scrollTopBtn")
      .addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    // Check if the user is authenticated
    function checkAuthStatus() {
      fetch("http://localhost:8080/api/auth/status", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const authButtons = document.getElementById("auth-buttons");
          const profileIcon = document.getElementById("profileIcon");
          const userId = data.userId;
          console.log(data);

          if (data.authenticated) {
            // Hide login/signup buttons and show profile icon
            authButtons.style.display = "none";
            profileIcon.style.display = "block";
            // Optionally, you can store the userId in a global variable or localStorage if needed
           
          } else {
            // Show login/signup buttons and hide profile icon
            authButtons.style.display = "block";
            profileIcon.style.display = "none";
          }
        })
        .catch((error) => {
          console.error("Error checking authentication status:", error);
        });
    }

    

    // Call the function when the page loads
    window.onload = checkAuthStatus;

   
  }

  if (path.endsWith("/pages/createpoll.html")) {
    setupCreatePoll();
  }

  if (path === "/" || path.endsWith("/index.html")) {
    setupIndex();
  }
});

 // Redirect to the user's profile page when the profile icon is clicked
 function redirectToProfile() {
  window.location.href = "/profile.html";
}

function redirectToUrl() {
  const urlInput = document.getElementById("url-input").value.trim(); // Get the value from the input field
  if (urlInput) {
      // Check if the input is a valid URL
      try {
          const url = new URL(urlInput.includes('://') ? urlInput : `http://${urlInput}`);
          window.location.href = url.href; // Redirect to the URL
      } catch (error) {
          console.log(error);
      }
  } else {
     console.log("erroiro");
  }
}
