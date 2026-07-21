/* Smart College Bus Management System - Comprehensive Interactive Logic Engine */

// Master Application State
const appState = {
  currentRole: 'student', // 'student' | 'driver' | 'admin'
  currentView: 'student-dashboard',
  isLoggedIn: true,
  deadlinePassed: false,
  collegeHoliday: false,
  emergencyActive: false,
  
  // Student Data (Rahul Sharma)
  student: {
    name: 'Rahul Sharma',
    roll: '22CS045',
    dept: 'Computer Science',
    year: '3rd Year',
    busNo: 'Bus 07',
    assignedStop: 'Kukatpally Metro',
    busTiming: '07:35 AM',
    travelStatus: 'YES', // 'YES' | 'NO' | 'PENDING'
    tripType: 'Both', // 'Morning' | 'Evening' | 'Both'
    submissionTime: '06:42 AM',
    driverName: 'Ramesh Kumar',
    driverPhone: '+91 98765 43210'
  },

  // Driver Data (Ramesh Kumar)
  driver: {
    name: 'Ramesh Kumar',
    empId: 'DRV-1007',
    phone: '+91 98765 43210',
    busNo: 'Bus 07',
    regNo: 'TS 09 UB 4412',
    experience: '6 Years',
    status: 'En Route',
    todayDate: '21 July 2026',
    fuelSavedToday: 1.8
  },

  // Route Stops Data for Bus 07
  stops: [
    { id: 1, name: 'Miyapur Cross Road', time: '07:15 AM', count: 5, status: 'completed', coords: [100, 250] },
    { id: 2, name: 'JNTU Junction', time: '07:25 AM', count: 6, status: 'completed', coords: [220, 210] },
    { id: 3, name: 'Kukatpally Metro', time: '07:35 AM', count: 8, status: 'waiting', coords: [340, 240] },
    { id: 4, name: 'KPHB Colony', time: '07:45 AM', count: 4, status: 'waiting', coords: [460, 200] },
    { id: 5, name: 'Moosapet', time: '07:55 AM', count: 0, status: 'skipped', coords: [580, 230] }, // Auto skipped (0 students)
    { id: 6, name: 'Bharat Nagar', time: '08:05 AM', count: 3, status: 'waiting', coords: [700, 190] },
    { id: 7, name: 'Erragadda', time: '08:15 AM', count: 2, status: 'waiting', coords: [820, 220] },
    { id: 8, name: 'College Main Gate', time: '08:35 AM', count: 0, status: 'waiting', coords: [940, 200] }
  ],

  // Roster of Students per Stop for Bus 07
  roster: [
    { name: 'Rahul Sharma', roll: '22CS045', dept: 'Computer Science', year: '3rd Year', bus: 'Bus 07', stop: 'Kukatpally Metro', status: 'Confirmed', note: 'Project poster' },
    { name: 'Ananya Rao', roll: '22EC012', dept: 'Electronics', year: '2nd Year', bus: 'Bus 07', stop: 'Kukatpally Metro', status: 'Confirmed', note: '-' },
    { name: 'Vikram Singh', roll: '22ME089', dept: 'Mechanical', year: '4th Year', bus: 'Bus 07', stop: 'Moosapet', status: 'Opted Out', note: 'Fever' },
    { name: 'Priya Patel', roll: '22CS102', dept: 'Computer Science', year: '3rd Year', bus: 'Bus 07', stop: 'JNTU Junction', status: 'Confirmed', note: '-' },
    { name: 'Siddharth Nair', roll: '22EE034', dept: 'Electrical', year: '1st Year', bus: 'Bus 07', stop: 'Miyapur Cross Road', status: 'Confirmed', note: '-' },
    { name: 'Sneha Verma', roll: '22CS078', dept: 'Computer Science', year: '2nd Year', bus: 'Bus 07', stop: 'KPHB Colony', status: 'Confirmed', note: '-' },
    { name: 'Karan Mehta', roll: '22IT045', dept: 'Information Tech', year: '3rd Year', bus: 'Bus 07', stop: 'Bharat Nagar', status: 'Confirmed', note: '-' }
  ],

  // Drivers List for Admin
  drivers: [
    { id: 'DRV-1007', name: 'Ramesh Kumar', phone: '+91 98765 43210', experience: '6 Years', bus: 'Bus 07', status: 'Active' },
    { id: 'DRV-1004', name: 'Suresh Rao', phone: '+91 98765 11223', experience: '8 Years', bus: 'Bus 04', status: 'Active' },
    { id: 'DRV-1012', name: 'Mahesh Babu', phone: '+91 98765 99887', experience: '4 Years', bus: 'Bus 12', status: 'Active' },
    { id: 'DRV-1018', name: 'Gopala Krishna', phone: '+91 98765 33445', experience: '10 Years', bus: 'Bus 18', status: 'On Leave' }
  ],

  // Fleet Buses List for Admin
  buses: [
    { busNo: 'Bus 07', regNo: 'TS 09 UB 4412', capacity: 40, driver: 'Ramesh Kumar', route: 'Kukatpally Expressway', status: 'En Route' },
    { busNo: 'Bus 04', regNo: 'TS 09 UB 1004', capacity: 40, driver: 'Suresh Rao', route: 'LB Nagar Express', status: 'En Route' },
    { busNo: 'Bus 12', regNo: 'TS 09 UB 1012', capacity: 40, driver: 'Mahesh Babu', route: 'Secunderabad Loop', status: 'En Route' },
    { busNo: 'Bus 18', regNo: 'TS 09 UB 1018', capacity: 50, driver: 'Gopala Krishna', route: 'Gachibowli Bypass', status: 'Idle' }
  ],

  // Admin Master Statistics
  stats: {
    totalStudents: 1240,
    activeDrivers: 18,
    totalBuses: 20,
    confirmedToday: 893,
    optedOutToday: 247,
    pendingToday: 100,
    fuelSavedLiters: 48.5,
    costSaved: 145.5,
    todayTrips: 36
  }
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderAllViews();
  setupEventListeners();
  renderCharts();
});

// Setup Main Event Listeners
function setupEventListeners() {
  // Role Switcher Tabs
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const role = e.currentTarget.getAttribute('data-role');
      switchRole(role);
    });
  });

  // Sidebar Nav Items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = e.currentTarget.getAttribute('data-view');
      switchView(targetView);
    });
  });

  // Student Poll Buttons
  const pollYes = document.getElementById('poll-yes');
  const pollNo = document.getElementById('poll-no');
  if (pollYes && pollNo) {
    pollYes.addEventListener('click', () => handleStudentResponse('YES'));
    pollNo.addEventListener('click', () => handleStudentResponse('NO'));
  }
}

// Switch Persona Role
function switchRole(role) {
  appState.currentRole = role;
  
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-role') === role);
  });

  document.querySelectorAll('.sidebar-role-group').forEach(group => {
    group.style.display = group.getAttribute('data-role') === role ? 'flex' : 'none';
  });

  let defaultView = 'student-dashboard';
  if (role === 'driver') defaultView = 'driver-dashboard';
  if (role === 'admin') defaultView = 'admin-dashboard';

  switchView(defaultView);
}

// Switch Sub View
function switchView(viewId) {
  appState.currentView = viewId;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-view') === viewId);
  });

  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === viewId);
  });

  if (viewId === 'driver-map' || viewId === 'student-bus' || viewId === 'admin-monitoring') {
    renderRouteMapSVG();
  }
  if (viewId === 'admin-reports') {
    renderCharts();
  }
}

// Student Travel Response Handling
function handleStudentResponse(status) {
  if (appState.deadlinePassed) {
    showToast('Deadline Passed! Submissions are locked for today.', 'danger');
    return;
  }

  appState.student.travelStatus = status;
  const now = new Date();
  appState.student.submissionTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  recalculateRouteLogic();
  renderAllViews();

  if (status === 'YES') {
    showToast('Travel Confirmed! Seat reserved on Bus 07.', 'success');
  } else {
    showToast('Opted Out! Stop count updated for driver.', 'warning');
  }
}

// Recalculate Route Logic & Skipped Stops
function recalculateRouteLogic() {
  const targetStopIndex = appState.stops.findIndex(s => s.name === appState.student.assignedStop);

  if (targetStopIndex !== -1) {
    if (appState.student.travelStatus === 'NO') {
      appState.stops[targetStopIndex].count = Math.max(0, appState.stops[targetStopIndex].count - 1);
    } else if (appState.student.travelStatus === 'YES') {
      appState.stops[targetStopIndex].count = 8;
    }

    appState.stops.forEach(stop => {
      if (stop.count === 0 && stop.status !== 'completed') {
        stop.status = 'skipped';
      } else if (stop.count > 0 && stop.status === 'skipped') {
        stop.status = 'waiting';
      }
    });
  }

  const skippedCount = appState.stops.filter(s => s.status === 'skipped').length;
  appState.stats.fuelSavedLiters = parseFloat((48.5 + (skippedCount * 1.8)).toFixed(1));
  appState.stats.costSaved = Math.round(appState.stats.fuelSavedLiters * 3.0);
}

// Render All UI Components
function renderAllViews() {
  renderStudentView();
  renderDriverView();
  renderAdminView();
  renderRouteMapSVG();
}

// Render Student Module Components
function renderStudentView() {
  const pollStatusCard = document.getElementById('student-status-badge');
  const pollYes = document.getElementById('poll-yes');
  const pollNo = document.getElementById('poll-no');
  const tripForm = document.getElementById('trip-config-form');
  const statusBanner = document.getElementById('student-confirmation-banner');

  if (pollStatusCard) {
    if (appState.student.travelStatus === 'YES') {
      pollStatusCard.className = 'badge badge-success';
      pollStatusCard.textContent = 'Confirmed Coming Today';
      if (pollYes) pollYes.className = 'poll-btn selected-yes';
      if (pollNo) pollNo.className = 'poll-btn';
      if (tripForm) tripForm.style.display = 'flex';
      if (statusBanner) {
        statusBanner.className = 'card status-banner success';
        statusBanner.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div>
              <h3 style="color:var(--success); font-weight:700;">Seat Confirmed for Today</h3>
              <p style="font-size:0.85rem; color:var(--text-muted);">Pickup Stop: <strong>${appState.student.assignedStop}</strong> | Arrival: <strong>${appState.student.busTiming}</strong></p>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="editStudentResponse()"><i class="ri-edit-line"></i> Edit Response</button>
          </div>
        `;
      }
    } else if (appState.student.travelStatus === 'NO') {
      pollStatusCard.className = 'badge badge-danger';
      pollStatusCard.textContent = 'Opted Out Today';
      if (pollYes) pollYes.className = 'poll-btn';
      if (pollNo) pollNo.className = 'poll-btn selected-no';
      if (tripForm) tripForm.style.display = 'none';
      if (statusBanner) {
        statusBanner.className = 'card status-banner danger';
        statusBanner.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div>
              <h3 style="color:var(--danger); font-weight:700;">Not Traveling Today</h3>
              <p style="font-size:0.85rem; color:var(--text-muted);">Your stop (${appState.student.assignedStop}) will be auto-skipped if 0 passengers remain.</p>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="editStudentResponse()"><i class="ri-refresh-line"></i> Change Response</button>
          </div>
        `;
      }
    }
  }
}

// Render Driver Module Components
function renderDriverView() {
  const timelineContainer = document.getElementById('driver-route-timeline');
  if (!timelineContainer) return;

  const skippedCount = appState.stops.filter(s => s.status === 'skipped').length;
  const completedCount = appState.stops.filter(s => s.status === 'completed').length;
  const waitingCount = appState.stops.filter(s => s.status === 'waiting').length;
  const totalStudentsPicked = appState.stops.reduce((acc, curr) => curr.status === 'completed' ? acc + curr.count : acc, 0);

  // Update Driver Dashboard Statistics
  const skippedEl = document.getElementById('driver-skipped-count');
  if (skippedEl) skippedEl.textContent = skippedCount;
  const visitedEl = document.getElementById('driver-visited-count');
  if (visitedEl) visitedEl.textContent = completedCount;
  const waitingEl = document.getElementById('driver-waiting-count');
  if (waitingEl) waitingEl.textContent = waitingCount;
  const fuelEl = document.getElementById('driver-fuel-saved');
  if (fuelEl) fuelEl.textContent = `${(skippedCount * 1.8).toFixed(1)} L`;
  
  const summaryPickedEl = document.getElementById('driver-summary-picked');
  if (summaryPickedEl) summaryPickedEl.textContent = totalStudentsPicked;

  let html = '';
  appState.stops.forEach(stop => {
    let badgeClass = 'badge-info';
    let statusText = 'Waiting';
    let itemClass = '';

    if (stop.status === 'completed') {
      badgeClass = 'badge-success';
      statusText = 'Completed';
      itemClass = 'completed';
    } else if (stop.status === 'skipped') {
      badgeClass = 'badge-danger';
      statusText = 'Auto-Skipped (0 Students)';
      itemClass = 'skipped';
    }

    html += `
      <div class="timeline-item ${itemClass}">
        <div class="timeline-node"></div>
        <div class="stop-info">
          <h4>${stop.name} <span class="badge ${badgeClass}" style="margin-left:8px;">${statusText}</span></h4>
          <p>ETA: <strong>${stop.time}</strong> &bull; Boarding Students: <strong>${stop.count}</strong></p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          ${stop.status === 'waiting' ? `
            <button class="btn btn-sm btn-success" onclick="markStopCompleted(${stop.id})"><i class="ri-check-line"></i> Mark Completed</button>
            <button class="btn btn-sm btn-secondary" onclick="manualSkipStop(${stop.id})"><i class="ri-close-line"></i> Skip Stop</button>
          ` : `<span style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">${stop.status.toUpperCase()}</span>`}
        </div>
      </div>
    `;
  });

  timelineContainer.innerHTML = html;
}

// Render Admin Module Components
function renderAdminView() {
  const confirmedEl = document.getElementById('admin-confirmed-val');
  const fuelEl = document.getElementById('admin-fuel-val');
  const costEl = document.getElementById('admin-cost-val');
  const skippedStopsEl = document.getElementById('admin-skipped-stops-val');

  if (confirmedEl) confirmedEl.textContent = appState.student.travelStatus === 'YES' ? 893 : 892;
  if (fuelEl) fuelEl.textContent = `${appState.stats.fuelSavedLiters} L`;
  if (costEl) costEl.textContent = `$${appState.stats.costSaved}`;
  
  const skippedCount = appState.stops.filter(s => s.status === 'skipped').length;
  if (skippedStopsEl) skippedStopsEl.textContent = `${13 + skippedCount} Stops`;
}

// Render SVG Map
function renderRouteMapSVG() {
  const svgContainers = document.querySelectorAll('.map-svg-element');
  svgContainers.forEach(svg => {
    let pathD = 'M ';
    appState.stops.forEach((st, idx) => {
      pathD += `${st.coords[0]},${st.coords[1]} ${idx < appState.stops.length - 1 ? 'L ' : ''}`;
    });

    let nodesHtml = '';
    appState.stops.forEach(st => {
      let fillColor = '#3b82f6';
      if (st.status === 'completed') fillColor = '#10b981';
      if (st.status === 'skipped') fillColor = '#ef4444';

      nodesHtml += `
        <circle cx="${st.coords[0]}" cy="${st.coords[1]}" r="12" fill="${fillColor}" stroke="#ffffff" stroke-width="3" />
        <text x="${st.coords[0]}" y="${st.coords[1] + 30}" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">${st.name}</text>
        <text x="${st.coords[0]}" y="${st.coords[1] + 44}" fill="${fillColor}" font-size="10" font-weight="700" text-anchor="middle">${st.count} Passengers</text>
      `;
    });

    const activeBusCoords = appState.stops[2].coords;

    svg.innerHTML = `
      <defs>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="50%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#64748b" />
        </linearGradient>
      </defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      <path d="${pathD}" fill="none" stroke="url(#routeGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
      ${nodesHtml}

      <g transform="translate(${activeBusCoords[0] - 16}, ${activeBusCoords[1] - 36})">
        <rect width="32" height="20" rx="4" fill="#2563eb" stroke="#ffffff" stroke-width="2" />
        <circle cx="8" cy="20" r="3" fill="#0f172a" />
        <circle cx="24" cy="20" r="3" fill="#0f172a" />
        <text x="16" y="14" fill="white" font-size="9" font-weight="800" text-anchor="middle">BUS 07</text>
      </g>
    `;
  });
}

// Render Reports Charts
function renderCharts() {
  const chartEl = document.getElementById('fuel-chart-bars');
  if (!chartEl) return;

  const data = [
    { label: 'Mon', val: '42 L', height: '65%' },
    { label: 'Tue', val: '48 L', height: '75%' },
    { label: 'Wed', val: '38 L', height: '58%' },
    { label: 'Thu', val: '54 L', height: '88%' },
    { label: 'Fri', val: '48.5 L', height: '78%' }
  ];

  let html = '';
  data.forEach(d => {
    html += `
      <div class="chart-bar-wrapper">
        <div class="chart-bar" style="height:${d.height};" data-val="${d.val}"></div>
        <span class="chart-label">${d.label}</span>
      </div>
    `;
  });
  chartEl.innerHTML = html;
}

// Driver Action: Mark Stop Completed
function markStopCompleted(stopId) {
  const stop = appState.stops.find(s => s.id === stopId);
  if (stop) {
    stop.status = 'completed';
    renderAllViews();
    showToast(`Stop "${stop.name}" marked completed.`, 'success');
  }
}

// Driver Action: Manual Skip
function manualSkipStop(stopId) {
  const stop = appState.stops.find(s => s.id === stopId);
  if (stop) {
    stop.status = 'skipped';
    renderAllViews();
    showToast(`Stop "${stop.name}" manually skipped.`, 'warning');
  }
}

// Edit Response
function editStudentResponse() {
  if (appState.deadlinePassed) {
    showToast('Cannot edit. Deadline (07:00 AM) passed.', 'danger');
    return;
  }
  switchView('student-travel');
}

// Modals Handler
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// CRUD Simulations
function handleAddStudent(e) {
  e.preventDefault();
  closeModal('modal-add-student');
  showToast('Student successfully added and assigned to Bus 07!', 'success');
}

function handleAddDriver(e) {
  e.preventDefault();
  closeModal('modal-add-driver');
  showToast('Driver record created successfully!', 'success');
}

function handleAddBus(e) {
  e.preventDefault();
  closeModal('modal-add-bus');
  showToast('New Bus added to college fleet!', 'success');
}

function handleReportIssue(e) {
  e.preventDefault();
  closeModal('modal-report-issue');
  showToast('Issue report dispatched to Transport Admin.', 'warning');
}

// Export Trigger
function exportReport(format) {
  showToast(`Generating ${format} Report export file... Download started.`, 'info');
}

// Edge Case Trigger Simulations
function triggerEdgeCase(caseType) {
  if (caseType === 'toggle-deadline') {
    appState.deadlinePassed = !appState.deadlinePassed;
    const deadlineTag = document.getElementById('deadline-sim-status');
    if (deadlineTag) deadlineTag.textContent = appState.deadlinePassed ? 'PASSED (07:01 AM)' : 'OPEN (Deadline 07:00 AM)';
    showToast(`Deadline state: ${appState.deadlinePassed ? 'LOCKED' : 'ACTIVE'}`, appState.deadlinePassed ? 'danger' : 'info');
  } 
  else if (caseType === 'all-opt-out') {
    appState.student.travelStatus = 'NO';
    appState.stops.forEach(s => {
      s.count = 0;
      s.status = 'skipped';
    });
    recalculateRouteLogic();
    renderAllViews();
    showToast('Edge Case: All passengers opted out! Entire route auto-optimized.', 'warning');
  }
  else if (caseType === 'bus-delay') {
    appState.driver.status = 'Delayed 15 Mins';
    showToast('Alert: Bus 07 delayed 15 mins due to Kukatpally flyover traffic.', 'danger');
  }
  else if (caseType === 'college-holiday') {
    appState.collegeHoliday = !appState.collegeHoliday;
    showToast(appState.collegeHoliday ? 'College Holiday Enabled. Operations suspended.' : 'Normal Operations Resumed.', 'info');
  }
}

// Toast Helper
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '1rem 1.25rem';
  toast.style.borderRadius = '14px';
  toast.style.color = 'white';
  toast.style.fontWeight = '600';
  toast.style.fontSize = '0.88rem';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
  toast.style.zIndex = '9999';
  toast.style.animation = 'fadeIn 0.3s ease';

  if (type === 'success') toast.style.background = '#10b981';
  if (type === 'danger') toast.style.background = '#ef4444';
  if (type === 'warning') toast.style.background = '#f59e0b';
  if (type === 'info') toast.style.background = '#2563eb';

  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
