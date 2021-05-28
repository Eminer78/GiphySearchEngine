const GIPHY_KEY = "e37SrxPpdSHKaXSXTvoD9QaZGIuhGXyk";
const searchInput = document.querySelector("[name=query-keyword]");

const queryQty = document.querySelector("[name=query-quantity]");

const keywordsContainer = document.querySelector(".image-container");

function formSubmitted(event) {
  event.preventDefault();
  const searchExpression = searchInput.value;
  searchInput.value = "";
  keywordsContainer.innerHTML = "";
  const searchQty = queryQty.value;
  queryQty.value = "";

  fetch(
    `http://api.giphy.com/v1/gifs/search?q=${searchExpression}&api_key=${GIPHY_KEY}&limit=${searchQty}`
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
