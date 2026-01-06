

export function renderDashboard() {

    lucide.createIcons();

    // Load live data
    fetchDashboardStats();
    fetchEnquiries();
}

/* =========================
   DASHBOARD COUNTERS
========================= */
async function fetchDashboardStats() {
    try {
        const res = await fetch(
            "http://localhost/GRP-Backend/api/dashboard/dashboard-stats.php"
        );
        const result = await res.json();

        if (!result.status) return;

        document.getElementById("visit-counter").innerText =
            formatNumber(result.data.visits);

        document.getElementById("message-counter").innerText =
            result.data.enquiries;

        document.getElementById("service-counter").innerText =
            result.data.services;

        document.getElementById("gallery-counter").innerText =
            result.data.gallery;

    } catch (err) {
        console.error("Dashboard stats failed", err);
    }
}

/* =========================
   ENQUIRIES
========================= */
async function fetchEnquiries() {
    try {
        const res = await fetch(
            "http://localhost/GRP-Backend/api/enquiry-list.php"
        );
        const result = await res.json();

        if (!result.status) return;

        // ✅ Directly pass data
        renderEnquiryTable(result.data);

    } catch (err) {
        console.error("Failed to load enquiries", err);
    }
}

function renderEnquiryTable(enquiries) {
    const tableBody = document.getElementById('enquiry-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    enquiries.forEach(enquiry => {
        const row = document.createElement('tr');
        row.className = 'enquiry-row border-b border-gray-50 last:border-0';

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-blue-100 text-blue-600
                        flex items-center justify-center font-bold text-xs mr-3">
                        ${getInitials(enquiry.name)}
                    </div>
                    <span class="text-sm font-medium text-gray-900">
                        ${enquiry.name}
                    </span>
                </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                ${enquiry.phone}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                ${enquiry.email}
            </td>

            <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                ${enquiry.message}
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-right text-xs text-gray-400">
                ${enquiry.date}
            </td>
        `;

        tableBody.appendChild(row);
    });

    lucide.createIcons();
}

/* =========================
   UTILS
========================= */
function formatNumber(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
}

function getInitials(name) {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}
