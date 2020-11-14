const username = "dexkode4";
const token = "e12b14f69f0d68be353b3362a2aacb979bfac6b3";


async function fetchGraphQL(text, variables) {
    const GITHUB_AUTH_TOKEN = token;

    // Fetch data from GitHub's GraphQL API:
    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `bearer ${GITHUB_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
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
        "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ query: query })
};

const getMyGithubData = () => {

    
}

fetchGraphQL(query).then(res => {
    console.log(res.data);
    const { avatarUrl, repositories , bio , followers, following ,starredRepositories } = res.data.user;
  
    let repoCount = document.getElementById('repo-count');
    // set avatar img
    document.getElementById('avatar').src = avatarUrl;
    document.getElementById('profile-image').src = avatarUrl;
    document.getElementById('bio').textContent = bio;
    document.getElementById("followers").textContent = followers.totalCount;
    document.getElementById("following").textContent = following.totalCount;
    document.getElementById("star").textContent = starredRepositories.totalCount;
    // set repo count
    repoCount.textContent = repositories.nodes.length;


}).catch(console.error);

window.onscroll = function() {myFunction()};

let navbar = document.getElementById("navbar");

let sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}