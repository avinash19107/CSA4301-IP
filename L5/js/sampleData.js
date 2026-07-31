/**
 * AeroBharat - Comprehensive Indian Sample Data
 * Contains Airports, Indian Airlines, Extensive Flight Schedules for ALL 10 Airports,
 * Pre-filled Bookings, Demo Credentials, and Analytics Metrics.
 */

window.AeroBharatData = {
  // 10 Major Indian Airports
  airports: [
    { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', state: 'Delhi', pin: '110037' },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Airport', city: 'Mumbai', state: 'Maharashtra', pin: '400099' },
    { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', state: 'Karnataka', pin: '560300' },
    { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', state: 'Tamil Nadu', pin: '600027' },
    { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', state: 'Telangana', pin: '500108' },
    { code: 'CCU', name: 'Netaji Subhash Chandra Bose Airport', city: 'Kolkata', state: 'West Bengal', pin: '700052' },
    { code: 'PNQ', name: 'Pune International Airport', city: 'Pune', state: 'Maharashtra', pin: '411032' },
    { code: 'GOI', name: 'Manohar International Airport', city: 'Goa', state: 'Goa', pin: '403512' },
    { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', state: 'Rajasthan', pin: '302011' },
    { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', state: 'Kerala', pin: '683111' }
  ],

  // Flight database connecting ALL airports
  flights: [
    // DEL Outbound
    { id: 'FL-101', flightNo: '6E-2041', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '06:15', arrivalTime: '09:00', duration: '2h 45m', economyFare: 5499, businessFare: 14999, totalSeats: 180, availableSeats: 42, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-102', flightNo: 'AI-506', airline: 'Air India', airlineLogo: '🚩', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'BOM', toCity: 'Mumbai', departureTime: '08:30', arrivalTime: '10:45', duration: '2h 15m', economyFare: 4899, businessFare: 13500, totalSeats: 160, availableSeats: 18, status: 'On Time', aircraft: 'Boeing 787 Dreamliner' },
    { id: 'FL-103', flightNo: 'UK-815', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'MAA', toCity: 'Chennai', departureTime: '09:45', arrivalTime: '12:30', duration: '2h 45m', economyFare: 5299, businessFare: 14200, totalSeats: 150, availableSeats: 35, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-104', flightNo: 'QP-1102', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'HYD', toCity: 'Hyderabad', departureTime: '11:15', arrivalTime: '13:30', duration: '2h 15m', economyFare: 4399, businessFare: 11900, totalSeats: 189, availableSeats: 60, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },
    { id: 'FL-105', flightNo: '6E-552', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'CCU', toCity: 'Kolkata', departureTime: '13:00', arrivalTime: '15:15', duration: '2h 15m', economyFare: 4999, businessFare: 12999, totalSeats: 180, availableSeats: 54, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-106', flightNo: 'SG-402', airline: 'SpiceJet', airlineLogo: '🌶️', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'GOI', toCity: 'Goa', departureTime: '14:45', arrivalTime: '17:15', duration: '2h 30m', economyFare: 6299, businessFare: 16499, totalSeats: 180, availableSeats: 12, status: 'Delayed (20m)', aircraft: 'Boeing 737-800' },
    { id: 'FL-107', flightNo: 'AI-840', airline: 'Air India', airlineLogo: '🚩', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'PNQ', toCity: 'Pune', departureTime: '16:30', arrivalTime: '18:35', duration: '2h 05m', economyFare: 4699, businessFare: 12400, totalSeats: 160, availableSeats: 29, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-108', flightNo: '6E-312', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'JAI', toCity: 'Jaipur', departureTime: '18:10', arrivalTime: '19:05', duration: '0h 55m', economyFare: 2499, businessFare: 6999, totalSeats: 180, availableSeats: 80, status: 'On Time', aircraft: 'ATR 72-600' },
    { id: 'FL-109', flightNo: 'UK-871', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'DEL', fromCity: 'Delhi', toCode: 'COK', toCity: 'Kochi', departureTime: '19:50', arrivalTime: '23:05', duration: '3h 15m', economyFare: 6899, businessFare: 17999, totalSeats: 150, availableSeats: 22, status: 'On Time', aircraft: 'Airbus A320neo' },

    // BOM Outbound
    { id: 'FL-201', flightNo: 'AI-602', airline: 'Air India', airlineLogo: '🚩', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'DEL', toCity: 'Delhi', departureTime: '07:00', arrivalTime: '09:15', duration: '2h 15m', economyFare: 4899, businessFare: 13500, totalSeats: 160, availableSeats: 15, status: 'On Time', aircraft: 'Boeing 787 Dreamliner' },
    { id: 'FL-202', flightNo: '6E-415', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '08:45', arrivalTime: '10:30', duration: '1h 45m', economyFare: 3799, businessFare: 9999, totalSeats: 180, availableSeats: 48, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-203', flightNo: 'QP-1304', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'MAA', toCity: 'Chennai', departureTime: '10:15', arrivalTime: '12:10', duration: '1h 55m', economyFare: 3999, businessFare: 10500, totalSeats: 189, availableSeats: 70, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },
    { id: 'FL-204', flightNo: '6E-618', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'HYD', toCity: 'Hyderabad', departureTime: '12:00', arrivalTime: '13:25', duration: '1h 25m', economyFare: 3299, businessFare: 8999, totalSeats: 180, availableSeats: 32, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-205', flightNo: 'UK-772', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'CCU', toCity: 'Kolkata', departureTime: '14:10', arrivalTime: '16:45', duration: '2h 35m', economyFare: 5499, businessFare: 14500, totalSeats: 150, availableSeats: 40, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-206', flightNo: 'SG-291', airline: 'SpiceJet', airlineLogo: '🌶️', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'GOI', toCity: 'Goa', departureTime: '16:00', arrivalTime: '17:10', duration: '1h 10m', economyFare: 2999, businessFare: 7999, totalSeats: 180, availableSeats: 25, status: 'On Time', aircraft: 'Boeing 737-800' },
    { id: 'FL-207', flightNo: '6E-188', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'PNQ', toCity: 'Pune', departureTime: '17:45', arrivalTime: '18:35', duration: '0h 50m', economyFare: 2199, businessFare: 5999, totalSeats: 180, availableSeats: 90, status: 'On Time', aircraft: 'ATR 72-600' },
    { id: 'FL-208', flightNo: 'AI-631', airline: 'Air India', airlineLogo: '🚩', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'JAI', toCity: 'Jaipur', departureTime: '19:20', arrivalTime: '21:10', duration: '1h 50m', economyFare: 4199, businessFare: 11200, totalSeats: 160, availableSeats: 38, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-209', flightNo: 'QP-1402', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'BOM', fromCity: 'Mumbai', toCode: 'COK', toCity: 'Kochi', departureTime: '21:15', arrivalTime: '23:10', duration: '1h 55m', economyFare: 4499, businessFare: 11999, totalSeats: 189, availableSeats: 52, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },

    // BLR Outbound
    { id: 'FL-301', flightNo: '6E-112', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'DEL', toCity: 'Delhi', departureTime: '06:00', arrivalTime: '08:45', duration: '2h 45m', economyFare: 5499, businessFare: 14999, totalSeats: 180, availableSeats: 30, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-302', flightNo: 'UK-812', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'BOM', toCity: 'Mumbai', departureTime: '07:45', arrivalTime: '09:30', duration: '1h 45m', economyFare: 3799, businessFare: 9999, totalSeats: 150, availableSeats: 45, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-303', flightNo: 'AI-512', airline: 'Air India', airlineLogo: '🚩', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'MAA', toCity: 'Chennai', departureTime: '09:15', arrivalTime: '10:15', duration: '1h 00m', economyFare: 2899, businessFare: 7499, totalSeats: 160, availableSeats: 62, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-304', flightNo: '6E-724', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'HYD', toCity: 'Hyderabad', departureTime: '11:00', arrivalTime: '12:10', duration: '1h 10m', economyFare: 2999, businessFare: 7999, totalSeats: 180, availableSeats: 50, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-305', flightNo: 'QP-1502', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'CCU', toCity: 'Kolkata', departureTime: '13:15', arrivalTime: '15:45', duration: '2h 30m', economyFare: 5699, businessFare: 14999, totalSeats: 189, availableSeats: 33, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },
    { id: 'FL-306', flightNo: '6E-481', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'GOI', toCity: 'Goa', departureTime: '15:00', arrivalTime: '16:15', duration: '1h 15m', economyFare: 3199, businessFare: 8499, totalSeats: 180, availableSeats: 41, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-307', flightNo: 'SG-109', airline: 'SpiceJet', airlineLogo: '🌶️', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'PNQ', toCity: 'Pune', departureTime: '16:45', arrivalTime: '18:10', duration: '1h 25m', economyFare: 3499, businessFare: 8999, totalSeats: 180, availableSeats: 20, status: 'On Time', aircraft: 'Boeing 737-800' },
    { id: 'FL-308', flightNo: 'AI-588', airline: 'Air India', airlineLogo: '🚩', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'COK', toCity: 'Kochi', departureTime: '18:30', arrivalTime: '19:30', duration: '1h 00m', economyFare: 2799, businessFare: 6999, totalSeats: 160, availableSeats: 58, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-309', flightNo: '6E-904', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'BLR', fromCity: 'Bengaluru', toCode: 'JAI', toCity: 'Jaipur', departureTime: '20:15', arrivalTime: '22:45', duration: '2h 30m', economyFare: 5299, businessFare: 13999, totalSeats: 180, availableSeats: 44, status: 'On Time', aircraft: 'Airbus A320neo' },

    // MAA Outbound
    { id: 'FL-401', flightNo: '6E-315', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'MAA', fromCity: 'Chennai', toCode: 'DEL', toCity: 'Delhi', departureTime: '07:15', arrivalTime: '10:00', duration: '2h 45m', economyFare: 5299, businessFare: 14200, totalSeats: 180, availableSeats: 39, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-402', flightNo: 'AI-430', airline: 'Air India', airlineLogo: '🚩', fromCode: 'MAA', fromCity: 'Chennai', toCode: 'BOM', toCity: 'Mumbai', departureTime: '09:00', arrivalTime: '10:55', duration: '1h 55m', economyFare: 3999, businessFare: 10500, totalSeats: 160, availableSeats: 28, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-403', flightNo: 'UK-835', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'MAA', fromCity: 'Chennai', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '11:00', arrivalTime: '12:00', duration: '1h 00m', economyFare: 2899, businessFare: 7499, totalSeats: 150, availableSeats: 55, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-404', flightNo: '6E-601', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'MAA', fromCity: 'Chennai', toCode: 'HYD', toCity: 'Hyderabad', departureTime: '13:30', arrivalTime: '14:45', duration: '1h 15m', economyFare: 2999, businessFare: 7899, totalSeats: 180, availableSeats: 64, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-405', flightNo: 'QP-1601', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'MAA', fromCity: 'Chennai', toCode: 'CCU', toCity: 'Kolkata', departureTime: '15:40', arrivalTime: '18:00', duration: '2h 20m', economyFare: 4899, businessFare: 12800, totalSeats: 189, availableSeats: 42, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },
    { id: 'FL-406', flightNo: '6E-882', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'MAA', fromCity: 'Chennai', toCode: 'COK', toCity: 'Kochi', departureTime: '18:15', arrivalTime: '19:25', duration: '1h 10m', economyFare: 2799, businessFare: 6999, totalSeats: 180, availableSeats: 71, status: 'On Time', aircraft: 'Airbus A320neo' },

    // HYD Outbound
    { id: 'FL-501', flightNo: '6E-501', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'DEL', toCity: 'Delhi', departureTime: '06:30', arrivalTime: '08:45', duration: '2h 15m', economyFare: 4399, businessFare: 11900, totalSeats: 180, availableSeats: 40, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-502', flightNo: 'AI-615', airline: 'Air India', airlineLogo: '🚩', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'BOM', toCity: 'Mumbai', departureTime: '08:15', arrivalTime: '09:40', duration: '1h 25m', economyFare: 3299, businessFare: 8999, totalSeats: 160, availableSeats: 33, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-503', flightNo: 'UK-860', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '10:30', arrivalTime: '11:40', duration: '1h 10m', economyFare: 2999, businessFare: 7999, totalSeats: 150, availableSeats: 58, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-504', flightNo: 'QP-1204', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'MAA', toCity: 'Chennai', departureTime: '12:45', arrivalTime: '14:00', duration: '1h 15m', economyFare: 2999, businessFare: 7899, totalSeats: 189, availableSeats: 49, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },
    { id: 'FL-505', flightNo: '6E-718', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'CCU', toCity: 'Kolkata', departureTime: '15:10', arrivalTime: '17:15', duration: '2h 05m', economyFare: 4499, businessFare: 11999, totalSeats: 180, availableSeats: 37, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-506', flightNo: 'SG-302', airline: 'SpiceJet', airlineLogo: '🌶️', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'GOI', toCity: 'Goa', departureTime: '17:30', arrivalTime: '18:50', duration: '1h 20m', economyFare: 3699, businessFare: 9499, totalSeats: 180, availableSeats: 19, status: 'On Time', aircraft: 'Boeing 737-800' },
    { id: 'FL-507', flightNo: '6E-419', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'HYD', fromCity: 'Hyderabad', toCode: 'PNQ', toCity: 'Pune', departureTime: '19:40', arrivalTime: '20:55', duration: '1h 15m', economyFare: 3199, businessFare: 8299, totalSeats: 180, availableSeats: 62, status: 'On Time', aircraft: 'Airbus A320neo' },

    // CCU Outbound
    { id: 'FL-601', flightNo: '6E-208', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'CCU', fromCity: 'Kolkata', toCode: 'DEL', toCity: 'Delhi', departureTime: '07:30', arrivalTime: '09:55', duration: '2h 25m', economyFare: 4999, businessFare: 12999, totalSeats: 180, availableSeats: 26, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-602', flightNo: 'AI-771', airline: 'Air India', airlineLogo: '🚩', fromCode: 'CCU', fromCity: 'Kolkata', toCode: 'BOM', toCity: 'Mumbai', departureTime: '09:40', arrivalTime: '12:15', duration: '2h 35m', economyFare: 5499, businessFare: 14500, totalSeats: 160, availableSeats: 21, status: 'On Time', aircraft: 'Boeing 787 Dreamliner' },
    { id: 'FL-603', flightNo: 'UK-732', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'CCU', fromCity: 'Kolkata', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '12:00', arrivalTime: '14:30', duration: '2h 30m', economyFare: 5699, businessFare: 14999, totalSeats: 150, availableSeats: 43, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-604', flightNo: 'QP-1702', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'CCU', fromCity: 'Kolkata', toCode: 'HYD', toCity: 'Hyderabad', departureTime: '14:30', arrivalTime: '16:35', duration: '2h 05m', economyFare: 4499, businessFare: 11999, totalSeats: 189, availableSeats: 55, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },

    // PNQ Outbound
    { id: 'FL-701', flightNo: '6E-344', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'PNQ', fromCity: 'Pune', toCode: 'DEL', toCity: 'Delhi', departureTime: '08:00', arrivalTime: '10:05', duration: '2h 05m', economyFare: 4699, businessFare: 12400, totalSeats: 180, availableSeats: 36, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-702', flightNo: 'AI-851', airline: 'Air India', airlineLogo: '🚩', fromCode: 'PNQ', fromCity: 'Pune', toCode: 'BOM', toCity: 'Mumbai', departureTime: '10:15', arrivalTime: '11:05', duration: '0h 50m', economyFare: 2199, businessFare: 5999, totalSeats: 160, availableSeats: 72, status: 'On Time', aircraft: 'ATR 72-600' },
    { id: 'FL-703', flightNo: 'UK-892', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'PNQ', fromCity: 'Pune', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '13:00', arrivalTime: '14:25', duration: '1h 25m', economyFare: 3499, businessFare: 8999, totalSeats: 150, availableSeats: 48, status: 'On Time', aircraft: 'Airbus A320' },

    // GOI Outbound
    { id: 'FL-801', flightNo: '6E-533', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'GOI', fromCity: 'Goa', toCode: 'DEL', toCity: 'Delhi', departureTime: '09:30', arrivalTime: '12:00', duration: '2h 30m', economyFare: 6299, businessFare: 16499, totalSeats: 180, availableSeats: 15, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-802', flightNo: 'SG-292', airline: 'SpiceJet', airlineLogo: '🌶️', fromCode: 'GOI', fromCity: 'Goa', toCode: 'BOM', toCity: 'Mumbai', departureTime: '11:45', arrivalTime: '12:55', duration: '1h 10m', economyFare: 2999, businessFare: 7999, totalSeats: 180, availableSeats: 29, status: 'On Time', aircraft: 'Boeing 737-800' },
    { id: 'FL-803', flightNo: 'QP-1801', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'GOI', fromCity: 'Goa', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '14:15', arrivalTime: '15:30', duration: '1h 15m', economyFare: 3199, businessFare: 8499, totalSeats: 189, availableSeats: 46, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },

    // JAI Outbound
    { id: 'FL-901', flightNo: '6E-421', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'JAI', fromCity: 'Jaipur', toCode: 'DEL', toCity: 'Delhi', departureTime: '08:30', arrivalTime: '09:25', duration: '0h 55m', economyFare: 2499, businessFare: 6999, totalSeats: 180, availableSeats: 65, status: 'On Time', aircraft: 'ATR 72-600' },
    { id: 'FL-902', flightNo: 'AI-632', airline: 'Air India', airlineLogo: '🚩', fromCode: 'JAI', fromCity: 'Jaipur', toCode: 'BOM', toCity: 'Mumbai', departureTime: '11:00', arrivalTime: '12:50', duration: '1h 50m', economyFare: 4199, businessFare: 11200, totalSeats: 160, availableSeats: 32, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-903', flightNo: '6E-905', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'JAI', fromCity: 'Jaipur', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '15:30', arrivalTime: '18:00', duration: '2h 30m', economyFare: 5299, businessFare: 13999, totalSeats: 180, availableSeats: 41, status: 'On Time', aircraft: 'Airbus A320neo' },

    // COK Outbound
    { id: 'FL-1001', flightNo: 'UK-872', airline: 'Vistara', airlineLogo: '⭐', fromCode: 'COK', fromCity: 'Kochi', toCode: 'DEL', toCity: 'Delhi', departureTime: '09:00', arrivalTime: '12:15', duration: '3h 15m', economyFare: 6899, businessFare: 17999, totalSeats: 150, availableSeats: 18, status: 'On Time', aircraft: 'Airbus A320neo' },
    { id: 'FL-1002', flightNo: 'QP-1403', airline: 'Akasa Air', airlineLogo: '🚀', fromCode: 'COK', fromCity: 'Kochi', toCode: 'BOM', toCity: 'Mumbai', departureTime: '12:30', arrivalTime: '14:25', duration: '1h 55m', economyFare: 4499, businessFare: 11999, totalSeats: 189, availableSeats: 50, status: 'On Time', aircraft: 'Boeing 737 MAX 8' },
    { id: 'FL-1003', flightNo: 'AI-589', airline: 'Air India', airlineLogo: '🚩', fromCode: 'COK', fromCity: 'Kochi', toCode: 'BLR', toCity: 'Bengaluru', departureTime: '15:15', arrivalTime: '16:15', duration: '1h 00m', economyFare: 2799, businessFare: 6999, totalSeats: 160, availableSeats: 60, status: 'On Time', aircraft: 'Airbus A320' },
    { id: 'FL-1004', flightNo: '6E-883', airline: 'IndiGo', airlineLogo: '✈️', fromCode: 'COK', fromCity: 'Kochi', toCode: 'MAA', toCity: 'Chennai', departureTime: '17:45', arrivalTime: '18:55', duration: '1h 10m', economyFare: 2799, businessFare: 6999, totalSeats: 180, availableSeats: 75, status: 'On Time', aircraft: 'Airbus A320neo' }
  ],

  // Pre-filled Bookings
  bookings: [
    {
      pnr: 'AB-8E9124',
      userEmail: 'user@aerobharat.in',
      passengerName: 'Ananya Sharma',
      gender: 'Female',
      age: 28,
      phone: '+91 98765 43210',
      email: 'ananya.sharma@example.in',
      aadhaarNo: 'XXXX-XXXX-4812',
      flightNo: '6E-2041',
      airline: 'IndiGo',
      fromCity: 'Delhi (DEL)',
      toCity: 'Bengaluru (BLR)',
      travelDate: '15/08/2026',
      departureTime: '06:15 AM',
      arrivalTime: '09:00 AM',
      seatNo: '12A',
      travelClass: 'Economy',
      mealChoice: 'Jain Meal',
      baggageKg: '15 Kg',
      baseFare: 5499,
      cgst: 495,
      sgst: 495,
      totalFare: 6489,
      paymentMethod: 'UPI (PhonePe)',
      bookingDate: '30/07/2026',
      status: 'Confirmed'
    },
    {
      pnr: 'AB-3K5910',
      userEmail: 'user@aerobharat.in',
      passengerName: 'Vikramaditya Rao',
      gender: 'Male',
      age: 34,
      phone: '+91 98123 45678',
      email: 'vikram.rao@example.in',
      aadhaarNo: 'XXXX-XXXX-9014',
      flightNo: 'AI-506',
      airline: 'Air India',
      fromCity: 'Mumbai (BOM)',
      toCity: 'Delhi (DEL)',
      travelDate: '20/08/2026',
      departureTime: '08:30 AM',
      arrivalTime: '10:45 AM',
      seatNo: '04C',
      travelClass: 'Business',
      mealChoice: 'Non-Veg Meal',
      baggageKg: '25 Kg',
      baseFare: 13500,
      cgst: 1215,
      sgst: 1215,
      totalFare: 15930,
      paymentMethod: 'HDFC Netbanking',
      bookingDate: '28/07/2026',
      status: 'Confirmed'
    }
  ],

  // Users Demo Data
  users: [
    { id: 'USR-101', name: 'Ananya Sharma', email: 'user@aerobharat.in', phone: '+91 98765 43210', city: 'Bengaluru', state: 'Karnataka', pin: '560001', role: 'User', status: 'Active' },
    { id: 'USR-102', name: 'Rajesh Kumar', email: 'rajesh.k@example.in', phone: '+91 98220 11223', city: 'Delhi', state: 'Delhi', pin: '110001', role: 'User', status: 'Active' },
    { id: 'USR-103', name: 'AeroAdmin Team', email: 'admin@aerobharat.in', phone: '+91 99000 88776', city: 'Mumbai', state: 'Maharashtra', pin: '400001', role: 'Admin', status: 'Active' }
  ],

  feedbacks: [
    { id: 'FB-01', userName: 'Priya Iyer', email: 'priya.i@example.in', rating: 5, category: 'Booking Experience', comment: 'Super easy UPI booking with instant GST invoice and WhatsApp PNR update!', date: '29/07/2026' },
    { id: 'FB-02', userName: 'Rohan Deshmukh', email: 'rohan.d@example.in', rating: 4, category: 'Seat Selection', comment: 'Interactive 3-3 seat layout was smooth and transparent.', date: '27/07/2026' }
  ],

  adminStats: {
    totalRevenueINR: 4850000,
    totalBookings: 1420,
    activeFlightsCount: 52,
    registeredUsersCount: 8950,
    monthlyRevenueData: [32, 41, 38, 52, 64, 78, 85],
    routeShare: {
      'DEL - BLR': 35,
      'BOM - DEL': 28,
      'BLR - MAA': 15,
      'HYD - BOM': 12,
      'Others': 10
    }
  }
};
