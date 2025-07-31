window.addEventListener("DOMContentLoaded", e => {
    // Find the search form first.
    // If it doesn't exist, this page doesn't have the search feature, so do nothing.
    const a = document.getElementById("search");
    if (!a) {
        return;
    }

    // --- All code below will only run if the search form exists ---

    let o = null,
        i = null,
        t = null,
        s = !1,
        n = null;

    const r = document.getElementById("search-input");

    a.addEventListener("submit", function(e) {
        e.preventDefault();
        let t = r.value.trim();
        if (!t)
            return;
        c(t, !1)
    }, !1),

    history.state && history.state.type == "search" && c(history.state.term, !0),

    window.addEventListener("popstate", function(e) {
        if (e.state && e.state.type == "search")
            c(e.state.term, !0);
        else if (!e.state && n) {
            let e = document.querySelector(".main-inner");
            for (; e.firstChild;)
                e.removeChild(e.firstChild);
            for (let t of n)
                e.appendChild(t);
            n = null
        }
    }, !1);

    function c(e, n) {
        r.value = e,
            a.setAttribute("data-running", "true"),
            o ? d(e, n) : t ? (t = e,
                s = n) : (t = e,
                s = n,
                u())
    }

    function l() {
        a.removeAttribute("data-running");
        const e = document.querySelector(".header");
        e && e.classList.contains("fade") && r.blur(),
            t = null,
            s = !1
    }

    function u() {
        let e = new XMLHttpRequest;
        e.open("GET", "/search.json"), // It's better to use an absolute path for the index
            e.responseType = "json",
            e.addEventListener("load", function() {
                let a = e.response;
                if (!a) {
                    console.error("Search index could not be downloaded, was it generated?"),
                        l();
                    return
                }
                i = {},
                    o = lunr(function() {
                        // Use a variable for language to avoid hardcoding
                        const lang = this.closest('[lang]')?.lang || 'en';
                        if (lang !== 'en' && lunr.hasOwnProperty(lang)) {
                            this.use(lunr[lang]);
                        }
                        this.ref("uri"),
                            this.field("title"),
                            this.field("subtitle"),
                            this.field("content"),
                            this.field("description"),
                            this.field("categories"),
                            this.field("tags");
                        for (let e of a)
                            this.add(e),
                            i[e.uri] = e
                    }),
                    d(t, s)
            }, !1),
            e.addEventListener("error", l, !1),
            e.send(null)
    }

    function d(e, t) {
        try {
            let r = o.search(e),
                a = document.querySelector(".main-inner") || document.querySelector("main.home"),
                l = [];
            for (; a.firstChild;)
                l.push(a.firstChild),
                a.removeChild(a.firstChild);
            n || (n = l);
            let s = document.createElement("h1");
            s.id = "search-results",
                s.className = "list-title",
                r.length == 0 ? s.textContent = "没有找到关于「{}」的结果".replace("{}", e) : r.length == 1 ? s.textContent = "找到 1 条关于「{}」的结果".replace("{}", e) : s.textContent = "找到 {} 条关于「{}」的结果".replace("{}", r.length).replace("{}", e),
                a.appendChild(s),
                document.title = s.textContent;
            let d = document.getElementById("search-result");
            // Add a check for the search result template
            if (d) {
                for (let n of r) {
                    let t = i[n.ref],
                        e = d.content.cloneNode(!0);
                    e.querySelector(".summary-title-link").href = e.querySelector(".read-more-link").href = t.uri,
                        e.querySelector(".summary-title-link").textContent = t.title,
                        e.querySelector(".summary").textContent = h(t.content, 70),
                        a.appendChild(e)
                }
            }
            s.scrollIntoView(!0),
                t || history.pushState({
                    type: "search",
                    term: e
                }, s.textContent, "#search=" + encodeURIComponent(e));
            let c = document.querySelector(".nav-toggle");
            c && c.classList.contains("open") && document.getElementById(c.getAttribute("for")).click()
        } finally {
            l()
        }
    }

    function h(e, t) {
        let n, s = "",
            o = 0,
            i = /(\S+)(\s*)/g;
        for (; n = i.exec(e);)
            if (o++,
                o <= t)
                s += n[0];
            else {
                let e = n[1][n[1].length - 1],
                    t = n[2][0];
                if (/[.?!"]/.test(e) || t == `
`) {
                    s += n[1];
                    break
                }
                s += n[0]
            }
        return s
    }
}, {
    once: !0
});