const searchform = document.querySelector(".search-form");
const searchinput = document.querySelector(".usernameinput");

let githubProfileUrl = "";
const username = searchinput.value.trim();


searchform.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = searchinput.value.trim();

    if (username === "") {
        alert("enter the username");
        return;
    }

    console.log(username);

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    githubProfileUrl = data.html_url;
    console.log(githubProfileUrl)
    console.log(data)

    document.querySelector(".welcomepage").style.display = "none";
    document.querySelector(".profilebar").style.display = "flex";
    document.querySelector(".dashboardpage .repobar").style.display = "block";

    document.querySelector(".emptyrepo").style.display = "none";

document.querySelector(".reposecwalirepo").style.display = "block";


    const reporesponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    const repos = await reporesponse.json();
    console.log(repos)

    const allrepos = document.querySelector(".allrepos");
    const reposec = document.querySelector(".reposecwalirepo");

    allrepos.innerHTML = ""
    reposec.innerHTML = ""

    repos.forEach((repo, index) => {
        allrepos.innerHTML +=
            `   
        <div class="repocard ${index >= 3 ? 'hiddenrepo' : ''}">
            <div class="leftpartrepo">
                <div class="repo-title">
                     <a href="https://github.com/${username}/${repo.name}">${repo.name}</a>
                </div>

                <p class="repodescription">
                    ${repo.description || "No description available"}
                </p>

                <div class="repolang">
                    <div class="langdot"></div>
                    <span class = "langcolor">${repo.language || "Not specified"}</span>
                </div>
            </div>

            <div class="rightpartrepo">
                <div class="repo-stat">
                    ⭐ <span>${repo.stargazers_count}</span>
                </div>

                <div class="repo-stat">
                    🍴 <span>${repo.forks_count}</span>
                </div>
            </div>
        </div>
        `



    });


    repos.forEach((repo) => {
        reposec.innerHTML += `
             <div class="repocard">
            <div class="leftpartrepo">
                <div class="repo-title">
                     <a href="https://github.com/${username}/${repo.name}">${repo.name}</a>
                </div>

                <p class="repodescription">
                    ${repo.description || "No description available"}
                </p>

                <div class="repolang">
                    <div class="langdot"></div>
                    <span class = "langcolor">${repo.language || "Not specified"}</span>
                </div>
            </div>

            <div class="rightpartrepo">
                <div class="repo-stat">
                    ⭐ <span>${repo.stargazers_count}</span>
                </div>

                <div class="repo-stat">
                    🍴 <span>${repo.forks_count}</span>
                </div>
            </div>
        </div>`
    })

    // const hiddenrepos = document.querySelectorAll(".hiddenrepo")








    if (data.message == 'Not Found') {
        alert("User not found on Github")
    }
    document.querySelector(".github-btn").addEventListener("click", () => {
        window.location.href = githubProfileUrl;
    })

    document.querySelector(".loc").innerHTML = data.location || "Not available";

    document.querySelector(".mainname").innerHTML = (data.name);
    document.querySelector(".username").innerHTML = (data.login);
    document.querySelector(".bio").innerHTML = (data.bio);
    // document.querySelector(".loc").innerHTML = (data.location);
    document.querySelector(".gitlink").href = (`https://github.com/${username}`);
    document.querySelector(".git").innerHTML = (`github.com/${username}`);
    document.querySelector(".followercount").innerHTML = (data.followers);
    document.querySelector(".followingcount").innerHTML = (data.following);
    document.querySelector(".publicrepono").innerHTML = (data.public_repos);
    document.querySelector(".Joined").innerHTML = data.created_at.split("T")[0];
    document.querySelector(".userimg").src = (data.avatar_url);


    document.querySelector(".followbtn").addEventListener("click", () => {
        document.querySelector(".sharebox").style.display = "flex"
        document.querySelector(".sharelink").value = githubProfileUrl;
        document.querySelector(".overlay").style.display = "block"
    })

    document.querySelector(".closebtn").addEventListener("click", () => {
        document.querySelector(".sharebox").style.display = "none"
        document.querySelector(".overlay").style.display = "none"

    })
    document.querySelector(".copybtn").addEventListener("click", () => {
        navigator.clipboard.writeText(githubProfileUrl);
        alert("url copied")
    })
    document.querySelector(".whatsappbtn").addEventListener("click", () => {
        // document.querySelector(".sharebox").style.display= "none"
        window.open(`https://wa.me/?text=${githubProfileUrl}`)
    })
    document.querySelector(".twitterbtn").addEventListener("click", () => {
        // document.querySelector(".sharebox").style.display= "none"
        window.open(`https://twitter.com/intent/tweet?url=${githubProfileUrl}`);
    })

    document.querySelector(".avatar").src = (data.avatar_url);



})
//outside submit:-

document.querySelector(".mode").addEventListener("click", () => {
    document.body.classList.toggle("lightmode");
})

document.querySelector(".settings").addEventListener("click", () => {
    document.querySelector(".dashboardpage").style.display = "none"
    document.querySelector(".settingspage").style.display = "block"
    document.querySelector(".reposec").style.display = "none"


})
document.querySelector(".dashboard").addEventListener("click", () => {
    document.querySelector(".dashboardpage").style.display = "block"
    document.querySelector(".settingspage").style.display = "none"
    document.querySelector(".reposec").style.display = "none"


})
document.querySelector(".reposi").addEventListener("click", () => {
    document.querySelector(".topa").innerHTML = "All Repositories"
    document.querySelector(".dashboardpage").style.display = "none"
    document.querySelector(".settingspage").style.display = "none"
    document.querySelector(".reposec").style.display = "flex"



})
document.querySelector(".themebtn").addEventListener("click", () => {
    document.body.classList.toggle("lightmode");
})
document.querySelector(".upgrade").addEventListener("click", () => {
    document.querySelector(".hiddenpro").style.display = "block"
    document.querySelector(".overlay").style.display = "block"
})

document.querySelector(".closepro").addEventListener("click", () => {

    document.querySelector(".hiddenpro").style.display = "none"
    document.querySelector(".overlay").style.display = "none"

})

const btn = document.querySelector("#viewallbtn")
btn.addEventListener(("click"), () => {

    const hiddenrepos = document.querySelector(".allrepos").querySelectorAll(".hiddenrepo")

    if (btn.textContent.trim() == "View-all->") {
        btn.innerHTML = "Show less-->"
        hiddenrepos.forEach((repo) => {
            repo.classList.remove("hiddenrepo");
        })
    }

    else {

        btn.innerHTML = "View-all->"
        document.querySelector(".allrepos").querySelectorAll(".repocard").forEach((repo, index) => {

            if (index >= 3) {
                repo.classList.add("hiddenrepo");
            }

        })


    }



})


