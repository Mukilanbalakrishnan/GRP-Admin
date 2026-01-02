export function renderHome() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <iframe
            src="/src/pages/Home/Home.html"
            class="w-full h-full border-0"
        ></iframe>
    `;
}
