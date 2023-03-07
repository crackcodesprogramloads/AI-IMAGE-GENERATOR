import "./style.css";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);

  const response = await fetch(
    "https://transcendent-melba-6ea4a3.netlify.app/dream",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.get("prompt"),
      }),
    }
  );

  if (response.ok) {
    const {
      image: { data },
    } = await response.json();

    if (data[0].url) {
      const result = document.querySelector("#result");
      result.innerHTML = `<img src="${data[0].url}" width="512" />`;
    }
  } else {
    const err = await response.text();
    alert(err);
    console.error(err);
  }

  hideSpinner();
});

function showSpinner() {
  const button = document.querySelector("button");
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
  const button = document.querySelector("button");
  button.disabled = false;
  button.innerHTML = "Dream";
}
