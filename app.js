// Application data
const appData = {
  dashboard_metrics: {
    customers: { value: 3781, change: "+11.01%" },
    orders: { value: 1219, change: "-0.03%" },
    revenue: { value: 695, change: "+15.03%" },
    growth: { value: "30.1%", change: "+6.08%" },
  },
  projections_chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    projections: [20, 25, 30, 28, 32, 35],
    actuals: [18, 22, 28, 30, 30, 33],
  },
  revenue_chart: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    current_week: [10, 15, 20, 18, 22, 25],
    previous_week: [12, 18, 22, 20, 24, 28],
    current_total: 58211,
    previous_total: 68768,
  },
  revenue_by_location: [
    { location: "New York", percentage: 72 },
    { location: "San Francisco", percentage: 39 },
    { location: "Sydney", percentage: 25 },
    { location: "Singapore", percentage: 61 },
  ],
  top_products: [
    {
      name: "ASOS Ridley High Waist",
      price: 79.49,
      quantity: 82,
      amount: 6518.18,
    },
    {
      name: "Marco Lightweight Shirt",
      price: 128.5,
      quantity: 37,
      amount: 4754.5,
    },
    { name: "Half Sleeve Shirt", price: 39.99, quantity: 64, amount: 2559.36 },
    { name: "Lightweight Jacket", price: 20.0, quantity: 184, amount: 3680.0 },
    { name: "Marco Shoes", price: 79.49, quantity: 64, amount: 1965.81 },
  ],
  total_sales: [
    { type: "Direct", amount: 300.56, color: "#3B82F6" },
    { type: "Affiliate", amount: 135.18, color: "#10B981" },
    { type: "Sponsored", amount: 154.02, color: "#8B5CF6" },
    { type: "E-mail", amount: 48.96, color: "#F59E0B" },
  ],
  orders_data: [
    {
      id: "CM9801",
      user: {
        name: "Karsten Winegeart",
        avatar:
          "https://images.unsplash.com/photo-1757647016230-d6b42abc6cc9?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
    },
    {
      id: "CM9802",
      user: {
        name: "Kate Morrison",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      },
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
    },
    {
      id: "CM9803",
      user: {
        name: "Drew Cano",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      },
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "Pending",
    },
    {
      id: "CM9804",
      user: {
        name: "Orlando Diggs",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      },
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
    },
    {
      id: "CM9805",
      user: {
        name: "Andi Lane",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      },
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
  ],
  contacts: [
    {
      name: "Karsten Winegeart",
      avatar:
        "https://images.unsplash.com/photo-1757647016230-d6b42abc6cc9?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Drew Cano",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    {
      name: "Orlando Diggs",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    {
      name: "Andi Lane",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    },
    {
      name: "Kate Morrison",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    },
    {
      name: "Koray Okumus",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    },
  ],
};

// Global variables
let charts = {};
let currentPage = 1;
let filteredOrders = [...appData.orders_data];
const itemsPerPage = 5;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Wait a bit for DOM to be fully ready
  setTimeout(() => {
    initializeLucideIcons();
    initializeTheme();
    initializeNavigation();
    initializeSidebar();
    initializeRightPanel();
    initializeOrdersTable();
    renderProductsTable();
    renderContactsList();
    renderSalesLegend();
    
    // Initialize charts last
    setTimeout(() => {
      initializeCharts();
    }, 200);
    
    // Add resize listener for responsive charts
    window.addEventListener('resize', debounce(handleResize, 250));
    
    console.log('App initialized successfully');
  }, 100);
});

// Initialize Lucide icons
function initializeLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    console.log('Lucide icons initialized');
  }
}

// Theme management
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log('Initializing theme:', savedTheme);
  
  applyTheme(savedTheme);
  
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    console.log('Theme toggle button found and initialized');
  } else {
    console.error('Theme toggle button not found');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-color-scheme', theme);
  updateThemeIcon(theme);
  console.log('Applied theme:', theme);
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  if (icon) {
    icon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

function toggleTheme() {
  console.log('Toggle theme clicked');
  const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Add smooth transition effect
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 300);
  }
  
  console.log('Theme toggled to:', newTheme);
}

// Navigation management
function initializeNavigation() {
  console.log('Initializing navigation...');
  const navLinks = document.querySelectorAll('[data-page]');
  console.log('Found navigation links:', navLinks.length);
  
  navLinks.forEach((link, index) => {
    const page = link.getAttribute('data-page');
    console.log(`Nav link ${index}: ${page}`);
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Navigating to page:', page);
      navigateToPage(page);
      
      // Update active nav item
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      link.closest('.nav-item').classList.add('active');
    });
  });
}

function navigateToPage(page) {
  console.log('Navigate to page called with:', page);
  
  const dashboardPage = document.getElementById('dashboardPage');
  const ordersPage = document.getElementById('ordersPage');
  
  console.log('Dashboard page element:', dashboardPage ? 'found' : 'not found');
  console.log('Orders page element:', ordersPage ? 'found' : 'not found');
  
  // Hide all pages
  if (dashboardPage) {
    dashboardPage.classList.remove('active');
    console.log('Removed active from dashboard');
  }
  if (ordersPage) {
    ordersPage.classList.remove('active');
    console.log('Removed active from orders');
  }
  
  // Show target page
  if (page === 'dashboard' && dashboardPage) {
    dashboardPage.classList.add('active');
    console.log('Activated dashboard page');
  } else if (page === 'orders' && ordersPage) {
    ordersPage.classList.add('active');
    console.log('Activated orders page');
  }
  
  // Update breadcrumb
  const breadcrumbCurrent = document.querySelector('.breadcrumb__item.current');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = page === 'dashboard' ? 'Default' : 'Order List';
    console.log('Updated breadcrumb to:', breadcrumbCurrent.textContent);
  }
}

// Sidebar management
function initializeSidebar() {
  console.log('Initializing sidebar...');
  
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
    console.log('Sidebar toggle initialized');
  } else {
    console.error('Sidebar toggle button not found');
  }
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    console.log('Mobile menu toggle initialized');
  }
  
  // Close sidebar on mobile when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(e.target) && 
          mobileMenuToggle && !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
}

function toggleSidebar() {
  console.log('Toggle sidebar called');
  const app = document.querySelector('.app');
  if (app) {
    app.classList.toggle('sidebar-collapsed');
    console.log('Sidebar collapsed:', app.classList.contains('sidebar-collapsed'));
  } else {
    console.error('App element not found');
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
    console.log('Mobile sidebar toggled');
  }
}

// Right panel management
function initializeRightPanel() {
  console.log('Initializing right panel...');
  
  const notificationBtn = document.getElementById('notificationBtn');
  const panelClose = document.getElementById('panelClose');
  const rightPanel = document.getElementById('rightPanel');
  
  console.log('Notification button:', notificationBtn ? 'found' : 'not found');
  console.log('Panel close button:', panelClose ? 'found' : 'not found');
  console.log('Right panel:', rightPanel ? 'found' : 'not found');
  
  if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Notification button clicked');
      toggleRightPanel();
    });
  } else {
    console.error('Notification button not found');
  }
  
  if (panelClose) {
    panelClose.addEventListener('click', closeRightPanel);
  }
  
  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (rightPanel && rightPanel.classList.contains('open') && 
        !rightPanel.contains(e.target) && 
        notificationBtn && !notificationBtn.contains(e.target)) {
      closeRightPanel();
    }
  });
}

function toggleRightPanel() {
  console.log('Toggle right panel called');
  const rightPanel = document.getElementById('rightPanel');
  if (rightPanel) {
    rightPanel.classList.toggle('open');
    console.log('Right panel toggled, open:', rightPanel.classList.contains('open'));
  } else {
    console.error('Right panel element not found');
  }
}

function closeRightPanel() {
  const rightPanel = document.getElementById('rightPanel');
  if (rightPanel) {
    rightPanel.classList.remove('open');
    console.log('Right panel closed');
  }
}

// Charts initialization
function initializeCharts() {
  console.log('Initializing charts...');
  initializeProjectionsChart();
  initializeRevenueChart();
  initializeSalesChart();
}

function initializeProjectionsChart() {
  const ctx = document.getElementById('projectionsChart');
  if (!ctx) {
    console.error('Projections chart canvas not found');
    return;
  }
  
  try {
    charts.projections = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: appData.projections_chart.labels,
        datasets: [
          {
            label: 'Projections',
            data: appData.projections_chart.projections,
            backgroundColor: '#1FB8CD',
            borderRadius: 4,
            maxBarThickness: 40
          },
          {
            label: 'Actuals',
            data: appData.projections_chart.actuals,
            backgroundColor: '#FFC185',
            borderRadius: 4,
            maxBarThickness: 40
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              title: function(context) {
                return 'Month: ' + context[0].label;
              },
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + 'k';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
    console.log('Projections chart initialized successfully');
  } catch (error) {
    handleChartError('projections', error);
  }
}

function initializeRevenueChart() {
  const ctx = document.getElementById('revenueChart');
  if (!ctx) {
    console.error('Revenue chart canvas not found');
    return;
  }
  
  try {
    charts.revenue = new Chart(ctx, {
      type: 'line',
      data: {
        labels: appData.revenue_chart.labels,
        datasets: [
          {
            label: 'Current Week',
            data: appData.revenue_chart.current_week,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Previous Week',
            data: appData.revenue_chart.previous_week,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              title: function(context) {
                return 'Month: ' + context[0].label;
              },
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y + 'k';
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
    console.log('Revenue chart initialized successfully');
  } catch (error) {
    handleChartError('revenue', error);
  }
}

function initializeSalesChart() {
  const ctx = document.getElementById('salesChart');
  if (!ctx) {
    console.error('Sales chart canvas not found');
    return;
  }
  
  try {
    charts.sales = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: appData.total_sales.map(item => item.type),
        datasets: [{
          data: appData.total_sales.map(item => item.amount),
          backgroundColor: appData.total_sales.map(item => item.color),
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((context.parsed * 100) / total).toFixed(1);
                return context.label + ': $' + context.parsed.toFixed(2) + ' (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
    console.log('Sales chart initialized successfully');
  } catch (error) {
    handleChartError('sales', error);
  }
}

// Orders table management
function initializeOrdersTable() {
  console.log('Initializing orders table...');
  
  // Search functionality
  const orderSearch = document.getElementById('orderSearch');
  if (orderSearch) {
    orderSearch.addEventListener('input', debounce(handleOrderSearch, 300));
    console.log('Order search initialized');
  }
  
  // Sorting functionality
  const sortableHeaders = document.querySelectorAll('.sortable');
  sortableHeaders.forEach(header => {
    header.addEventListener('click', () => handleSort(header.getAttribute('data-sort')));
  });
  console.log('Sortable headers:', sortableHeaders.length);
  
  // Pagination
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => changePage(-1));
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => changePage(1));
  }
  
  renderOrdersTable();
}

function handleOrderSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  console.log('Search term:', searchTerm);
  
  if (searchTerm === '') {
    filteredOrders = [...appData.orders_data];
  } else {
    filteredOrders = appData.orders_data.filter(order =>
      order.id.toLowerCase().includes(searchTerm) ||
      order.user.name.toLowerCase().includes(searchTerm) ||
      order.project.toLowerCase().includes(searchTerm) ||
      order.address.toLowerCase().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm)
    );
  }
  
  console.log('Filtered orders:', filteredOrders.length);
  currentPage = 1;
  renderOrdersTable();
}

function handleSort(column) {
  const ordersTableBody = document.getElementById('ordersTableBody');
  if (!ordersTableBody) return;
  
  const isCurrentlyAscending = ordersTableBody.getAttribute('data-sort-direction') !== 'desc';
  const direction = isCurrentlyAscending ? 'desc' : 'asc';
  
  filteredOrders.sort((a, b) => {
    let aValue, bValue;
    
    switch(column) {
      case 'id':
        aValue = a.id;
        bValue = b.id;
        break;
      case 'project':
        aValue = a.project;
        bValue = b.project;
        break;
      case 'date':
        aValue = getDateValue(a.date);
        bValue = getDateValue(b.date);
        break;
      default:
        return 0;
    }
    
    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
  
  ordersTableBody.setAttribute('data-sort-direction', direction);
  currentPage = 1;
  renderOrdersTable();
  console.log('Sorted by', column, 'in', direction, 'order');
}

function getDateValue(dateString) {
  const now = new Date();
  
  switch(dateString) {
    case 'Just now':
      return now.getTime();
    case 'A minute ago':
      return now.getTime() - 60000;
    case '1 hour ago':
      return now.getTime() - 3600000;
    case 'Yesterday':
      return now.getTime() - 86400000;
    default:
      return new Date(dateString).getTime() || 0;
  }
}

function changePage(direction) {
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const newPage = currentPage + direction;
  
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    renderOrdersTable();
    console.log('Changed to page:', currentPage);
  }
}

function renderOrdersTable() {
  const ordersTableBody = document.getElementById('ordersTableBody');
  if (!ordersTableBody) {
    console.error('Orders table body not found');
    return;
  }
  
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageOrders = filteredOrders.slice(startIndex, endIndex);
  
  ordersTableBody.innerHTML = pageOrders.map(order => `
    <tr>
      <td><strong>${order.id}</strong></td>
      <td>
        <div class="order-user">
          <img src="${order.user.avatar}" alt="${order.user.name}">
          <span>${order.user.name}</span>
        </div>
      </td>
      <td>${order.project}</td>
      <td>${order.address}</td>
      <td>${order.date}</td>
      <td>
        <span class="status-badge ${getStatusClass(order.status)}">
          ${order.status}
        </span>
      </td>
    </tr>
  `).join('');
  
  // Update pagination
  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  
  if (currentPageSpan) currentPageSpan.textContent = currentPage;
  if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
  if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
  if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
  
  console.log('Orders table rendered with', pageOrders.length, 'orders');
}

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

// Render products table
function renderProductsTable() {
  const productsTableBody = document.getElementById('productsTableBody');
  if (!productsTableBody) return;
  
  productsTableBody.innerHTML = appData.top_products.map(product => `
    <tr>
      <td>${product.name}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>$${product.amount.toFixed(2)}</td>
    </tr>
  `).join('');
  
  console.log('Products table rendered');
}

// Render contacts list
function renderContactsList() {
  const contactsList = document.getElementById('contactsList');
  if (!contactsList) return;
  
  contactsList.innerHTML = appData.contacts.map(contact => `
    <div class="contact-item">
      <img src="${contact.avatar}" alt="${contact.name}">
      <span>${contact.name}</span>
    </div>
  `).join('');
  
  console.log('Contacts list rendered');
}

// Render sales legend
function renderSalesLegend() {
  const salesLegend = document.getElementById('salesLegend');
  if (!salesLegend) return;
  
  salesLegend.innerHTML = appData.total_sales.map(item => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <span class="legend-label">${item.type}</span>
      <span class="legend-value">$${item.amount.toFixed(2)}</span>
    </div>
  `).join('');
  
  console.log('Sales legend rendered');
}

// Handle window resize
function handleResize() {
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.resize === 'function') {
      chart.resize();
    }
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error handling for charts
function handleChartError(chartName, error) {
  console.error(`Error initializing ${chartName} chart:`, error);
  
  const chartElement = document.querySelector(`#${chartName}Chart`);
  if (chartElement) {
    const container = chartElement.parentElement;
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 200px; color: var(--color-text-secondary);">
        <p>Error loading chart data</p>
      </div>
    `;
  }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // ESC key closes panels
  if (e.key === 'Escape') {
    closeRightPanel();
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('open');
    }
  }
  
  // Tab navigation improvements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// Remove keyboard navigation class on mouse interaction
document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Intersection Observer for lazy loading
setTimeout(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add fade-in animation to visible elements
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Apply intersection observer to cards
  const cards = document.querySelectorAll('.metric-card, .chart-card, .location-card, .products-card, .sales-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}, 1000);