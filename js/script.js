// selects overview class - profile info will appear here
let overview = document.querySelector(".overview");
let repoList = document.querySelector(".repo-list");

let username = "camigm1";

const getData = async function () {
  let req = await fetch(`https://api.github.com/users/${username}`);
  let data = await req.json();
  console.log(data);
  displayInfo(data);
};

getData();

const displayInfo = function (json) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="user-info"><figure>
  <img alt="user avatar" src=${json.avatar_url} />
</figure>
<div>
  <p><strong>Name:</strong> ${json.name}</p>
  <p><strong>Bio:</strong> ${json.bio}</p>
  <p><strong>Location:</strong> ${json.location}</p>
  <p><strong>Number of public repos:</strong> ${json.public_repos}</p>
</div></div>`;
  overview.append(newDiv);
  getRepos();
};

const getRepos = async function () {
  let req = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );
  let data = await req.json();
  console.log(data);
  displayRepos(data);
};

const displayRepos = function (repos) {
  repos.forEach((repo) => {
    let li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `${repo.name}`;
    repoList.append(li);
  });
};
