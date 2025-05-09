function trackVisit(topic) {
    const visits = JSON.parse(getCookie("visitas") || "{}");

    if (!visits[topic]) visits[topic] = 0;
    visits[topic]++;

    setCookie("visitas", JSON.stringify(visits), 7);
}

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const [key, val] = c.split("=");
        if (key === name) return decodeURIComponent(val);
    }
    return null;
}
