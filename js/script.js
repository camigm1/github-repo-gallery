// selects overview class - profile info will appear here
let overview = document.querySelector(".overview");

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
};
