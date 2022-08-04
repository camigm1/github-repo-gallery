// selects overview class - profile info will appear here
let overview = document.querySelector(".overview");
let repoList = document.querySelector(".repo-list");
let allRepos = document.querySelector(".repos");
let repoData = document.querySelector(".repo-data");
let backToRepos = document.querySelector(".view-repos");
let filterInput = document.querySelector(".filter-repos");

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
  filterInput.classList.remove("hide");
  repos.forEach((repo) => {
    let li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  });
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    getRepoInfo(repoName);
    console.log(repoName); // not showing name on console?
  }
});

const getRepoInfo = async function (repoName) {
  let req = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  let repoInfo = await req.json();
  console.log(repoInfo);
  let fetchLanguages = await fetch(repoInfo.languages_url);
  let languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (let value in languageData) {
    languages.push(value);
    console.log(languages);
  }
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";

  let div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.classList.remove("hide");
  repoData.append(div); // says it's not a function
  repoData.classList.remove("hide");
  allRepos.classList.add("hide");
  backToRepos.classList.remove("hide");
};

getRepoInfo();

backToRepos.addEventListener("click", function () {
  allRepos.classList.remove("hide");
  repoData.classList.add("hide");
  backToRepos.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  let searchValue = e.target.value;
  console.log(searchValue);
  let repos = document.querySelectorAll(".repo");
  let valueLowerCase = searchValue.toLowerCase();
  for (const repo of repos) {
    let repoName = repo.innerText.toLowerCase();
    if (repoName.includes(valueLowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
