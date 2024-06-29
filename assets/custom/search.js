let search_on = document.getElementById("search_on");
let search_out = document.getElementById("search_out");
let search_result = document.getElementById("search_result");
let result_api = document.getElementById("result_api");
let search_header = document.getElementById("search_header");

const makeAPICall = (searchValue) => {
    search_header.innerHTML = `
        <img src="https://i.gifer.com/ZKZg.gif" width="15px"/>
        <span id="result_api">Kết quả cho '${searchValue}'</span>
    `;

    search_result.innerHTML = "";
    if (!searchValue) {
        return;
    }

    fetch(`https://apizingmp3.vercel.app/api/search?keyword=${searchValue}`)
        .then((res) => {
            res.json().then((response) => {
                let song = response.data.songs;
                song
                    ? (search_header.innerHTML = `
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass _icon_15ttk_79" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        <span id="result_api">Kết quả cho '${searchValue}'</span>`)
                    : ( search_header.innerHTML = `
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass _icon_15ttk_79" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        <span id="result_api">Không có kết quả cho '${searchValue}'</span>`) ;

                song.forEach((item) => {
                    search_result.innerHTML += `
                <a class="row align-items-center" href="/dieu-gi-khien-vong-bang-euro-2024-hay-bac-nhat-lich-su-4764017.html">
                    <div class="col-4">
                        <img class="img-fluid w-100 rounded" loading="eazy" src="${item.thumbnailM}" alt="HTML CSS từ Zero đến Hero">
                    </div>
                    <span class="col-8 text-dark title_news">${item.title}</span>
                </a>`;
                });
            });
        })
        .catch((e) => { });
};

const debounce = (fn, delay = 1000) => {
    let timerId = null;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn(...args), delay);
    };
};
const onInput = debounce(makeAPICall, 500);

search_on.addEventListener("input", (e) => {
    onInput(e.target.value);
    search_header.innerHTML = `
         <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass _icon_15ttk_79" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
        <span id="result_api">Kết quả cho   '${e.target.value}'</span>
  `;
    search_out.style.display = e.target.value ? "block" : "none";
});

// search_out.style.display = search_on.value ? "block" : "none";

// const headers = new Headers({
//   "Content-Type": "application/json",
//   "x-api-key":
//     "live_5r28l6QHFnNsa4ie4XjrHezpWEFOPCe2Vb2UvRh5hl12ZWBsvPSZMflLqjeNPfir",
// });

// var requestOptions = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "x-api-key":"live_5r28l6QHFnNsa4ie4XjrHezpWEFOPCe2Vb2UvRh5hl12ZWBsvPSZMflLqjeNPfir",
//   },
//   redirect: "follow",
// };

// fetch(
//   "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(JSON.parse(result)))
//   .catch((error) => console.log("error", error));
