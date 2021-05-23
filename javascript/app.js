const GIPHY_KEY = "e37SrxPpdSHKaXSXTvoD9QaZGIuhGXyk";
const searchInput = document.querySelector("[name=query-keyword]");
const title = document.querySelector(".searched-keywords");
const keywordsContainer = document.querySelector(
  ".searched-keywords-container"
);

function formSubmitted(event) {
  event.preventDefault();
  const searchExpression = searchInput.value;
  searchInput.value = "";
  keywordsContainer.innerHTML = "";

  fetch(
    `http://api.giphy.com/v1/gifs/search?q=${searchExpression}&api_key=${GIPHY_KEY}&limit=5`
  )
    .then((response) => response.json())
    .then((result) => {
      let imageHtmlList = [];
      result.data.forEach((data) => {
        console.log(result);
        const url = data.images.original.url;
        const name = data.title;
        if (typeof url !== "undefined") {
          imageHtmlList.push(`<img src="${url}" alt="${name}" />`);
        }
      });
      const html = imageHtmlList.join("");
      keywordsContainer.innerHTML = html;
    });
}

document.querySelector("form").addEventListener("submit", formSubmitted);
