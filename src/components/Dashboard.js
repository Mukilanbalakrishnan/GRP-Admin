export function renderDashboard() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-sm text-gray-500">Total Visits</h3>
                    <p class="text-2xl font-bold">24,500</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-sm text-gray-500">Messages</h3>
                    <p class="text-2xl font-bold">48</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-sm text-gray-500">Services</h3>
                    <p class="text-2xl font-bold">12</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-sm text-gray-500">Gallery</h3>
                    <p class="text-2xl font-bold">156</p>
                </div>
            </div>
        </div>
    `;
}
