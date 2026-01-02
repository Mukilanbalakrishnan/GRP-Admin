export function renderAbout() {
    return `
        <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">About Us Manager</h1>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <label class="block text-sm font-medium text-gray-700 mb-2">Our Story</label>
                <textarea class="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                
                <div class="mt-4 flex justify-end">
                    <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update About Us</button>
                </div>
            </div>
        </div>
    `;
}