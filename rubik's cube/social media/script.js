// === DOM ELEMENTS ===
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const modal = document.getElementById("auth-modal");
const closeModal = document.getElementById("close-modal");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");

const feedSection = document.getElementById("feed");
const landingSection = document.querySelector(".landing");
const getStartedBtn = document.getElementById("get-started");

const loginSubmit = document.getElementById("login-submit");
const signupSubmit = document.getElementById("signup-submit");
const userNameSpan = document.getElementById("user-name");
const postInput = document.getElementById("post-input");
const postBtn = document.getElementById("post-btn");
const postsArea = document.getElementById("posts-area");

// === STATE ===
let currentUser = "";


// === AUTH MODAL LISTENERS ===
loginBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

signupBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

getStartedBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

switchToSignup.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

switchToLogin.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});


// === LOGIN & SIGNUP ===
loginSubmit.addEventListener("click", () => {
  currentUser = "User";
  showFeed();
});

signupSubmit.addEventListener("click", () => {
  currentUser = "NewUser";
  showFeed();
});


// === SHOW FEED ===
function showFeed() {
  modal.classList.add("hidden");
  landingSection.classList.add("hidden");
  feedSection.classList.remove("hidden");
  userNameSpan.textContent = currentUser;

  loadVideoPosts(); // ▶ automatically load videos on feed
}


// === ADD POST ===
postBtn.addEventListener("click", () => {
  const text = postInput.value.trim();
  if (!text) return alert("Write something to post!");

  const post = document.createElement("div");
  post.classList.add("post");
  post.innerHTML = `<h4>@${currentUser}</h4><p>${text}</p>`;
  postsArea.prepend(post);

  postInput.value = "";
});


// === LOAD VIDEO POSTS ===
function loadVideoPosts() {
  const videos = [
    {
      username: "Alex",
      title: "Cool video of my day 😎",
      src: "[youtube.com](https://www.youtube.com/embed/YW3UvaP8YBk)"
    },
    {
      username: "Sophie",
      title: "Funny cat meme 😂",
      src: "[youtube.com](https://www.youtube.com/embed/J---aiyznGQ)"
    },
    {
      username: "Liam",
      title: "Chilling at the park 🌳",
      src: "[youtube.com](https://www.youtube.com/embed/X2ko2Q8Yopc)"
    }
  ];

  postsArea.innerHTML = ""; // clears previous posts

  videos.forEach(video => {
    const post = document.createElement("div");
    post.classList.add("post");
    post.innerHTML = `
      <h4>@${video.username}</h4>
      <p>${video.title}</p>
      <div class="video-wrapper">
        <iframe
          width="100%"
          height="300"
          src="${video.src}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      </div>
    `;
    postsArea.appendChild(post);
  });
}
