/**
 * AeroBharat - Core Application Logic & View Controller
 * Single Page Application architecture managing public views, authentication state,
 * user reservation flow, interactive seat selector, UPI payment gateway,
 * printable ticket/invoice generator, and admin CRUD dashboards.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Application State
  const AppState = {
    currentUser: null, // { name, email, role: 'User'|'Admin' }
    activeView: 'public-home',
    activeUserTab: 'user-overview',
    activeAdminTab: 'admin-overview',

    // Flight Search & Booking Flow
    searchQuery: {
      fromCode: 'DEL',
      toCode: 'BLR',
      travelDate: '2026-08-15',
      travelClass: 'Economy',
      passengers: 1
    },
    selectedFlight: null,
    selectedSeat: null,
    passengerDetails: {
      name: 'Ananya Sharma',
      gender: 'Female',
      age: 28,
      phone: '+91 98765 43210',
      email: 'ananya.sharma@example.in',
      aadhaarNo: 'XXXX-XXXX-4812',
      mealChoice: 'Jain Meal',
      baggageKg: '15 Kg'
    },
    lastGeneratedPNR: null,
    revenueChartInstance: null,
    routeChartInstance: null
  };

  // Local Storage Initialization
  function initStorage() {
    if (!localStorage.getItem('aerobharat_flights')) {
      localStorage.setItem('aerobharat_flights', JSON.stringify(window.AeroBharatData.flights));
    }
    if (!localStorage.getItem('aerobharat_bookings')) {
      localStorage.setItem('aerobharat_bookings', JSON.stringify(window.AeroBharatData.bookings));
    }
    if (!localStorage.getItem('aerobharat_users')) {
      localStorage.setItem('aerobharat_users', JSON.stringify(window.AeroBharatData.users));
    }
    if (!localStorage.getItem('aerobharat_feedbacks')) {
      localStorage.setItem('aerobharat_feedbacks', JSON.stringify(window.AeroBharatData.feedbacks));
    }
  }
  initStorage();

  // Data Getters & Setters
  function getFlights() {
    return JSON.parse(localStorage.getItem('aerobharat_flights'));
  }
  function saveFlights(data) {
    localStorage.setItem('aerobharat_flights', JSON.stringify(data));
  }
  function getBookings() {
    return JSON.parse(localStorage.getItem('aerobharat_bookings'));
  }
  function saveBookings(data) {
    localStorage.setItem('aerobharat_bookings', JSON.stringify(data));
  }
  function getUsers() {
    return JSON.parse(localStorage.getItem('aerobharat_users'));
  }
  function saveUsers(data) {
    localStorage.setItem('aerobharat_users', JSON.stringify(data));
  }

  /* ==========================================================================
     Navigation & View Switching
     ========================================================================== */

  window.navigateTo = function (viewId) {
    AppState.activeView = viewId;
    
    // Hide all main containers
    document.querySelectorAll('.app-view-container').forEach(el => el.classList.add('d-none'));

    // Show target view container
    const targetEl = document.getElementById(viewId);
    if (targetEl) {
      targetEl.classList.remove('d-none');
    }

    // Update Navigation UI
    updateNavUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render View Specific Data
    if (viewId === 'public-search') {
      renderSearchFlightResults();
    } else if (viewId === 'user-dashboard') {
      switchUserTab(AppState.activeUserTab);
    } else if (viewId === 'admin-dashboard') {
      switchAdminTab(AppState.activeAdminTab);
    }
  };

  function updateNavUI() {
    const authControls = document.getElementById('navbarAuthControls');
    if (!authControls) return;

    if (AppState.currentUser) {
      const isAdmin = AppState.currentUser.role === 'Admin';
      authControls.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-outline-light dropdown-toggle font-heading text-saffron fw-bold" type="button" data-bs-toggle="dropdown">
            <i class="bi bi-person-circle me-1"></i> ${AppState.currentUser.name} (${AppState.currentUser.role})
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow">
            ${
              isAdmin
                ? `<li><a class="dropdown-item" href="javascript:void(0)" onclick="navigateTo('admin-dashboard')"><i class="bi bi-speedometer2 me-2"></i>Admin Panel</a></li>`
                : `<li><a class="dropdown-item" href="javascript:void(0)" onclick="navigateTo('user-dashboard')"><i class="bi bi-speedometer2 me-2"></i>My Dashboard</a></li>
                   <li><a class="dropdown-item" href="javascript:void(0)" onclick="switchUserTab('user-my-tickets')"><i class="bi bi-ticket-perforated me-2"></i>My Tickets</a></li>`
            }
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="handleLogout()"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
          </ul>
        </div>
      `;
    } else {
      authControls.innerHTML = `
        <button class="btn btn-outline-light me-2 btn-sm fw-semibold" onclick="openLoginModal()">Login</button>
        <button class="btn btn-saffron btn-sm fw-semibold" onclick="openRegisterModal()">Register</button>
      `;
    }
  }

  /* ==========================================================================
     Authentication Simulation
     ========================================================================== */

  window.openLoginModal = function () {
    const modalEl = new bootstrap.Modal(document.getElementById('loginModal'));
    modalEl.show();
  };

  window.openRegisterModal = function () {
    const modalEl = new bootstrap.Modal(document.getElementById('registerModal'));
    modalEl.show();
  };

  window.quickFillLogin = function (role) {
    if (role === 'user') {
      document.getElementById('loginEmail').value = 'user@aerobharat.in';
      document.getElementById('loginPassword').value = 'user123';
    } else if (role === 'admin') {
      document.getElementById('loginEmail').value = 'admin@aerobharat.in';
      document.getElementById('loginPassword').value = 'admin123';
    }
  };

  window.handleLoginSubmit = function (e) {
    e.preventDefault();
    const emailInput = document.getElementById('loginEmail').value.trim();
    if (!emailInput) return;
    const email = emailInput.toLowerCase();

    if (email === 'admin@aerobharat.in') {
      AppState.currentUser = { name: 'AeroAdmin Team', email: emailInput, role: 'Admin' };
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modalInstance) modalInstance.hide();
      navigateTo('admin-dashboard');
      return;
    }

    const users = getUsers();
    let existingUser = users.find(u => u.email.toLowerCase() === email);

    if (existingUser) {
      AppState.currentUser = {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone || '+91 98765 43210',
        city: existingUser.city || 'Bengaluru',
        pin: existingUser.pin || '560001',
        role: existingUser.role || 'User'
      };
      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modalInstance) modalInstance.hide();
      navigateTo('user-dashboard');
    } else {
      // New email detected! Ask for user's name
      let enteredName = prompt(`Welcome to AeroBharat!\nNew email detected: (${emailInput})\nPlease enter your Full Name to continue:`);
      
      if (enteredName === null) {
        // User pressed Cancel
        return;
      }
      
      enteredName = enteredName.trim();
      if (!enteredName) {
        const prefix = emailInput.split('@')[0];
        enteredName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }

      const newUser = {
        id: 'USR-' + Math.floor(100 + Math.random() * 900),
        name: enteredName,
        email: emailInput,
        phone: '+91 98765 43210',
        city: 'Bengaluru',
        state: 'Karnataka',
        pin: '560001',
        role: 'User',
        status: 'Active',
        isTemporarySession: true
      };

      users.push(newUser);
      saveUsers(users);

      AppState.currentUser = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        city: newUser.city,
        pin: newUser.pin,
        role: 'User',
        isTemporarySession: true
      };

      const modalInstance = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modalInstance) modalInstance.hide();

      alert(`Account created successfully for ${newUser.name}! Welcome to AeroBharat.`);
      navigateTo('user-dashboard');
    }
  };

  function cleanupTemporarySession() {
    if (AppState.currentUser && AppState.currentUser.isTemporarySession) {
      const targetEmail = AppState.currentUser.email.toLowerCase();

      // Remove temporary user from localStorage users
      const users = getUsers().filter(u => u.email.toLowerCase() !== targetEmail);
      saveUsers(users);

      // Remove temporary user's bookings from localStorage bookings
      const bookings = getBookings().filter(b => b.userEmail.toLowerCase() !== targetEmail);
      saveBookings(bookings);
    }
  }

  window.handleLogout = function () {
    if (AppState.currentUser && AppState.currentUser.isTemporarySession) {
      const userName = AppState.currentUser.name;
      cleanupTemporarySession();
      alert(`Logged out. Session details and bookings for ${userName} have been deleted.`);
    }
    AppState.currentUser = null;
    AppState.selectedFlight = null;
    AppState.selectedSeat = null;
    navigateTo('public-home');
  };

  window.addEventListener('beforeunload', function () {
    cleanupTemporarySession();
  });

  window.handleRegisterSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const pin = document.getElementById('regPin').value.trim();
    const city = document.getElementById('regCity').value.trim() || 'Bengaluru';

    if (!IndianLocaleUtils.validateMobile(phone)) {
      alert('Please enter a valid 10-digit Indian Mobile Number starting with 6-9.');
      return;
    }
    if (!IndianLocaleUtils.validatePIN(pin)) {
      alert('Please enter a valid 6-digit Indian PIN Code.');
      return;
    }

    const newUser = {
      id: 'USR-' + Math.floor(100 + Math.random() * 900),
      name: name,
      email: email,
      phone: phone,
      city: city,
      state: 'Karnataka',
      pin: pin,
      role: 'User',
      status: 'Active',
      isTemporarySession: true
    };

    const users = getUsers();
    const updatedUsers = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    updatedUsers.push(newUser);
    saveUsers(updatedUsers);

    AppState.currentUser = {
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      city: newUser.city,
      pin: newUser.pin,
      role: 'User',
      isTemporarySession: true
    };

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (modalInstance) modalInstance.hide();
    alert(`Registration Successful! Welcome to AeroBharat, ${name}.\n(Note: Account and booking details will be cleared upon exit/logout).`);
    navigateTo('user-dashboard');
  };

  /* ==========================================================================
     Flight Search & Filtering Engine
     ========================================================================== */

  function populateAirportDropdowns() {
    const fromSelects = [document.getElementById('searchFrom'), document.getElementById('dashSearchFrom')];
    const toSelects = [document.getElementById('searchTo'), document.getElementById('dashSearchTo')];

    fromSelects.forEach(select => {
      if (!select) return;
      select.innerHTML = '';
      window.AeroBharatData.airports.forEach(ap => {
        select.innerHTML += `<option value="${ap.code}">${ap.city} (${ap.code}) - ${ap.name}</option>`;
      });
      select.value = 'DEL';
    });

    toSelects.forEach(select => {
      if (!select) return;
      select.innerHTML = '';
      window.AeroBharatData.airports.forEach(ap => {
        select.innerHTML += `<option value="${ap.code}">${ap.city} (${ap.code}) - ${ap.name}</option>`;
      });
      select.value = 'BLR';
    });
  }
  populateAirportDropdowns();

  window.triggerSearch = function (isDashboardSearch = false) {
    const prefix = isDashboardSearch ? 'dashSearch' : 'search';
    const fromCode = document.getElementById(prefix + 'From').value;
    const toCode = document.getElementById(prefix + 'To').value;
    const travelDate = document.getElementById(prefix + 'Date').value;
    const travelClass = document.getElementById(prefix + 'Class').value;

    if (fromCode === toCode) {
      alert('Origin and Destination cities cannot be the same!');
      return;
    }

    AppState.searchQuery = {
      fromCode: fromCode,
      toCode: toCode,
      travelDate: travelDate || '2026-08-15',
      travelClass: travelClass,
      passengers: 1
    };

    if (isDashboardSearch) {
      switchUserTab('user-flight-results');
    } else {
      navigateTo('public-search');
    }
  };

  function renderSearchFlightResults() {
    const publicContainer = document.getElementById('publicSearchResultsList');
    const dashContainer = document.getElementById('dashSearchResultsList');

    const allFlights = getFlights();
    const query = AppState.searchQuery;

    // Filter matching route flights
    let filtered = allFlights.filter(f => f.fromCode === query.fromCode && f.toCode === query.toCode);
    let noticeMessage = `Showing flights for <strong>${query.fromCode} → ${query.toCode}</strong> on <strong>${IndianLocaleUtils.formatDate(query.travelDate)}</strong> (${query.travelClass} Class)`;

    // Check if flights for the selected route exist
    if (filtered.length === 0) {
      // Fallback: If no direct flights uploaded yet for this specific route, show connecting options from origin
      filtered = allFlights.filter(f => f.fromCode === query.fromCode);
      if (filtered.length === 0) filtered = allFlights.slice(0, 5);
      
      noticeMessage = `<i class="bi bi-exclamation-triangle-fill text-warning me-2 fs-5"></i> Flight data for <strong>${query.fromCode} → ${query.toCode}</strong> on <strong>${IndianLocaleUtils.formatDate(query.travelDate)}</strong> has not been uploaded by airlines yet. Showing nearest scheduled flights below:`;
    }

    let html = `
      <div class="alert alert-info border-0 shadow-sm d-flex align-items-center justify-content-between mb-4 bg-gradient-glass">
        <div>${noticeMessage}</div>
        <span class="badge bg-navy text-light px-3 py-2 fs-6 font-heading">${filtered.length} Flights Available</span>
      </div>
    `;

    filtered.forEach(f => {
      const fare = query.travelClass === 'Business' ? f.businessFare : f.economyFare;
      const formattedFare = IndianLocaleUtils.formatINR(fare);
      const isDelayed = f.status.includes('Delayed');

      html += `
        <div class="card card-custom mb-3 p-3">
          <div class="row align-items-center">
            <div class="col-md-3 mb-2 mb-md-0">
              <div class="d-flex align-items-center gap-2">
                <span class="fs-2">${f.airlineLogo}</span>
                <div>
                  <h6 class="mb-0 fw-bold font-heading">${f.airline}</h6>
                  <small class="text-muted">${f.flightNo} • ${f.aircraft}</small>
                </div>
              </div>
            </div>
            
            <div class="col-md-5 mb-3 mb-md-0">
              <div class="flight-route-display">
                <div class="text-start">
                  <h5 class="mb-0 fw-bold font-heading">${IndianLocaleUtils.formatTime(f.departureTime)}</h5>
                  <span class="badge bg-light text-dark fw-semibold">${f.fromCode}</span>
                </div>
                <div class="flight-line">
                  <span class="flight-line-icon"><i class="bi bi-airplane-fill"></i></span>
                  <small class="text-muted d-block mt-1">${f.duration}</small>
                </div>
                <div class="text-end">
                  <h5 class="mb-0 fw-bold font-heading">${IndianLocaleUtils.formatTime(f.arrivalTime)}</h5>
                  <span class="badge bg-light text-dark fw-semibold">${f.toCode}</span>
                </div>
              </div>
            </div>

            <div class="col-md-2 text-md-center mb-2 mb-md-0">
              <span class="badge ${isDelayed ? 'badge-status-delayed' : 'badge-status-ontime'} px-3 py-2">
                <i class="bi bi-clock me-1"></i> ${f.status}
              </span>
              <small class="d-block text-muted mt-1">${f.availableSeats} Seats Left</small>
            </div>

            <div class="col-md-2 text-md-end">
              <div class="text-saffron fw-bold fs-4 font-heading">${formattedFare}</div>
              <small class="text-muted d-block mb-2">+ 18% GST</small>
              <button class="btn btn-saffron btn-sm w-100 font-heading" onclick="selectFlightForBooking('${f.id}')">
                Select Flight <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    });

    if (publicContainer) publicContainer.innerHTML = html;
    if (dashContainer) dashContainer.innerHTML = html;
  }

  window.selectFlightForBooking = function (flightId) {
    const allFlights = getFlights();
    AppState.selectedFlight = allFlights.find(f => f.id === flightId);

    if (!AppState.currentUser) {
      alert('Please login to proceed with seat selection and booking.');
      openLoginModal();
      return;
    }

    navigateTo('user-dashboard');
    switchUserTab('user-seat-selection');
  };

  /* ==========================================================================
     Interactive Seat Selection Component (3-3 Airplane Grid)
     ========================================================================== */

  function renderSeatSelector() {
    const seatContainer = document.getElementById('interactiveSeatGrid');
    const selectedSeatSummary = document.getElementById('selectedSeatSummary');
    if (!seatContainer) return;

    if (!AppState.selectedFlight) {
      if (selectedSeatSummary) {
        selectedSeatSummary.innerHTML = `
          <div class="booking-ticket-summary-column text-center py-4">
            <i class="bi bi-airplane text-muted fs-1 mb-2 d-block"></i>
            <h6 class="fw-bold font-heading mb-2">No Flight Selected</h6>
            <p class="text-muted small mb-3">Please select a flight from Search & Book to choose seats.</p>
            <button class="btn btn-saffron btn-sm font-heading" onclick="switchUserTab('user-flight-results')">
              <i class="bi bi-search me-1"></i> Go to Search & Book
            </button>
          </div>
        `;
      }
      seatContainer.innerHTML = `<div class="p-5 text-center text-muted"><p class="mb-0">Select a flight schedule first to view the interactive seat map.</p></div>`;
      return;
    }

    const flight = AppState.selectedFlight;
    const rows = 10;
    const bookedSeats = ['02A', '04B', '05C', '08D', '09F', '01C', '03E'];

    let gridHtml = '';
    for (let r = 1; r <= rows; r++) {
      const rowNum = r < 10 ? '0' + r : '' + r;
      
      ['A', 'B', 'C'].forEach(col => {
        const seatId = rowNum + col;
        const isBooked = bookedSeats.includes(seatId);
        const isSelected = AppState.selectedSeat === seatId;
        const stateClass = isBooked ? 'booked' : isSelected ? 'selected' : 'available';

        gridHtml += `<div class="seat-btn ${stateClass}" onclick="toggleSeat('${seatId}', ${isBooked})">${seatId}</div>`;
      });

      gridHtml += `<div class="seat-aisle-num">${r}</div>`;

      ['D', 'E', 'F'].forEach(col => {
        const seatId = rowNum + col;
        const isBooked = bookedSeats.includes(seatId);
        const isSelected = AppState.selectedSeat === seatId;
        const stateClass = isBooked ? 'booked' : isSelected ? 'selected' : 'available';

        gridHtml += `<div class="seat-btn ${stateClass}" onclick="toggleSeat('${seatId}', ${isBooked})">${seatId}</div>`;
      });
    }

    seatContainer.innerHTML = gridHtml;

    const baseFare = AppState.searchQuery.travelClass === 'Business' ? flight.businessFare : flight.economyFare;
    const gstInfo = IndianLocaleUtils.calculateGST(baseFare);

    if (selectedSeatSummary) {
      selectedSeatSummary.innerHTML = `
        <div class="booking-ticket-summary-column">
          <h5 class="fw-bold font-heading text-primary border-bottom pb-2 mb-3">
            <i class="bi bi-ticket-detailed-fill text-saffron me-2"></i>Booking Details Column
          </h5>
          <p class="mb-1"><strong>Airline:</strong> ${flight.airline} (${flight.flightNo})</p>
          <p class="mb-1"><strong>Route:</strong> ${flight.fromCity} (${flight.fromCode}) → ${flight.toCity} (${flight.toCode})</p>
          <p class="mb-1"><strong>Travel Date:</strong> ${IndianLocaleUtils.formatDate(AppState.searchQuery.travelDate)}</p>
          <p class="mb-1"><strong>Selected Seat:</strong> <span class="badge bg-saffron text-light fs-6 fw-bold">${AppState.selectedSeat || 'Select Below'}</span></p>
          <hr>
          <div class="d-flex justify-content-between mb-1">
            <span>Base Fare (${AppState.searchQuery.travelClass}):</span>
            <strong>${IndianLocaleUtils.formatINR(baseFare)}</strong>
          </div>
          <div class="d-flex justify-content-between mb-1 text-muted">
            <span>CGST (9%) + SGST (9%):</span>
            <span>${IndianLocaleUtils.formatINR(gstInfo.totalGst)}</span>
          </div>
          <div class="d-flex justify-content-between border-top pt-2 mt-2">
            <span class="fw-bold font-heading fs-5">Grand Total:</span>
            <span class="fw-bold font-heading text-saffron fs-5">${IndianLocaleUtils.formatINR(gstInfo.grandTotal)}</span>
          </div>
          <button class="btn btn-saffron w-100 mt-3 font-heading" ${!AppState.selectedSeat ? 'disabled' : ''} onclick="switchUserTab('user-passenger-details')">
            Proceed to Passenger Form <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      `;
    }
  }

  window.toggleSeat = function (seatId, isBooked) {
    if (isBooked) return;
    AppState.selectedSeat = seatId;
    renderSeatSelector();
  };

  /* ==========================================================================
     Passenger Details Form & Live Payment Column with Fake Paid Animation
     ========================================================================== */

  window.handlePassengerFormSubmit = function (e) {
    e.preventDefault();
    AppState.passengerDetails = {
      name: document.getElementById('passName').value,
      gender: document.getElementById('passGender').value,
      age: document.getElementById('passAge').value,
      phone: document.getElementById('passPhone').value,
      email: document.getElementById('passEmail').value,
      aadhaarNo: document.getElementById('passAadhaar').value || 'XXXX-XXXX-4812',
      mealChoice: document.getElementById('passMeal').value,
      baggageKg: document.getElementById('passBaggage').value
    };

    if (!IndianLocaleUtils.validateMobile(AppState.passengerDetails.phone)) {
      alert('Please enter a valid 10-digit Indian Mobile Number (+91 format).');
      return;
    }

    renderLiveBookingSummaryColumn();
    switchUserTab('user-payment-gateway');
  };

  function renderLiveBookingSummaryColumn() {
    const summaryCol = document.getElementById('liveBookingDetailsSummary');
    if (!summaryCol || !AppState.selectedFlight) return;

    const flight = AppState.selectedFlight;
    const pass = AppState.passengerDetails;
    const baseFare = AppState.searchQuery.travelClass === 'Business' ? flight.businessFare : flight.economyFare;
    const gst = IndianLocaleUtils.calculateGST(baseFare);

    summaryCol.innerHTML = `
      <div class="booking-ticket-summary-column h-100">
        <h5 class="fw-bold font-heading text-primary border-bottom pb-2 mb-3">
          <i class="bi bi-card-checklist text-saffron me-2"></i>Booking Details Column
        </h5>
        
        <div class="mb-3">
          <small class="text-muted d-block font-heading">PASSENGER NAME</small>
          <h6 class="fw-bold text-dark mb-0">${pass.name} (${pass.gender}, ${pass.age} yrs)</h6>
          <small class="text-muted">Aadhaar: ${pass.aadhaarNo} • Mob: ${pass.phone}</small>
        </div>

        <div class="mb-3">
          <small class="text-muted d-block font-heading">FLIGHT & ROUTE</small>
          <h6 class="fw-bold text-saffron mb-0">${flight.airline} (${flight.flightNo})</h6>
          <small class="text-dark fw-semibold">${flight.fromCity} (${flight.fromCode}) → ${flight.toCity} (${flight.toCode})</small>
        </div>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <small class="text-muted d-block font-heading">SEAT NO</small>
            <span class="badge bg-saffron text-light px-2 py-1 font-heading fs-6">${AppState.selectedSeat || '14A'}</span>
          </div>
          <div class="col-6">
            <small class="text-muted d-block font-heading">CLASS</small>
            <span class="badge bg-navy text-light px-2 py-1 font-heading">${AppState.searchQuery.travelClass}</span>
          </div>
        </div>

        <div class="mb-3">
          <small class="text-muted d-block font-heading">ADD-ONS</small>
          <small class="d-block">• Meal: ${pass.mealChoice}</small>
          <small class="d-block">• Baggage: ${pass.baggageKg}</small>
        </div>

        <hr>

        <div class="d-flex justify-content-between small mb-1">
          <span>Base Ticket Fare:</span>
          <span>${IndianLocaleUtils.formatINR(baseFare)}</span>
        </div>
        <div class="d-flex justify-content-between small mb-1">
          <span>CGST (9%):</span>
          <span>${IndianLocaleUtils.formatINR(gst.cgst)}</span>
        </div>
        <div class="d-flex justify-content-between small mb-1">
          <span>SGST (9%):</span>
          <span>${IndianLocaleUtils.formatINR(gst.sgst)}</span>
        </div>
        <div class="d-flex justify-content-between border-top pt-2 mt-2">
          <span class="fw-bold font-heading fs-5">Total Payable:</span>
          <span class="fw-bold font-heading text-saffron fs-5">${IndianLocaleUtils.formatINR(gst.grandTotal)}</span>
        </div>
      </div>
    `;
  }

  window.selectPaymentTab = function (method) {
    document.querySelectorAll('.payment-tab-content').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.payment-tab-btn').forEach(el => el.classList.remove('active'));

    document.getElementById('payTab-' + method).classList.remove('d-none');
    document.getElementById('btnPayTab-' + method).classList.add('active');
  };

  // Fake Paid Payment Animation
  window.processPayment = function (paymentMethodName) {
    if (!AppState.selectedFlight || !AppState.selectedSeat) {
      alert('Booking session expired. Please re-select your flight.');
      switchUserTab('user-overview');
      return;
    }

    const loaderModal = new bootstrap.Modal(document.getElementById('paymentLoaderModal'));
    loaderModal.show();

    const statusText = document.getElementById('paymentLoaderStatus');
    statusText.innerHTML = `Connecting to Indian Banking Gateway...`;

    setTimeout(() => {
      statusText.innerHTML = `Processing ${paymentMethodName} Payment...`;
    }, 1000);

    setTimeout(() => {
      statusText.innerHTML = `<i class="bi bi-check-circle-fill text-success fs-1 d-block mb-2"></i> Payment Verified! Generating Boarding Pass PNR...`;
    }, 2200);

    setTimeout(() => {
      loaderModal.hide();

      const flight = AppState.selectedFlight;
      const baseFare = AppState.searchQuery.travelClass === 'Business' ? flight.businessFare : flight.economyFare;
      const gst = IndianLocaleUtils.calculateGST(baseFare);
      const pnr = IndianLocaleUtils.generatePNR();

      const newBooking = {
        pnr: pnr,
        userEmail: AppState.currentUser.email,
        passengerName: AppState.passengerDetails.name,
        gender: AppState.passengerDetails.gender,
        age: AppState.passengerDetails.age,
        phone: AppState.passengerDetails.phone,
        email: AppState.passengerDetails.email,
        aadhaarNo: AppState.passengerDetails.aadhaarNo,
        flightNo: flight.flightNo,
        airline: flight.airline,
        fromCity: `${flight.fromCity} (${flight.fromCode})`,
        toCity: `${flight.toCity} (${flight.toCode})`,
        travelDate: IndianLocaleUtils.formatDate(AppState.searchQuery.travelDate),
        departureTime: IndianLocaleUtils.formatTime(flight.departureTime),
        arrivalTime: IndianLocaleUtils.formatTime(flight.arrivalTime),
        seatNo: AppState.selectedSeat,
        travelClass: AppState.searchQuery.travelClass,
        mealChoice: AppState.passengerDetails.mealChoice,
        baggageKg: AppState.passengerDetails.baggageKg,
        baseFare: baseFare,
        cgst: gst.cgst,
        sgst: gst.sgst,
        totalFare: gst.grandTotal,
        paymentMethod: paymentMethodName,
        bookingDate: IndianLocaleUtils.formatDate(new Date()),
        status: 'Confirmed'
      };

      const bookings = getBookings();
      bookings.unshift(newBooking);
      saveBookings(bookings);

      AppState.lastGeneratedPNR = pnr;
      switchUserTab('user-ticket-view');
    }, 3200);
  };

  /* ==========================================================================
     Ticket View & Printing Engine
     ========================================================================== */

  function renderTicketView() {
    const ticketContainer = document.getElementById('ticketDetailsContainer');
    if (!ticketContainer) return;

    const bookings = getBookings();
    const currentPNR = AppState.lastGeneratedPNR || (bookings.length > 0 ? bookings[0].pnr : null);
    const ticket = bookings.find(b => b.pnr === currentPNR) || bookings[0];

    if (!ticket) {
      ticketContainer.innerHTML = `<div class="alert alert-warning">No booking ticket found.</div>`;
      return;
    }

    ticketContainer.innerHTML = `
      <div id="printableArea" class="ticket-card my-3">
        <div class="ticket-header d-flex justify-content-between align-items-center">
          <div>
            <h4 class="mb-0 fw-bold font-heading">AeroBharat Boarding Pass & Tax Invoice</h4>
            <small class="text-saffron">GSTIN: 07AAAAA0000A1Z5 • Government of India Compliant</small>
          </div>
          <div class="text-end">
            <span class="badge bg-saffron text-light px-3 py-2 fs-6 font-heading">PNR: ${ticket.pnr}</span>
          </div>
        </div>

        <div class="ticket-body">
          <div class="row align-items-center mb-4">
            <div class="col-md-4">
              <span class="text-muted d-block small font-heading">PASSENGER DETAILS</span>
              <h5 class="fw-bold font-heading text-primary">${ticket.passengerName}</h5>
              <small class="text-muted">${ticket.gender}, ${ticket.age} yrs • Aadhaar: ${ticket.aadhaarNo}</small>
            </div>
            <div class="col-md-4 text-md-center">
              <span class="text-muted d-block small font-heading">AIRLINE & FLIGHT</span>
              <h5 class="fw-bold font-heading text-saffron">${ticket.airline} (${ticket.flightNo})</h5>
              <small class="badge bg-light text-dark border">${ticket.travelClass} Class</small>
            </div>
            <div class="col-md-4 text-md-end">
              <span class="text-muted d-block small font-heading">CONFIRMED SEAT</span>
              <h4 class="fw-bold font-heading text-success mb-0">Seat ${ticket.seatNo}</h4>
              <small class="text-muted">Terminal 3 (Domestic)</small>
            </div>
          </div>

          <div class="flight-route-display bg-light p-3 rounded-3 mb-4">
            <div class="text-start">
              <small class="text-muted font-heading">DEPARTURE</small>
              <h4 class="fw-bold font-heading mb-0">${ticket.departureTime}</h4>
              <p class="mb-0 fw-semibold text-primary">${ticket.fromCity}</p>
              <small class="text-muted">Date: ${ticket.travelDate}</small>
            </div>

            <div class="flight-line">
              <span class="flight-line-icon"><i class="bi bi-airplane-fill"></i></span>
            </div>

            <div class="text-end">
              <small class="text-muted font-heading">ARRIVAL</small>
              <h4 class="fw-bold font-heading mb-0">${ticket.arrivalTime}</h4>
              <p class="mb-0 fw-semibold text-primary">${ticket.toCity}</p>
              <small class="text-muted">Date: ${ticket.travelDate}</small>
            </div>
          </div>

          <div class="row align-items-center">
            <div class="col-md-8">
              <h6 class="fw-bold font-heading mb-2">Tax Invoice & Fare Breakdown (INR)</h6>
              <table class="table table-sm table-borderless small mb-0">
                <tr>
                  <td>Base Ticket Fare:</td>
                  <td class="text-end fw-semibold">${IndianLocaleUtils.formatINR(ticket.baseFare)}</td>
                </tr>
                <tr>
                  <td>CGST (9%):</td>
                  <td class="text-end text-muted">${IndianLocaleUtils.formatINR(ticket.cgst)}</td>
                </tr>
                <tr>
                  <td>SGST (9%):</td>
                  <td class="text-end text-muted">${IndianLocaleUtils.formatINR(ticket.sgst)}</td>
                </tr>
                <tr class="border-top">
                  <td class="fw-bold">Total Paid:</td>
                  <td class="text-end fw-bold text-saffron fs-6">${IndianLocaleUtils.formatINR(ticket.totalFare)}</td>
                </tr>
              </table>
              <small class="text-muted d-block mt-2">Payment via ${ticket.paymentMethod} • Meal: ${ticket.mealChoice}</small>
            </div>

            <div class="col-md-4 text-center">
              <div class="qr-code-box">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PNR:${ticket.pnr}" alt="PNR QR Code" class="img-fluid mb-2">
                <small class="d-block text-muted font-heading">Scan at Gate for Mobile Pass</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-2 no-print mt-3">
        <button class="btn btn-outline-secondary" onclick="switchUserTab('user-my-tickets')"><i class="bi bi-arrow-left me-1"></i> My Bookings</button>
        <button class="btn btn-saffron" onclick="window.print()"><i class="bi bi-printer me-1"></i> Print / Save PDF Ticket</button>
      </div>
    `;
  }

  /* ==========================================================================
     User Dashboard Navigation Manager
     ========================================================================== */

  window.switchUserTab = function (tabId) {
    AppState.activeUserTab = tabId;

    document.querySelectorAll('.user-tab-content').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('#userSidebarNav .nav-link').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(tabId);
    if (target) target.classList.remove('d-none');

    const activeLink = document.querySelector(`#userSidebarNav .nav-link[onclick*="${tabId}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (tabId === 'user-overview') {
      renderUserOverview();
    } else if (tabId === 'user-flight-results') {
      renderSearchFlightResults();
    } else if (tabId === 'user-seat-selection') {
      renderSeatSelector();
    } else if (tabId === 'user-passenger-details') {
      prefillPassengerForm();
    } else if (tabId === 'user-ticket-view') {
      renderTicketView();
    } else if (tabId === 'user-my-tickets') {
      renderMyTickets();
    } else if (tabId === 'user-profile') {
      renderUserProfile();
    }
  };

  function renderUserProfile() {
    if (!AppState.currentUser) return;
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    const phoneEl = document.getElementById('profilePhone');
    const locEl = document.getElementById('profileLocation');

    if (nameEl) nameEl.value = AppState.currentUser.name || '';
    if (emailEl) emailEl.value = AppState.currentUser.email || '';
    if (phoneEl) phoneEl.value = AppState.currentUser.phone || '+91 98765 43210';
    if (locEl) locEl.value = (AppState.currentUser.pin || '560001') + ' - ' + (AppState.currentUser.city || 'Bengaluru');
  }

  function prefillPassengerForm() {
    if (!AppState.currentUser) return;
    const passName = document.getElementById('passName');
    const passEmail = document.getElementById('passEmail');
    const passPhone = document.getElementById('passPhone');
    if (passName) passName.value = AppState.currentUser.name || 'Ananya Sharma';
    if (passEmail) passEmail.value = AppState.currentUser.email || 'user@aerobharat.in';
    if (passPhone && AppState.currentUser.phone) passPhone.value = AppState.currentUser.phone;
  }

  function renderUserOverview() {
    const overviewContainer = document.getElementById('userOverviewContainer');
    if (!overviewContainer) return;

    const bookings = getBookings().filter(b => b.userEmail === (AppState.currentUser ? AppState.currentUser.email : 'user@aerobharat.in'));

    overviewContainer.innerHTML = `
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="metric-card">
            <div class="metric-icon bg-primary text-light"><i class="bi bi-ticket-perforated"></i></div>
            <div>
              <h3 class="fw-bold font-heading mb-0">${bookings.length}</h3>
              <span class="text-muted small">Total Flight Tickets</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="metric-card">
            <div class="metric-icon bg-success text-light"><i class="bi bi-currency-rupee"></i></div>
            <div>
              <h3 class="fw-bold font-heading mb-0">${IndianLocaleUtils.formatINR(bookings.reduce((sum, b) => sum + b.totalFare, 0))}</h3>
              <span class="text-muted small">Total Spent</span>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="metric-card">
            <div class="metric-icon bg-warning text-dark"><i class="bi bi-star-fill"></i></div>
            <div>
              <h3 class="fw-bold font-heading mb-0">1,250</h3>
              <span class="text-muted small">AeroMiles Rewards</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card card-custom p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold font-heading mb-0"><i class="bi bi-clock-history me-2 text-saffron"></i>Recent Bookings</h5>
          <button class="btn btn-sm btn-outline-primary" onclick="switchUserTab('user-my-tickets')">View All</button>
        </div>
        ${
          bookings.length === 0
            ? `<p class="text-muted">No flight bookings found yet. Book your first flight today!</p>`
            : `<div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th>PNR</th>
                      <th>Flight</th>
                      <th>Route</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${bookings
                      .slice(0, 3)
                      .map(
                        b => `
                      <tr>
                        <td class="fw-bold text-saffron">${b.pnr}</td>
                        <td>${b.airline} (${b.flightNo})</td>
                        <td>${b.fromCity} → ${b.toCity}</td>
                        <td>${b.travelDate}</td>
                        <td class="fw-semibold">${IndianLocaleUtils.formatINR(b.totalFare)}</td>
                        <td><span class="badge ${b.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}">${b.status}</span></td>
                        <td><button class="btn btn-sm btn-navy" onclick="viewTicketPNR('${b.pnr}')">View Ticket</button></td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>`
        }
      </div>
    `;
  }

  window.viewTicketPNR = function (pnr) {
    AppState.lastGeneratedPNR = pnr;
    switchUserTab('user-ticket-view');
  };

  function renderMyTickets() {
    const listContainer = document.getElementById('myTicketsTableBody');
    if (!listContainer) return;

    const bookings = getBookings().filter(b => b.userEmail === (AppState.currentUser ? AppState.currentUser.email : 'user@aerobharat.in'));

    if (bookings.length === 0) {
      listContainer.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No flight bookings recorded.</td></tr>`;
      return;
    }

    listContainer.innerHTML = bookings
      .map(
        b => `
      <tr>
        <td class="fw-bold text-saffron">${b.pnr}</td>
        <td>
          <div class="fw-semibold">${b.passengerName}</div>
          <small class="text-muted">${b.seatNo} • ${b.travelClass}</small>
        </td>
        <td>${b.airline} (${b.flightNo})</td>
        <td>${b.fromCity} → ${b.toCity}</td>
        <td>${b.travelDate}</td>
        <td class="fw-bold">${IndianLocaleUtils.formatINR(b.totalFare)}</td>
        <td>
          ${
            b.status === 'Cancelled'
              ? `<span class="badge bg-danger">Cancelled</span>`
              : `<div class="btn-group btn-group-sm">
                  <button class="btn btn-outline-primary" onclick="viewTicketPNR('${b.pnr}')"><i class="bi bi-eye"></i> Ticket</button>
                  <button class="btn btn-outline-danger" onclick="promptCancelTicket('${b.pnr}')"><i class="bi bi-x-circle"></i> Cancel</button>
                </div>`
          }
        </td>
      </tr>
    `
      )
      .join('');
  }

  window.promptCancelTicket = function (pnr) {
    const bookings = getBookings();
    const ticket = bookings.find(b => b.pnr === pnr);

    if (!ticket) return;

    const cancellationFee = 1200;
    const refundAmount = Math.max(0, ticket.totalFare - cancellationFee);

    if (confirm(`Cancel Booking for PNR: ${pnr}?\n\nOriginal Fare: ${IndianLocaleUtils.formatINR(ticket.totalFare)}\nCancellation Charge: ${IndianLocaleUtils.formatINR(cancellationFee)}\nRefund to Original Mode (${ticket.paymentMethod}): ${IndianLocaleUtils.formatINR(refundAmount)}`)) {
      ticket.status = 'Cancelled';
      saveBookings(bookings);
      alert(`Booking ${pnr} successfully cancelled. Refund of ${IndianLocaleUtils.formatINR(refundAmount)} initiated.`);
      renderMyTickets();
    }
  };

  /* ==========================================================================
     Admin Dashboard Engine
     ========================================================================== */

  window.switchAdminTab = function (tabId) {
    AppState.activeAdminTab = tabId;

    document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('#adminSidebarNav .nav-link').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(tabId);
    if (target) target.classList.remove('d-none');

    const activeLink = document.querySelector(`#adminSidebarNav .nav-link[onclick*="${tabId}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (tabId === 'admin-overview') {
      renderAdminAnalytics();
    } else if (tabId === 'admin-manage-flights') {
      renderAdminFlightTable();
    } else if (tabId === 'admin-users') {
      renderAdminUsersTable();
    } else if (tabId === 'admin-reports') {
      renderAdminReports();
    }
  };

  function renderAdminAnalytics() {
    if (typeof Chart === 'undefined') return;

    const ctxRevenue = document.getElementById('adminRevenueChart');
    const ctxRoute = document.getElementById('adminRouteChart');

    if (ctxRevenue) {
      if (AppState.revenueChartInstance) AppState.revenueChartInstance.destroy();
      AppState.revenueChartInstance = new Chart(ctxRevenue, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [
            {
              label: 'Monthly Revenue (in Lakhs ₹)',
              data: window.AeroBharatData.adminStats.monthlyRevenueData,
              borderColor: '#f97316',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: { responsive: true, plugins: { legend: { display: true } } }
      });
    }

    if (ctxRoute) {
      if (AppState.routeChartInstance) AppState.routeChartInstance.destroy();
      AppState.routeChartInstance = new Chart(ctxRoute, {
        type: 'doughnut',
        data: {
          labels: Object.keys(window.AeroBharatData.adminStats.routeShare),
          datasets: [
            {
              data: Object.values(window.AeroBharatData.adminStats.routeShare),
              backgroundColor: ['#0f172a', '#f97316', '#2563eb', '#10b981', '#cbd5e1']
            }
          ]
        },
        options: { responsive: true }
      });
    }
  }

  function renderAdminFlightTable() {
    const tableBody = document.getElementById('adminFlightsTableBody');
    if (!tableBody) return;

    const flights = getFlights();
    tableBody.innerHTML = flights
      .map(
        f => `
      <tr>
        <td class="fw-bold font-heading text-saffron">${f.flightNo}</td>
        <td>${f.airline}</td>
        <td>${f.fromCity} (${f.fromCode}) → ${f.toCity} (${f.toCode})</td>
        <td>${IndianLocaleUtils.formatTime(f.departureTime)} - ${IndianLocaleUtils.formatTime(f.arrivalTime)}</td>
        <td class="fw-semibold">${IndianLocaleUtils.formatINR(f.economyFare)}</td>
        <td><span class="badge bg-info text-dark">${f.availableSeats}/${f.totalSeats}</span></td>
        <td><span class="badge ${f.status.includes('Delayed') ? 'bg-warning text-dark' : 'bg-success'}">${f.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteAdminFlight('${f.id}')"><i class="bi bi-trash"></i></button>
        </td>
      </tr>
    `
      )
      .join('');
  }

  window.openAddFlightModal = function () {
    const modalEl = new bootstrap.Modal(document.getElementById('addFlightModal'));
    modalEl.show();
  };

  window.handleAddFlightSubmit = function (e) {
    e.preventDefault();
    const flights = getFlights();
    const newFlight = {
      id: 'FL-' + Math.floor(100 + Math.random() * 900),
      flightNo: document.getElementById('addFlightNo').value,
      airline: document.getElementById('addAirline').value,
      airlineLogo: '✈️',
      fromCode: document.getElementById('addFromCode').value,
      fromCity: document.getElementById('addFromCode').options[document.getElementById('addFromCode').selectedIndex].text.split(' ')[0],
      toCode: document.getElementById('addToCode').value,
      toCity: document.getElementById('addToCode').options[document.getElementById('addToCode').selectedIndex].text.split(' ')[0],
      departureTime: document.getElementById('addDepTime').value,
      arrivalTime: document.getElementById('addArrTime').value,
      duration: '2h 15m',
      economyFare: parseInt(document.getElementById('addFare').value, 10),
      businessFare: parseInt(document.getElementById('addFare').value, 10) * 2.5,
      totalSeats: 180, availableSeats: 180, status: 'On Time', aircraft: 'Airbus A320neo'
    };

    flights.unshift(newFlight);
    saveFlights(flights);

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('addFlightModal'));
    if (modalInstance) modalInstance.hide();
    alert('Flight Schedule Added Successfully!');
    renderAdminFlightTable();
  };

  window.deleteAdminFlight = function (id) {
    if (confirm('Are you sure you want to remove this flight schedule?')) {
      const flights = getFlights().filter(f => f.id !== id);
      saveFlights(flights);
      renderAdminFlightTable();
    }
  };

  function renderAdminUsersTable() {
    const body = document.getElementById('adminUsersTableBody');
    if (!body) return;

    const users = getUsers();
    body.innerHTML = users
      .map(
        u => `
      <tr>
        <td class="fw-bold">${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.phone}</td>
        <td>${u.city}, ${u.pin}</td>
        <td><span class="badge ${u.role === 'Admin' ? 'bg-primary' : 'bg-secondary'}">${u.role}</span></td>
        <td><span class="badge bg-success">${u.status}</span></td>
      </tr>
    `
      )
      .join('');
  }

  function renderAdminReports() {
    const reportBody = document.getElementById('adminReportsTableBody');
    if (!reportBody) return;

    const bookings = getBookings();
    reportBody.innerHTML = bookings
      .map(
        b => `
      <tr>
        <td class="fw-bold text-saffron">${b.pnr}</td>
        <td>${b.passengerName}</td>
        <td>${b.airline} (${b.flightNo})</td>
        <td>${b.bookingDate}</td>
        <td>${b.paymentMethod}</td>
        <td class="fw-bold">${IndianLocaleUtils.formatINR(b.totalFare)}</td>
      </tr>
    `
      )
      .join('');
  }

  window.exportCSVReport = function () {
    const bookings = getBookings();
    let csv = 'PNR,Passenger,Airline,FlightNo,TravelDate,TotalFareINR,Status\n';
    bookings.forEach(b => {
      csv += `"${b.pnr}","${b.passengerName}","${b.airline}","${b.flightNo}","${b.travelDate}",${b.totalFare},"${b.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AeroBharat_Revenue_Report.csv';
    a.click();
  };

  // Initial View Trigger
  navigateTo('public-home');
});
