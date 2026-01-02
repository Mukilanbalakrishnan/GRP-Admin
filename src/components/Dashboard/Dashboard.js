export function renderDashboard(){
        // Dashboard Data
        let dashboardData = {
            visits: 24500,
            messages: 48,
            services: 12,
            galleryItems: 156,
            recentActivities: [
                { id: 1, type: 'edit', title: 'Hero Section Updated', description: 'Updated homepage hero images and call-to-action buttons', time: 'Just now', live: true },
                { id: 2, type: 'add', title: 'New Service Added: "Solar Integration"', description: 'Added new renewable energy service with 5 star rating', time: '2 hours ago', rating: 5 }
            ]
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            initializeDashboard();
            startLiveUpdates();
        });

        function initializeDashboard() {
            // Animate counters
            animateCounter('visit-counter', dashboardData.visits);
            animateCounter('message-counter', dashboardData.messages);
            animateCounter('service-counter', dashboardData.services);
            animateCounter('gallery-counter', dashboardData.galleryItems);
            
            // Start live updates
            setInterval(() => {
                updateLiveData();
            }, 30000); // Update every 30 seconds
            
            // Add hover effects to activity items
            const activityItems = document.querySelectorAll('.activity-item');
            activityItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateX(5px)';
                    item.style.transition = 'transform 0.3s ease';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateX(0)';
                });
            });
        }

        function animateCounter(elementId, targetValue) {
            const element = document.getElementById(elementId);
            const duration = 2000; // 2 seconds
            const step = targetValue / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= targetValue) {
                    element.textContent = formatNumber(targetValue);
                    clearInterval(timer);
                } else {
                    element.textContent = formatNumber(Math.floor(current));
                }
            }, 16);
        }

        function formatNumber(num) {
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'k';
            }
            return num.toString();
        }

        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type}`;
            
            // Show toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function refreshDashboard() {
            const refreshBtn = document.querySelector('.refresh-btn');
            refreshBtn.classList.add('rotate-180');
            
            showToast('Refreshing dashboard data...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                // Update counters with slight random changes
                dashboardData.visits += Math.floor(Math.random() * 100);
                dashboardData.messages += Math.floor(Math.random() * 3);
                dashboardData.galleryItems += Math.floor(Math.random() * 2);
                
                // Update counters
                document.getElementById('visit-counter').textContent = formatNumber(dashboardData.visits);
                document.getElementById('message-counter').textContent = formatNumber(dashboardData.messages);
                document.getElementById('gallery-counter').textContent = formatNumber(dashboardData.galleryItems);
                
                refreshBtn.classList.remove('rotate-180');
                showToast('Dashboard updated successfully!', 'success');
            }, 1000);
        }

        function toggleDarkMode() {
            const toggle = document.getElementById('dark-mode-toggle');
            const body = document.body;
            
            if (toggle.checked) {
                body.classList.add('dark');
                body.classList.remove('bg-gradient-to-br', 'from-gray-50', 'to-blue-50');
                body.classList.add('bg-gradient-to-br', 'from-gray-900', 'to-gray-800');
                showToast('Dark mode activated', 'info');
            } else {
                body.classList.remove('dark');
                body.classList.remove('bg-gradient-to-br', 'from-gray-900', 'to-gray-800');
                body.classList.add('bg-gradient-to-br', 'from-gray-50', 'to-blue-50');
                showToast('Light mode activated', 'info');
            }
        }

        function toggleNotifications() {
            const panel = document.getElementById('notifications-panel');
            const badge = document.getElementById('notification-badge');
            
            if (panel.classList.contains('hidden')) {
                panel.classList.remove('hidden');
                setTimeout(() => {
                    panel.classList.remove('scale-95', 'opacity-0');
                    panel.classList.add('scale-100', 'opacity-100');
                }, 10);
                
                // Mark as read
                badge.classList.remove('animate-pulse');
                badge.textContent = '0';
            } else {
                panel.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    panel.classList.add('hidden');
                }, 300);
            }
        }

        function showDetailedStats(type) {
            showToast(`Showing detailed stats for ${type}`, 'info');
            
            // In a real app, this would open a modal or navigate
            const card = event.currentTarget;
            card.classList.add('animate-pulse-once');
            setTimeout(() => {
                card.classList.remove('animate-pulse-once');
            }, 300);
        }

        function openMessages() {
            showToast('Opening messages...', 'info');
            // In a real app, this would navigate to messages page
        }

        function navigateToServices() {
            showToast('Navigating to services...', 'info');
            // In a real app, this would navigate to services page
        }

        function navigateToGallery() {
            showToast('Navigating to gallery...', 'info');
            // In a real app, this would navigate to gallery page
        }

        function quickAction(action) {
            const actions = {
                'addContent': 'Opening content editor...',
                'analytics': 'Loading analytics dashboard...',
                'mediaUpload': 'Opening media uploader...',
                'settings': 'Opening settings...'
            };
            
            showToast(actions[action], 'info');
            
            // Add button feedback
            const button = event.currentTarget;
            button.classList.add('animate-pulse-once');
            setTimeout(() => {
                button.classList.remove('animate-pulse-once');
            }, 300);
        }

        function undoActivity(index) {
            showToast('Activity undone', 'warning');
            
            const activity = event.target.closest('.activity-item');
            activity.style.opacity = '0.5';
            activity.style.transform = 'translateX(-100px)';
            
            setTimeout(() => {
                activity.remove();
            }, 300);
        }

        function viewService() {
            showToast('Opening service details...', 'info');
        }

        function showAllActivity() {
            showToast('Loading all activities...', 'info');
        }

        function addActivity() {
            const input = document.getElementById('new-activity');
            const text = input.value.trim();
            
            if (!text) {
                showToast('Please enter activity text', 'warning');
                input.classList.add('animate-shake');
                setTimeout(() => input.classList.remove('animate-shake'), 300);
                return;
            }
            
            const activitiesContainer = document.querySelector('.space-y-6');
            const newActivity = document.createElement('div');
            newActivity.className = 'flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0 activity-item animate-fade-in';
            newActivity.innerHTML = `
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600">
                    <i data-lucide="message-square" class="w-5 h-5"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm text-gray-800 font-medium">${text}</p>
                    <p class="text-xs text-gray-500 mt-1">Added via quick note</p>
                    <div class="flex items-center mt-2">
                        <span class="text-xs text-gray-400">Just now</span>
                    </div>
                </div>
                <button onclick="undoActivity(${dashboardData.recentActivities.length})" class="text-xs text-gray-400 hover:text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                    Undo
                </button>
            `;
            
            activitiesContainer.prepend(newActivity);
            input.value = '';
            
            // Add hover effect
            newActivity.addEventListener('mouseenter', () => {
                newActivity.style.transform = 'translateX(5px)';
            });
            newActivity.addEventListener('mouseleave', () => {
                newActivity.style.transform = 'translateX(0)';
            });
            
            showToast('Activity added successfully!', 'success');
        }

        function updateChart() {
            const select = document.getElementById('time-range');
            showToast(`Updating chart for ${select.value}`, 'info');
            
            // Animate chart bars
            const bars = document.querySelectorAll('.chart-bar');
            bars.forEach((bar, index) => {
                const newHeight = 30 + Math.random() * 70;
                bar.style.height = `${newHeight}%`;
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'growBar 1s ease-out forwards';
                }, index * 100);
            });
        }

        function startLiveUpdates() {
            // Simulate live updates
            setInterval(() => {
                const randomCard = Math.floor(Math.random() * 4);
                const cards = document.querySelectorAll('.dashboard-card');
                cards[randomCard].classList.add('animate-pulse-once');
                
                setTimeout(() => {
                    cards[randomCard].classList.remove('animate-pulse-once');
                }, 300);
            }, 10000); // Every 10 seconds
        }

        function updateLiveData() {
            // Simulate live data updates
            dashboardData.visits += Math.floor(Math.random() * 50);
            dashboardData.messages += Math.floor(Math.random() * 2);
            
            // Update counters with animation
            document.getElementById('visit-counter').textContent = formatNumber(dashboardData.visits);
            document.getElementById('message-counter').textContent = formatNumber(dashboardData.messages);
            
            // Add subtle pulse to updated counters
            document.getElementById('visit-counter').classList.add('animate-pulse-once');
            document.getElementById('message-counter').classList.add('animate-pulse-once');
            
            setTimeout(() => {
                document.getElementById('visit-counter').classList.remove('animate-pulse-once');
                document.getElementById('message-counter').classList.remove('animate-pulse-once');
            }, 300);
        }

        // Close notifications when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notifications-panel');
            const badge = document.getElementById('notification-badge');
            
            if (!panel.contains(e.target) && !badge.contains(e.target)) {
                panel.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    panel.classList.add('hidden');
                }, 300);
            }
        });
}