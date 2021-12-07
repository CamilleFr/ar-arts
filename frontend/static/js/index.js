import Home from "./views/Home.js";
import PresentationView from "./views/PresentationView.js";
import TreatmentsView from "./views/TreatmentsView.js";
import ContactView from "./views/ContactView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home},
        { path: "/presentation", view: PresentationView },
        { path: "/traitements", view: TreatmentsView },
        { path: "/contact", view: ContactView }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml()
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    router();

    window.onload = () => {
        const transition = document.querySelector(".transition")
        const elements = document.querySelector("a")

        setTimeout(() => {
            transition.classList.remove("is-active");
        }, 500);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.addEventListener("click", () => {
                transition.classList.add("is-active")
            })
        }
        document.addEventListener("click", e => {
            if(e.target.matches("[data-link]")) {
                e.preventDefault();
                navigateTo(e.target.href)
            }
        })

        let delay = 100,
        delay_start = 0,
        contents,
        letters;

        document.querySelectorAll('.animate-text').forEach(function (elem) {
            contents = elem.textContent.trim()

            elem.textContent = "";
            letters = contents.split("");
            elem.style.visibility = 'visible';

            letters.forEach(function (letter, index_1) {
                setTimeout(function () {
                    var span = document.createElement('span');
                    span.innerHTML = letter.replace(/ /, '&nbsp;');
                    elem.appendChild(span);
                    }, 
                delay_start + delay * index_1)
            });
            delay_start += delay * letters.length;
        })
    }
});