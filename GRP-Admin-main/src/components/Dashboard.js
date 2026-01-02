export function renderDashboard() {
    return `
        <div class="max-w-6xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Total Visits</h3>
                        <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <i data-lucide="eye" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">24,500</div>
                    <p class="text-xs text-green-500 mt-1 flex items-center">
                        <i data-lucide="arrow-up" class="w-3 h-3 mr-1"></i> +12% this month
                    </p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Messages</h3>
                        <div class="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <i data-lucide="message-square" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">48</div>
                    <p class="text-xs text-gray-400 mt-1">5 unread messages</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Services</h3>
                        <div class="p-2 bg-green-50 text-green-600 rounded-lg">
                            <i data-lucide="activity" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">12</div>
                    <p class="text-xs text-gray-400 mt-1">Active Services</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Gallery Items</h3>
                        <div class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <i data-lucide="image" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">156</div>
                    <p class="text-xs text-green-500 mt-1">+4 added today</p>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="font-semibold text-gray-800">Recent Updates</h3>
                </div>
                <div class="p-6">
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                <i data-lucide="edit-3" class="w-5 h-5"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-800">Updated "About Us"</p>
                                <p class="text-xs text-gray-500 mt-0.5">Changed company history text.</p>
                                <p class="text-xs text-gray-400 mt-2">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}