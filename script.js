
async function getUser() {
    const username = document.getElementById("username").value;
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";
  
    try {
      const token = "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"; // Replace with your actual token
  
      const headers = {
        Authorization: `token ${token}`
      };
  
      // Fetch user info
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: headers
      });
      if (!userRes.ok) throw new Error("User fetch failed");
      const user = await userRes.json();
  
      // Fetch repos
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: headers
      });
      if (!reposRes.ok) throw new Error("Repos fetch failed");
      const repos = await reposRes.json();
  
      // Display results
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
      resultDiv.innerHTML = "User not found or API request failed.";
      console.error(err);
    }
  }
  