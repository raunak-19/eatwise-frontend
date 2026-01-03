console.log("profile.js loaded ✅");

const email = localStorage.getItem("eatwiseEmail");

if (!email) {
  alert("Session expired. Please login again.");
  window.location.replace("./dashboard.html");
}

fetch("https://eatwise-backend-5ykd.onrender.com/get-profile", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email })
})
  .then(res => res.json())
  .then(data => {
    document.getElementById("pName").innerText = data.name || "--";
    document.getElementById("pAge").innerText = data.age || "--";
  });

// diseases are stored during details submission
fetch("https://eatwise-backend-5ykd.onrender.com/profile-status", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email })
})
  .then(() => {
    const localProfile = JSON.parse(
      localStorage.getItem("eatwiseProfile")
    );

    document.getElementById("pDiseases").innerText =
      localProfile?.diseases?.join(", ") || "None";
  });
