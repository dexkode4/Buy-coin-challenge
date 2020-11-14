const username = "dexkode4";
const token = "01f85e9b1f2274dacc4fd898e4436545f403417d";

async function fetchGraphQL(text, variables) {
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
			variables,
		}),
	});

	return await response.json();
}

const url = "https://api.github.com/graphql";

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
         nodes{
           name
           stargazerCount
           updatedAt
              languages(first:1){
             nodes{
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

const getMyGithubData = () => {};

fetchGraphQL(query)
	.then(res => {
		console.log(res.data);
		const {
			avatarUrl,
			repositories,
			bio,
			followers,
			following,
			starredRepositories,
		} = res.data.user;

		let repoCount = document.getElementById("repo-count");
		// set avatar img
		document.getElementById("avatar").src = avatarUrl;
		document.getElementById("profile-image").src = avatarUrl;
		document.getElementById("bio").textContent = bio;
		document.getElementById("followers").textContent = followers.totalCount;
		document.getElementById("following").textContent = following.totalCount;
		document.getElementById("star").textContent = starredRepositories.totalCount;

		let repoList = document.getElementsByClassName("repositories__list")[0];

		// let repoItem = document.createElement("div");
		// let repoItemDetails = document.createElement("div");
		// let repoTitle = document.createElement("h2");
		// let repoLangAndLastUpdateInfo = document.createElement("div");
    // let langLogo = document.createElement("div");
    // let lang = document.createElement('span');
    // let updatedAt = document.createElement("span");
    // let starred = document.createElement("div");
    // let starButton = document.createElement("button");

    // starButton.innerHTML = `<svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
    // star`;

		// repoItemDetails.setAttribute("class", "item__details");
		// repoItem.setAttribute("class", "item");
    // langLogo.setAttribute("id", "lang-color");
    // lang.setAttribute("class","lang");
    // updatedAt.setAttribute("class","updatedAt")
    // starred.setAttribute("class","item__starred")

		// repoItem.appendChild(repoItemDetails);
    // repoItemDetails.appendChild(repoTitle);
    // repoItem.appendChild(starred);
    // repoLangAndLastUpdateInfo.appendChild(langLogo);
    // repoLangAndLastUpdateInfo.appendChild(lang)
    // repoLangAndLastUpdateInfo.appendChild(updatedAt);
    // repoItemDetails.appendChild(repoLangAndLastUpdateInfo);
    // starred.appendChild(starButton);

    repositories.nodes.map(({name,languages, updatedAt}) => {

      let repoItem = document.createElement("div");
      let repoItemDetails = document.createElement("div");
      let repoTitle = document.createElement("h2");
      let repoLangAndLastUpdateInfo = document.createElement("div");
      let langLogo = document.createElement("div");
      let lang = document.createElement('span');
      let updated = document.createElement("span");
      let starred = document.createElement("div");
      let starButton = document.createElement("button");
  
      starButton.innerHTML = `<svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      star`;
  
      repoItemDetails.setAttribute("class", "item__details");
      repoItem.setAttribute("class", "item");
      langLogo.setAttribute("id", "lang-color");
      lang.setAttribute("class","lang");
      updated.setAttribute("class","updatedAt")
      starred.setAttribute("class","item__starred")
  
      repoItem.appendChild(repoItemDetails);
      repoItemDetails.appendChild(repoTitle);
      repoItem.appendChild(starred);
      repoLangAndLastUpdateInfo.appendChild(langLogo);
      repoLangAndLastUpdateInfo.appendChild(lang)
      repoLangAndLastUpdateInfo.appendChild(updated);
      repoItemDetails.appendChild(repoLangAndLastUpdateInfo);
      starred.appendChild(starButton);



      repoTitle.textContent = name;
      updated.innerText = updatedAt;
      lang.textContent = languages.nodes[0].name;
      repoList.append(repoItem);
      console.log(languages.nodes[0])
    });


		//   let repoItem = `
		//   <div class="item">
		//   <div class="item__details">
		//     <h2>Buy-coin-challenge</h2>
		//     <div>
		//       <div id="lang-color">&nbsp;</div>
		//       <span class="lang">CSS</span>
		//       <span class="updatedAt">Updated 7 hours ago</span>
		//     </div>
		//   </div>

		//   <div class="item__starred">
		//     <button>
		//       <svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
		//       star
		//     </button>
		//   </div>
		// </div>
		//   `;

		// set repo count
		repoCount.textContent = repositories.nodes.length;
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
