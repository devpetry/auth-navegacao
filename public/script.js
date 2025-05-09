async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
        window.location.href = "/dashboard.html";
    } else {
        alert("Login inválido");
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    alert(data.success ? 'Registro feito com sucesso!' : data.error);
}

async function logout() {
    const res = await fetch('/logout', {
        method: 'POST'
    });

    const data = await res.json();
    alert('Você saiu!');
    location.reload();
}
