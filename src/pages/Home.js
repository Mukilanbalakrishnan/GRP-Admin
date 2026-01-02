export function renderHome() {
    // Helper to generate a section HTML
    const sectionCard = (title, content, id) => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            <button class="accordion-trigger w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <span class="font-semibold text-gray-700">${title}</span>
                <i data-lucide="chevron-down" class="chevron-icon w-5 h-5 text-gray-500 transition-transform duration-300"></i>
            </button>
            
            <div class="max-h-0 overflow-hidden transition-[max-height] duration-500 ease-in-out">
                <div class="p-6 border-t border-gray-100 space-y-4">
                    ${content}
                </div>
            </div>
        </div>
    `;

    // 1. Hero Section Content
    const heroContent = `
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Main Heading</label>
            <input type="text" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter heading...">
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
            <input type="file" class="block w-full text-sm text-slate-500 file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-full file:px-4 file:py-2">
        </div>
    `;

    // 2. Features Content
    const featuresContent = `
        <p class="text-sm text-gray-500 mb-2">Edit your 3 main features.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Feature 1 Title" class="p-2 border rounded">
            <input type="text" placeholder="Feature 2 Title" class="p-2 border rounded">
            <input type="text" placeholder="Feature 3 Title" class="p-2 border rounded">
        </div>
    `;

    // Combine them
    return `
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-2xl font-bold text-gray-800">Home Page Manager</h1>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                    Save Changes
                </button>
            </div>
            
            ${sectionCard('1. Hero Section', heroContent)}
            ${sectionCard('2. Features Section', featuresContent)}
            ${sectionCard('3. About Summary', '<textarea class="w-full border p-2 rounded h-24"></textarea>')}
            ${sectionCard('4. Counters / Stats', '<input type="number" placeholder="Clients Count" class="border p-2 rounded">')}
            ${sectionCard('5. Testimonials', '<div class="text-gray-400">Testimonials config...</div>')}
        </div>
    `;
}