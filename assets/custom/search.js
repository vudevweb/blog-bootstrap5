let search_on = document.getElementById("search_on");
let search_out = document.getElementById("search_out");
let search_result = document.getElementById("search_result");
let search_header = document.getElementById("search_header");
let search_heading = document.getElementById("search_heading");
let search_close = document.getElementById("search_close");

const makeAPICall = (searchValue) => {
    search_heading.style.display = "none";
    search_header.innerHTML = `
        <img src="https://i.gifer.com/ZKZg.gif"/>
        <span id="result_api">Kết quả cho '${searchValue}'</span>
    `;
    search_result.innerHTML = "";

    if (!searchValue) {
        return;
    }

    fetch(`https://phim.nguonc.com/api/films/search?keyword=${searchValue}`)
        .then((res) => res.json())
        .then((response) => {
            let movies = response.items;
            console.log(movies);
            search_header.innerHTML = `
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass _icon_15ttk_79" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                <span id="result_api">Kết quả cho '${searchValue}'</span>
            `;
            if (movies != "") {
                search_heading.style.display = "flex";
                movies.forEach((item) => {
                    search_result.innerHTML += `
                        <a class="row align-items-center" href="${item.link}">
                            <div class="col-4">
                                <img class="img-fluid w-100 rounded" loading="lazy" src="${item.poster_url}" alt="${item.title}">
                            </div>
                            <span class="col-8 text-dark title_news">${item.name}</span>
                        </a>`;
                });
            } else {
                search_header.innerHTML = `
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" class="svg-inline--fa fa-magnifying-glass _icon_15ttk_79" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                    <span id="result_api">Không có kết quả cho '${searchValue}'</span>
                `;
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            search_header.innerHTML = `
                <span id="result_api">Có lỗi xảy ra. Vui lòng thử lại.</span>
            `;
        });
};

const debounce = (fn, delay = 1000) => {
    let timerId;
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
         <span id="result_api">Kết quả cho '${e.target.value}'</span>
    `;
    search_out.style.display = e.target.value ? "block" : "none";
    search_close.style.display = e.target.value ? "block" : "none";
});

search_close.addEventListener('click', () => {
    search_on.value = "";
    search_close.style.display = "none";
    search_out.style.display = "none";
    search_header.innerHTML = "";
    search_result.innerHTML = "";
});
