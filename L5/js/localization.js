/**
 * AeroBharat - Indian Localization Helper Utility
 * Handles Indian Rupee formatting (en-IN), DD/MM/YYYY date formatting,
 * 12-hour AM/PM time formatting, Indian Phone/PIN validation, GST calculations.
 */

window.IndianLocaleUtils = {
  /**
   * Formats a numeric value as Indian Rupees (₹) using Indian Numbering system (Lakhs/Crores)
   * Example: 499 -> ₹499, 1250 -> ₹1,250, 150000 -> ₹1,50,000
   */
  formatINR: function (amount) {
    if (isNaN(amount) || amount === null) return '₹0';
    var num = Math.round(Number(amount));
    var formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(num);
    return '₹' + formatted;
  },

  /**
   * Formats a date string (YYYY-MM-DD or Date object) to Indian standard DD/MM/YYYY
   */
  formatDate: function (dateInput) {
    if (!dateInput) return '15/08/2026';
    var d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      // If it's already a string in DD/MM/YYYY or YYYY-MM-DD
      var parts = String(dateInput).split('-');
      if (parts.length === 3) {
        return parts[2] + '/' + parts[1] + '/' + parts[0];
      }
      return String(dateInput);
    }
    var day = String(d.getDate()).padStart(2, '0');
    var month = String(d.getMonth() + 1).padStart(2, '0');
    var year = d.getFullYear();
    return day + '/' + month + '/' + year;
  },

  /**
   * Formats a time string (e.g. "06:30" or "18:45") to 12-hour format with AM/PM
   */
  formatTime: function (timeStr) {
    if (!timeStr) return '09:00 AM';
    var parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;
    var hours = parseInt(parts[0], 10);
    var minutes = parts[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    var strHours = hours < 10 ? '0' + hours : hours;
    return strHours + ':' + minutes + ' ' + ampm;
  },

  /**
   * Generates realistic Indian Airline PNR code (e.g., AB-982415)
   */
  generatePNR: function () {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var pnr = 'AB-';
    for (var i = 0; i < 6; i++) {
      pnr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pnr;
  },

  /**
   * Calculate GST Breakdown (18% Total: 9% CGST + 9% SGST)
   */
  calculateGST: function (basePrice) {
    var cgst = Math.round(basePrice * 0.09);
    var sgst = Math.round(basePrice * 0.09);
    var totalGst = cgst + sgst;
    var grandTotal = basePrice + totalGst;
    return {
      basePrice: basePrice,
      cgst: cgst,
      sgst: sgst,
      totalGst: totalGst,
      grandTotal: grandTotal
    };
  },

  /**
   * Validate Indian Mobile Number (10 digits starting with 6-9)
   */
  validateMobile: function (phone) {
    var clean = String(phone).replace(/\D/g, '');
    return /^[6-9]\d{9}$/.test(clean);
  },

  /**
   * Validate 6-digit Indian PIN Code
   */
  validatePIN: function (pin) {
    return /^[1-9][0-9]{5}$/.test(String(pin).trim());
  }
};
