const default_config = {
  search_url: "https://www.google.co.jp/search?q=",
  favorites: [{title: "静カニのブログ", url: "https://shizukani-cp.github.io/blog/"}],
  readinglists: [{title: "githubにpushしようとしたらできなかった話 | 静カニのブログ", url: "https://shizukani-cp.github.io/blog/articles/20240807/", id: 0}],
  open_with_new_tab: true,
  delete_with_open: false
};

const config = localStorage.getItem("start_config") || default_config;

function onclick_delete_with_open(e) {
  const elem = e.target || e.srcElement;
  const reading_id = elem.getAttribute("data-reading-id");
  config.readinglists = config.readinglists.filter((e) => { return e.id !== reading_id; });
  elem.parentElement.setAttribute("style", "display: none;");
}

window.addEventListener("load", () => {
  const favorites_e = document.getElementById("favorites");
  const readinglists_e = document.getElementById("readinglists");

  for (const favorite of config.favorites) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", favorite.url);
    link.appendChild(document.createTextNode(favorite.title));
    li.appendChild(link);
    favorites_e.appendChild(li);
  }

  for (const reading of config.readinglists) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", reading.url);
    link.setAttribute("data-reading-id", reading.id);
    if (config.open_with_new_tab) {
      link.setAttribute("target", "_blank");
    }
    if (config.delete_with_open) {
      link.addEventListener("click", onclick_delete_with_open);
    }
    link.appendChild(document.createTextNode(reading.title));
    li.appendChild(link);
    readinglists_e.appendChild(li);
  }
});

