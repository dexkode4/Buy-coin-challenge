const username = "dexkode4";
const token = "ddbd3fab70b5aa9475b616246bbaf129f794fceb";

function getLastUpdated(lastUpdated) {
  const MONTHS = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };

  const date1 = new Date(lastUpdated);
  const date2 = new Date();

  const diffTime = Math.abs(date2 - date1);

  const seconds = Math.round(diffTime / 1000);

  if (seconds < 60) {
    console.log(`${seconds} seconds ago`);
    return `Updated on ${seconds} seconds ago`;
  } else {
    let minutes = Math.round(seconds / 60);

    if (minutes < 60) {
      console.log(`${minutes} minutes ago`);
      return `Updated on ${minutes} minutes ago`;
    } else {
      let hours = Math.round(minutes / 60);

      if (hours < 24) {
        console.log(`${hours} hours ago`);
        return `Updated on ${hours} hours ago`;
      } else {
        let days = Math.round(hours / 24);

        if (days < 30) {
          console.log(`${days} days ago`);
          return `Updated on ${days} days ago`;
        } else {
          if (days < 365) {
            let monthIdx = date1.getMonth();
            let dateIdx = date1.getDate();
            return `Updated on ${MONTHS[monthIdx]} ${dateIdx}`;
          } else {
            return `Updated on ${date1.toDateString()}`;
          }
        }
      }
    }
  }
}

async function fetchGraphQL(text) {
  const GITHUB_AUTH_TOKEN = token;

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: text,
    }),
  });

  return await response.json();
}

const query = `
query { 
    user(login: "${username}"){
     avatarUrl
     login
     bio
     following{
      totalCount
    }
    followers {
      totalCount
    }
    starredRepositories{
      totalCount
    }
     repositories(first: 20) {
       totalCount
         nodes{
           name
           stargazerCount
           updatedAt
              languages(first:1){
             nodes{
               color
               id
               name
             }
           }
           
           forkCount
           
           }
         }
      }
     }
`;

const opts = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ query: query }),
};

const getMyGithubData = () => { };

fetchGraphQL(query)
  .then(res => {
    const {
      avatarUrl,
      repositories,
      bio,
      followers,
      following,
      starredRepositories,
      login,
    } = res.data.user;

    let repoCount = document.getElementById("repo-count");

    repoCount.textContent = repositories.totalCount;

    document.getElementById("username").textContent = login;
    document.getElementById("avatar").src = avatarUrl;
    document.getElementById("profile-image").src = avatarUrl;
    document.getElementById("bio").textContent = bio;
    document.getElementById("followers").textContent = followers.totalCount;
    document.getElementById("following").textContent = following.totalCount;
    document.getElementById("star").textContent =
      starredRepositories.totalCount;

    let repoList = document.getElementsByClassName("repositories__list")[0];

    repositories.nodes.map(({ name, languages, updatedAt }) => {
      let repoItem = document.createElement("div");
      let repoItemDetails = document.createElement("div");
      let repoTitle = document.createElement("h2");
      let repoLangAndLastUpdateInfo = document.createElement("div");
      let langLogo = document.createElement("div");
      let lang = document.createElement("span");
      let updated = document.createElement("span");
      let starred = document.createElement("div");
      let starButton = document.createElement("button");

      starButton.innerHTML = `<svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      star`;

      repoItemDetails.setAttribute("class", "item__details");
      repoItem.setAttribute("class", "item");
      langLogo.setAttribute("id", "lang-color");
      lang.setAttribute("class", "lang");
      updated.setAttribute("class", "updatedAt");
      starred.setAttribute("class", "item__starred");

      repoItem.appendChild(repoItemDetails);
      repoItemDetails.appendChild(repoTitle);
      repoItem.appendChild(starred);
      repoLangAndLastUpdateInfo.appendChild(langLogo);
      repoLangAndLastUpdateInfo.appendChild(lang);
      repoLangAndLastUpdateInfo.appendChild(updated);
      repoItemDetails.appendChild(repoLangAndLastUpdateInfo);
      starred.appendChild(starButton);

      if (languages.nodes[0]) {
        langLogo.style.background = languages.nodes[0].color;
        lang.textContent = languages.nodes[0].name;
      }

      repoTitle.textContent = name;
      updated.innerText = getLastUpdated(updatedAt);
      repoList.append(repoItem);
    });
  })
  .catch(console.error);

window.onscroll = function () {
  myFunction();
};

let navbar = document.getElementById("navbar");

let sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}