async function getUser() {
    const username = document.getElementById("username").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";
  
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      const user = await userRes.json();
  
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
      const repos = await reposRes.json();
  
      resultDiv.innerHTML = `
        <h2>${user.name || user.login}</h2>
        <img src="${user.avatar_url}" width="100"/>
        <p>Followers: ${user.followers}</p>
        <h3>Repositories:</h3>
        <ul>
          ${repos.map(repo => `<li>${repo.name}</li>`).join("")}
        </ul>
      `;
    } catch (err) {
      resultDiv.innerHTML = "User not found.";
    }
  }
  