let blogs = [];
let blogIdCounter = 1;

function displayBlogs(blogArray) {
  const blogList = document.getElementById("blogList");
  if (blogArray.length === 0) {
    blogList.innerHTML = "<li class='list-group-item'>No blogs available.</li>";
    return;
  }
  blogArray.forEach(blog => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    const formattedDate = new Date(blog.date).toLocaleString();
    li.innerHTML = `
      <h5>${blog.title}</h5>
      <p>${blog.content}</p>
      <span><strong>Author:</strong> ${blog.author} | <strong>Date:</strong> ${formattedDate}</span>
      <br />
      <button class="btn btn-sm btn-danger mt-2" onclick="deleteBlog(${blog.id})">Delete</button>
    `;
    blogList.appendChild(li);
  });
  updateAuthorFilterOptions();
}

function updateAuthorFilterOptions() {
  const authorFilter = document.getElementById("authorFilter");
  if (!authorFilter) return;

  let authors = [];
  blogs.forEach(blog => {
    if (!authors.includes(blog.author)) {
      authors.push(blog.author);
    }
  });
  authors.sort();

  authorFilter.options.length = 1;

  authors.forEach(author => {
    const option = document.createElement("option");
    option.textContent = author;
    authorFilter.appendChild(option);
  });
}

function filterBlogs() {
  const author = document.getElementById("authorFilter").value.toLowerCase();
  const date = document.getElementById("dateFilter").value;
  const search = document.getElementById("searchInput").value.toLowerCase();
  let filtered = blogs;
  if (author){
    filtered = filtered.filter(b => b.author.toLowerCase() === author);
  } 
  if (search){
    filtered = filtered.filter(b => b.title.toLowerCase().includes(search));
  } 
  if (date === "latest"){
    filtered = filtered.sort((a,b) => new Date(b.date) - new Date(a.date));
  } 
  else if (date === "oldest"){
    filtered = filtered.sort((a,b) => new Date(a.date) - new Date(b.date));
  } 
  displayBlogs(filtered);
}

function addBlog(title, content, author) {
  blogs.push({id: blogIdCounter++, title, content, author, date: new Date().toString()});
  displayBlogs(blogs);
}

function deleteBlog(id) {
  blogs = blogs.filter(b => b.id !== id);
  displayBlogs(blogs);
}

document.addEventListener("DOMContentLoaded", () => {
  displayBlogs(blogs);
  document.getElementById("addBlogBtn").addEventListener("click", () => {
    const title = document.getElementById("titleInput").value;
    const content = document.getElementById("contentInput").value;
    const author = document.getElementById("authorInput").value;
    if (title && content && author) addBlog(title, content, author);
    else alert("All fields are required!");
  });
  document.getElementById("authorFilter").addEventListener("change", filterBlogs);
  document.getElementById("dateFilter").addEventListener("change", filterBlogs);
});
