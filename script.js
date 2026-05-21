const theme_mode = document.querySelector(".theme-mode");
const header = document.querySelector("header");
const body = document.querySelector("body");
const searchInput = document.querySelector(".search-input");
const result = document.getElementById("result");
const filterBox = document.getElementById('regions');

let allData = [];

theme_mode.addEventListener("click", () => {
  body.classList.toggle("active");
  header.classList.toggle("active");
  theme_mode.classList.toggle("active");
});

function render(items) {
  if (items.length === 0) {
    result.innerHTML = `<p class="error">No countries found</p>`;
    return;
  }
  result.innerHTML = items
    .map(
      (c) => `
        <div class="card">
          <img src="${c.flags.svg}" alt="${c.name} flag">
          <div class="card-info">
            <h3>${c.name}</h3>
            <p><span>Population:</span> ${c.population.toLocaleString()}</p>
            <p><span>Region:</span> ${c.region}</p>
            <p><span>Capital:</span> ${c.capital}</p>
          </div>
        </div>
      `,
    )
    .join("");
}

async function fetchData() {
  try {
    const response = await fetch(`data.json`);
    if (!response.ok) {
      throw new Error("Could not fetch the resource");
    }
    allData = await response.json();
    render(allData); 
  } catch (error) {
    console.log(error);
    result.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

searchInput.addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase().trim();
  const filtered = allData.filter((c) => c.name.toLowerCase().includes(search));
  render(filtered);
});


filterBox.addEventListener('change', (e) => {
  const selected = e.target.value.toLowerCase();
  const filteredBox = selected === 'filter'
    ? allData
    : allData.filter((c) => c.region.toLowerCase() === selected);
  render(filteredBox);
})

fetchData();

