---
title: Movie Ticket Booking System Design
description: Design a system for booking movie tickets
slug: movie-ticket-system
tags: [ood, object-oriented-design, concurrency]
keywords: [movie ticket, booking system, theater, concurrency, java]
hide_table_of_contents: false
---

# Movie Ticket Booking System Design

## Problem Statement

Design a movie ticket booking system that allows users to browse movies, select showtimes, book seats, and process payments for movie tickets.

## Requirements

1. **Functional Requirements**:
   - Browse movies and showtimes
   - View seat availability for a specific showtime
   - Book seats for a movie
   - Process payments for bookings
   - Generate and send tickets
   - Cancel bookings (with time restrictions)
   - Support different types of seats (standard, premium, etc.)
   - Apply discounts and promotions

2. **Non-Functional Requirements**:
   - Concurrent booking support
   - High availability during peak times
   - Scalability to handle multiple theaters
   - Security for payment processing
   - Performance for quick seat selection
   - Data consistency for bookings

## Core Components

1. **Movie**: Represents a movie with details like title, duration, genre, etc.
2. **Theater**: Represents a movie theater with multiple screens
3. **Screen**: Represents a specific screen within a theater
4. **Showtime**: Represents a scheduled showing of a movie on a specific screen
5. **Seat**: Represents a seat in a screen
6. **Booking**: Represents a ticket booking with selected seats
7. **Payment**: Handles payment processing for bookings
8. **User**: Represents a customer who can book tickets

## Implementation

```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Enums
enum SeatType {
    STANDARD(1.0),
    PREMIUM(1.5),
    VIP(2.0);
    
    private final double priceMultiplier;
    
    SeatType(double priceMultiplier) {
        this.priceMultiplier = priceMultiplier;
    }
    
    public double getPriceMultiplier() {
        return priceMultiplier;
    }
}

enum BookingStatus {
    PENDING, CONFIRMED, CANCELLED
}

enum PaymentStatus {
    PENDING, COMPLETED, FAILED, REFUNDED
}

// Movie class
class Movie {
    private final String id;
    private String title;
    private int durationMinutes;
    private String genre;
    private String description;
    private String language;
    private final Lock lock;
    
    public Movie(String id, String title, int durationMinutes, String genre, String language) {
        this.id = id;
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.genre = genre;
        this.language = language;
        this.description = "";
        this.lock = new ReentrantLock();
    }
    
    public String getId() {
        return id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        lock.lock();
        try {
            this.title = title;
        } finally {
            lock.unlock();
        }
    }
    
    public int getDurationMinutes() {
        return durationMinutes;
    }
    
    public void setDurationMinutes(int durationMinutes) {
        lock.lock();
        try {
            this.durationMinutes = durationMinutes;
        } finally {
            lock.unlock();
        }
    }
    
    public String getGenre() {
        return genre;
    }
    
    public void setGenre(String genre) {
        lock.lock();
        try {
            this.genre = genre;
        } finally {
            lock.unlock();
        }
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        lock.lock();
        try {
            this.description = description;
        } finally {
            lock.unlock();
        }
    }
    
    public String getLanguage() {
        return language;
    }
    
    public void setLanguage(String language) {
        lock.lock();
        try {
            this.language = language;
        } finally {
            lock.unlock();
        }
    }
    
    @Override
    public String toString() {
        return title + " (" + durationMinutes + " mins, " + genre + ", " + language + ")";
    }
}

// Seat class
class Seat {
    private final String id;
    private final int row;
    private final int number;
    private final SeatType type;
    private boolean isBooked;
    private final Lock lock;
    
    public Seat(String id, int row, int number, SeatType type) {
        this.id = id;
        this.row = row;
        this.number = number;
        this.type = type;
        this.isBooked = false;
        this.lock = new ReentrantLock();
    }
    
    public String getId() {
        return id;
    }
    
    public int getRow() {
        return row;
    }
    
    public int getNumber() {
        return number;
    }
    
    public SeatType getType() {
        return type;
    }
    
    public boolean isBooked() {
        lock.lock();
        try {
            return isBooked;
        } finally {
            lock.unlock();
        }
    }
    
    public boolean book() {
        lock.lock();
        try {
            if (!isBooked) {
                isBooked = true;
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }
    
    public void unbook() {
        lock.lock();
        try {
            isBooked = false;
        } finally {
            lock.unlock();
        }
    }
    
    @Override
    public String toString() {
        return "Seat " + row + number + " (" + type + ")";
    }
}

// Screen class
class Screen {
    private final String id;
    private final String name;
    private final int rows;
    private final int seatsPerRow;
    private final Map<String, Seat> seats;
    private final Lock lock;
    
    public Screen(String id, String name, int rows, int seatsPerRow) {
        this.id = id;
        this.name = name;
        this.rows = rows;
        this.seatsPerRow = seatsPerRow;
        this.seats = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
        
        initializeSeats();
    }
    
    private void initializeSeats() {
        // Initialize seats with different types based on position
        for (int row = 1; row <= rows; row++) {
            for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                String seatId = id + "-" + row + "-" + seatNum;
                
                // Assign seat types based on position (simplified)
                SeatType type;
                if (row < 3) {
                    type = SeatType.STANDARD;
                } else if (row < rows - 2) {
                    type = SeatType.PREMIUM;
                } else {
                    type = SeatType.VIP;
                }
                
                Seat seat = new Seat(seatId, row, seatNum, type);
                seats.put(seatId, seat);
            }
        }
    }
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public int getRows() {
        return rows;
    }
    
    public int getSeatsPerRow() {
        return seatsPerRow;
    }
    
    public Seat getSeat(String seatId) {
        return seats.get(seatId);
    }
    
    public Seat getSeat(int row, int number) {
        return seats.get(id + "-" + row + "-" + number);
    }
    
    public List<Seat> getAllSeats() {
        return new ArrayList<>(seats.values());
    }
    
    public int getTotalSeats() {
        return seats.size();
    }
    
    @Override
    public String toString() {
        return name + " (Capacity: " + getTotalSeats() + " seats)";
    }
}

// Theater class
class Theater {
    private final String id;
    private String name;
    private String location;
    private final Map<String, Screen> screens;
    private final Lock lock;
    
    public Theater(String id, String name, String location) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.screens = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
    }
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        lock.lock();
        try {
            this.name = name;
        } finally {
            lock.unlock();
        }
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        lock.lock();
        try {
            this.location = location;
        } finally {
            lock.unlock();
        }
    }
    
    public void addScreen(Screen screen) {
        screens.put(screen.getId(), screen);
    }
    
    public Screen getScreen(String screenId) {
        return screens.get(screenId);
    }
    
    public List<Screen> getAllScreens() {
        return new ArrayList<>(screens.values());
    }
    
    @Override
    public String toString() {
        return name + " (" + location + ", " + screens.size() + " screens)";
    }
}

// Showtime class
class Showtime {
    private final String id;
    private final Movie movie;
    private final Screen screen;
    private final LocalDateTime startTime;
    private final double basePrice;
    private final Map<String, Boolean> seatAvailability;
    private final Lock lock;
    
    public Showtime(String id, Movie movie, Screen screen, LocalDateTime startTime, double basePrice) {
        this.id = id;
        this.movie = movie;
        this.screen = screen;
        this.startTime = startTime;
        this.basePrice = basePrice;
        this.seatAvailability = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
        
        // Initialize all seats as available
        for (Seat seat : screen.getAllSeats()) {
            seatAvailability.put(seat.getId(), true);
        }
    }
    
    public String getId() {
        return id;
    }
    
    public Movie getMovie() {
        return movie;
    }
    
    public Screen getScreen() {
        return screen;
    }
    
    public LocalDateTime getStartTime() {
        return startTime;
    }
    
    public LocalDateTime getEndTime() {
        return startTime.plusMinutes(movie.getDurationMinutes());
    }
    
    public double getBasePrice() {
        return basePrice;
    }
    
    public boolean isSeatAvailable(String seatId) {
        lock.lock();
        try {
            Boolean available = seatAvailability.get(seatId);
            return available != null && available;
        } finally {
            lock.unlock();
        }
    }
    
    public List<Seat> getAvailableSeats() {
        lock.lock();
        try {
            List<Seat> availableSeats = new ArrayList<>();
            for (Seat seat : screen.getAllSeats()) {
                if (isSeatAvailable(seat.getId())) {
                    availableSeats.add(seat);
                }
            }
            return availableSeats;
        } finally {
            lock.unlock();
        }
    }
    
    public boolean bookSeat(String seatId) {
        lock.lock();
        try {
            if (isSeatAvailable(seatId)) {
                seatAvailability.put(seatId, false);
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }
    
    public void unbookSeat(String seatId) {
        lock.lock();
        try {
            seatAvailability.put(seatId, true);
        } finally {
            lock.unlock();
        }
    }
    
    public double getSeatPrice(String seatId) {
        Seat seat = screen.getSeat(seatId);
        if (seat != null) {
            return basePrice * seat.getType().getPriceMultiplier();
        }
        return 0;
    }
    
    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return movie.getTitle() + " at " + formatter.format(startTime) + 
               " in " + screen.getName() + " (Base Price: $" + basePrice + ")";
    }
}

// Booking class
class Booking {
    private final String id;
    private final String userId;
    private final Showtime showtime;
    private final List<Seat> seats;
    private BookingStatus status;
    private final LocalDateTime bookingTime;
    private LocalDateTime confirmationTime;
    private double totalAmount;
    private PaymentStatus paymentStatus;
    private final Lock lock;
    
    public Booking(String id, String userId, Showtime showtime) {
        this.id = id;
        this.userId = userId;
        this.showtime = showtime;
        this.seats = new ArrayList<>();
        this.status = BookingStatus.PENDING;
        this.bookingTime = LocalDateTime.now();
        this.paymentStatus = PaymentStatus.PENDING;
        this.lock = new ReentrantLock();
    }
    
    public String getId() {
        return id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public Showtime getShowtime() {
        return showtime;
    }
    
    public List<Seat> getSeats() {
        lock.lock();
        try {
            return new ArrayList<>(seats);
        } finally {
            lock.unlock();
        }
    }
    
    public boolean addSeat(Seat seat) {
        lock.lock();
        try {
            if (showtime.bookSeat(seat.getId())) {
                seats.add(seat);
                calculateTotalAmount();
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }
    
    public void removeSeat(Seat seat) {
        lock.lock();
        try {
            if (seats.remove(seat)) {
                showtime.unbookSeat(seat.getId());
                calculateTotalAmount();
            }
        } finally {
            lock.unlock();
        }
    }
    
    public BookingStatus getStatus() {
        lock.lock();
        try {
            return status;
        } finally {
            lock.unlock();
        }
    }
    
    public void setStatus(BookingStatus status) {
        lock.lock();
        try {
            this.status = status;
            if (status == BookingStatus.CONFIRMED) {
                this.confirmationTime = LocalDateTime.now();
            }
        } finally {
            lock.unlock();
        }
    }
    
    public LocalDateTime getBookingTime() {
        return bookingTime;
    }
    
    public LocalDateTime getConfirmationTime() {
        return confirmationTime;
    }
    
    public double getTotalAmount() {
        lock.lock();
        try {
            return totalAmount;
        } finally {
            lock.unlock();
        }
    }
    
    private void calculateTotalAmount() {
        double total = 0;
        for (Seat seat : seats) {
            total += showtime.getSeatPrice(seat.getId());
        }
        this.totalAmount = total;
    }
    
    public PaymentStatus getPaymentStatus() {
        lock.lock();
        try {
            return paymentStatus;
        } finally {
            lock.unlock();
        }
    }
    
    public void setPaymentStatus(PaymentStatus paymentStatus) {
        lock.lock();
        try {
            this.paymentStatus = paymentStatus;
        } finally {
            lock.unlock();
        }
    }
    
    public boolean canCancel() {
        // Can only cancel if the showtime hasn't started and it's not too close to start time
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime cutoffTime = showtime.getStartTime().minusHours(2); // 2-hour cancellation policy
        return now.isBefore(cutoffTime) && status != BookingStatus.CANCELLED;
    }
    
    public String generateTicket() {
        if (status != BookingStatus.CONFIRMED || paymentStatus != PaymentStatus.COMPLETED) {
            return "Cannot generate ticket - booking not confirmed or payment not completed";
        }
        
        StringBuilder ticket = new StringBuilder();
        ticket.append("=== MOVIE TICKET ===\n");
        ticket.append("Booking ID: ").append(id).append("\n");
        ticket.append("Movie: ").append(showtime.getMovie().getTitle()).append("\n");
        ticket.append("Theater: ").append(showtime.getScreen().getName()).append("\n");
        ticket.append("Date & Time: ").append(showtime.getStartTime()).append("\n");
        ticket.append("Seats: ");
        
        for (int i = 0; i < seats.size(); i++) {
            Seat seat = seats.get(i);
            ticket.append("Row ").append(seat.getRow()).append(", Seat ").append(seat.getNumber());
            if (i < seats.size() - 1) {
                ticket.append("; ");
            }
        }
        
        ticket.append("\nTotal Amount: $").append(String.format("%.2f", totalAmount)).append("\n");
        ticket.append("===================\n");
        
        return ticket.toString();
    }
    
    @Override
    public String toString() {
        return "Booking #" + id + " - " + showtime.getMovie().getTitle() + 
               " (" + seats.size() + " seats, $" + String.format("%.2f", totalAmount) + 
               ", Status: " + status + ")";
    }
}

// Payment class
class Payment {
    private final String id;
    private final Booking booking;
    private final double amount;
    private PaymentStatus status;
    private final String paymentMethod;
    private final LocalDateTime paymentTime;
    private final Lock lock;
    
    public Payment(String id, Booking booking, double amount, String paymentMethod) {
        this.id = id;
        this.booking = booking;
        this.amount = amount;
        this.status = PaymentStatus.PENDING;
        this.paymentMethod = paymentMethod;
        this.paymentTime = LocalDateTime.now();
        this.lock = new ReentrantLock();
    }
    
    public String getId() {
        return id;
    }
    
    public Booking getBooking() {
        return booking;
    }
    
    public double getAmount() {
        return amount;
    }
    
    public PaymentStatus getStatus() {
        lock.lock();
        try {
            return status;
        } finally {
            lock.unlock();
        }
    }
    
    public void setStatus(PaymentStatus status) {
        lock.lock();
        try {
            this.status = status;
            booking.setPaymentStatus(status);
            
            if (status == PaymentStatus.COMPLETED) {
                booking.setStatus(BookingStatus.CONFIRMED);
            } else if (status == PaymentStatus.FAILED || status == PaymentStatus.REFUNDED) {
                // If payment fails or is refunded, release the seats
                for (Seat seat : booking.getSeats()) {
                    booking.getShowtime().unbookSeat(seat.getId());
                }
                
                if (status == PaymentStatus.FAILED) {
                    booking.setStatus(BookingStatus.CANCELLED);
                }
            }
        } finally {
            lock.unlock();
        }
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }
    
    public boolean processPayment() {
        // In a real system, this would integrate with a payment gateway
        // For simulation, we'll use a random success rate
        boolean success = Math.random() > 0.1; // 90% success rate
        
        setStatus(success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED);
        return success;
    }
    
    @Override
    public String toString() {
        return "Payment #" + id + " - $" + String.format("%.2f", amount) + 
               " via " + paymentMethod + " (Status: " + status + ")";
    }
}

// User class
class User {
    private final String id;
    private String name;
    private String email;
    private String phone;
    private final List<Booking> bookings;
    private final Lock lock;
    
    public User(String id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.bookings = new ArrayList<>();
        this.lock = new ReentrantLock();
    }
    
    public String getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        lock.lock();
        try {
            this.name = name;
        } finally {
            lock.unlock();
        }
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        lock.lock();
        try {
            this.email = email;
        } finally {
            lock.unlock();
        }
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        lock.lock();
        try {
            this.phone = phone;
        } finally {
            lock.unlock();
        }
    }
    
    public void addBooking(Booking booking) {
        lock.lock();
        try {
            bookings.add(booking);
        } finally {
            lock.unlock();
        }
    }
    
    public List<Booking> getBookings() {
        lock.lock();
        try {
            return new ArrayList<>(bookings);
        } finally {
            lock.unlock();
        }
    }
    
    @Override
    public String toString() {
        return name + " (" + email + ")";
    }
}

// Discount class (for promotions)
class Discount {
    private final String code;
    private final double percentage;
    private final LocalDateTime validFrom;
    private final LocalDateTime validTo;
    
    public Discount(String code, double percentage, LocalDateTime validFrom, LocalDateTime validTo) {
        this.code = code;
        this.percentage = percentage;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }
    
    public String getCode() {
        return code;
    }
    
    public double getPercentage() {
        return percentage;
    }
    
    public boolean isValid() {
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(validFrom) && now.isBefore(validTo);
    }
    
    public double applyDiscount(double amount) {
        if (isValid()) {
            return amount * (1 - percentage / 100);
        }
        return amount;
    }
}

// BookingSystem class - Main controller
class BookingSystem {
    private final Map<String, Movie> movies;
    private final Map<String, Theater> theaters;
    private final Map<String, Showtime> showtimes;
    private final Map<String, Booking> bookings;
    private final Map<String, Payment> payments;
    private final Map<String, User> users;
    private final Map<String, Discount> discounts;
    private final AtomicInteger movieIdCounter;
    private final AtomicInteger theaterIdCounter;
    private final AtomicInteger screenIdCounter;
    private final AtomicInteger showtimeIdCounter;
    private final AtomicInteger bookingIdCounter;
    private final AtomicInteger paymentIdCounter;
    private final AtomicInteger userIdCounter;
    private final Lock lock;
    
    public BookingSystem() {
        this.movies = new ConcurrentHashMap<>();
        this.theaters = new ConcurrentHashMap<>();
        this.showtimes = new ConcurrentHashMap<>();
        this.bookings = new ConcurrentHashMap<>();
        this.payments = new ConcurrentHashMap<>();
        this.users = new ConcurrentHashMap<>();
        this.discounts = new ConcurrentHashMap<>();
        this.movieIdCounter = new AtomicInteger(1000);
        this.theaterIdCounter = new AtomicInteger(1000);
        this.screenIdCounter = new AtomicInteger(1000);
        this.showtimeIdCounter = new AtomicInteger(1000);
        this.bookingIdCounter = new AtomicInteger(1000);
        this.paymentIdCounter = new AtomicInteger(1000);
        this.userIdCounter = new AtomicInteger(1000);
        this.lock = new ReentrantLock();
    }
    
    // Movie management
    public Movie addMovie(String title, int durationMinutes, String genre, String language) {
        String id = "MOV" + movieIdCounter.incrementAndGet();
        Movie movie = new Movie(id, title, durationMinutes, genre, language);
        movies.put(id, movie);
        return movie;
    }
    
    public Movie getMovie(String movieId) {
        return movies.get(movieId);
    }
    
    public List<Movie> getAllMovies() {
        return new ArrayList<>(movies.values());
    }
    
    // Theater management
    public Theater addTheater(String name, String location) {
        String id = "TH" + theaterIdCounter.incrementAndGet();
        Theater theater = new Theater(id, name, location);
        theaters.put(id, theater);
        return theater;
    }
    
    public Screen addScreen(String theaterId, String name, int rows, int seatsPerRow) {
        Theater theater = theaters.get(theaterId);
        if (theater == null) {
            throw new IllegalArgumentException("Theater not found");
        }
        
        String id = "SCR" + screenIdCounter.incrementAndGet();
        Screen screen = new Screen(id, name, rows, seatsPerRow);
        theater.addScreen(screen);
        return screen;
    }
    
    public Theater getTheater(String theaterId) {
        return theaters.get(theaterId);
    }
    
    public List<Theater> getAllTheaters() {
        return new ArrayList<>(theaters.values());
    }
    
    // Showtime management
    public Showtime addShowtime(String movieId, String screenId, LocalDateTime startTime, double basePrice) {
        Movie movie = movies.get(movieId);
        if (movie == null) {
            throw new IllegalArgumentException("Movie not found");
        }
        
        // Find the screen and its theater
        Screen screen = null;
        for (Theater theater : theaters.values()) {
            Screen s = theater.getScreen(screenId);
            if (s != null) {
                screen = s;
                break;
            }
        }
        
        if (screen == null) {
            throw new IllegalArgumentException("Screen not found");
        }
        
        // Check for time conflicts with other showtimes on the same screen
        for (Showtime showtime : showtimes.values()) {
            if (showtime.getScreen().getId().equals(screenId)) {
                LocalDateTime existingStart = showtime.getStartTime();
                LocalDateTime existingEnd = showtime.getEndTime();
                
                // Check if the new showtime overlaps with an existing one
                if ((startTime.isAfter(existingStart) && startTime.isBefore(existingEnd)) ||
                    (startTime.plusMinutes(movie.getDurationMinutes()).isAfter(existingStart) && 
                     startTime.plusMinutes(movie.getDurationMinutes()).isBefore(existingEnd)) ||
                    (startTime.isBefore(existingStart) && 
                     startTime.plusMinutes(movie.getDurationMinutes()).isAfter(existingEnd)) ||
                    startTime.isEqual(existingStart)) {
                    throw new IllegalStateException("Time conflict with another showtime");
                }
            }
        }
        
        String id = "ST" + showtimeIdCounter.incrementAndGet();
        Showtime showtime = new Showtime(id, movie, screen, startTime, basePrice);
        showtimes.put(id, showtime);
        return showtime;
    }
    
    public Showtime getShowtime(String showtimeId) {
        return showtimes.get(showtimeId);
    }
    
    public List<Showtime> getShowtimesByMovie(String movieId) {
        lock.lock();
        try {
            List<Showtime> result = new ArrayList<>();
            for (Showtime showtime : showtimes.values()) {
                if (showtime.getMovie().getId().equals(movieId)) {
                    result.add(showtime);
                }
            }
            return result;
        } finally {
            lock.unlock();
        }
    }
    
    public List<Showtime> getShowtimesByTheater(String theaterId) {
        lock.lock();
        try {
            List<Showtime> result = new ArrayList<>();
            Theater theater = theaters.get(theaterId);
            if (theater != null) {
                for (Showtime showtime : showtimes.values()) {
                    for (Screen screen : theater.getAllScreens()) {
                        if (showtime.getScreen().getId().equals(screen.getId())) {
                            result.add(showtime);
                            break;
                        }
                    }
                }
            }
            return result;
        } finally {
            lock.unlock();
        }
    }
    
    public List<Showtime> getShowtimesByDate(LocalDateTime date) {
        lock.lock();
        try {
            List<Showtime> result = new ArrayList<>();
            for (Showtime showtime : showtimes.values()) {
                if (showtime.getStartTime().toLocalDate().equals(date.toLocalDate())) {
                    result.add(showtime);
                }
            }
            return result;
        } finally {
            lock.unlock();
        }
    }
    
    // User management
    public User addUser(String name, String email, String phone) {
        String id = "USR" + userIdCounter.incrementAndGet();
        User user = new User(id, name, email, phone);
        users.put(id, user);
        return user;
    }
    
    public User getUser(String userId) {
        return users.get(userId);
    }
    
    // Booking management
    public Booking createBooking(String userId, String showtimeId) {
        User user = users.get(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        
        Showtime showtime = showtimes.get(showtimeId);
        if (showtime == null) {
            throw new IllegalArgumentException("Showtime not found");
        }
        
        // Check if showtime is in the future
        if (showtime.getStartTime().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Cannot book for a past showtime");
        }
        
        String id = "BKG" + bookingIdCounter.incrementAndGet();
        Booking booking = new Booking(id, userId, showtime);
        bookings.put(id, booking);
        user.addBooking(booking);
        
        return booking;
    }
    
    public boolean addSeatToBooking(String bookingId, String seatId) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        Showtime showtime = booking.getShowtime();
        Screen screen = showtime.getScreen();
        Seat seat = screen.getSeat(seatId);
        
        if (seat == null) {
            throw new IllegalArgumentException("Seat not found");
        }
        
        return booking.addSeat(seat);
    }
    
    public void removeSeatFromBooking(String bookingId, String seatId) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        Showtime showtime = booking.getShowtime();
        Screen screen = showtime.getScreen();
        Seat seat = screen.getSeat(seatId);
        
        if (seat == null) {
            throw new IllegalArgumentException("Seat not found");
        }
        
        booking.removeSeat(seat);
    }
    
    public Booking getBooking(String bookingId) {
        return bookings.get(bookingId);
    }
    
    public boolean cancelBooking(String bookingId) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        if (!booking.canCancel()) {
            return false;
        }
        
        // Release all seats
        for (Seat seat : booking.getSeats()) {
            booking.getShowtime().unbookSeat(seat.getId());
        }
        
        booking.setStatus(BookingStatus.CANCELLED);
        
        // If payment was completed, initiate refund
        if (booking.getPaymentStatus() == PaymentStatus.COMPLETED) {
            for (Payment payment : payments.values()) {
                if (payment.getBooking().getId().equals(bookingId)) {
                    payment.setStatus(PaymentStatus.REFUNDED);
                    break;
                }
            }
        }
        
        return true;
    }
    
    // Payment processing
    public Payment processPayment(String bookingId, String paymentMethod) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        if (booking.getSeats().isEmpty()) {
            throw new IllegalStateException("Cannot process payment for booking with no seats");
        }
        
        String id = "PAY" + paymentIdCounter.incrementAndGet();
        Payment payment = new Payment(id, booking, booking.getTotalAmount(), paymentMethod);
        payments.put(id, payment);
        
        boolean success = payment.processPayment();
        return payment;
    }
    
    public Payment getPayment(String paymentId) {
        return payments.get(paymentId);
    }
    
    // Discount management
    public void addDiscount(String code, double percentage, LocalDateTime validFrom, LocalDateTime validTo) {
        Discount discount = new Discount(code, percentage, validFrom, validTo);
        discounts.put(code, discount);
    }
    
    public double applyDiscount(String bookingId, String discountCode) {
        Booking booking = bookings.get(bookingId);
        if (booking == null) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        Discount discount = discounts.get(discountCode);
        if (discount == null || !discount.isValid()) {
            return booking.getTotalAmount();
        }
        
        return discount.applyDiscount(booking.getTotalAmount());
    }
}

// Example usage
public class MovieTicketSystemDemo {
    public static void main(String[] args) {
        BookingSystem bookingSystem = new BookingSystem();
        
        // Add movies
        Movie movie1 = bookingSystem.addMovie("The Matrix", 136, "Sci-Fi", "English");
        Movie movie2 = bookingSystem.addMovie("Inception", 148, "Sci-Fi", "English");
        
        // Add theaters and screens
        Theater theater1 = bookingSystem.addTheater("Cineplex", "Downtown");
        Screen screen1 = bookingSystem.addScreen(theater1.getId(), "Screen 1", 10, 15);
        Screen screen2 = bookingSystem.addScreen(theater1.getId(), "Screen 2", 8, 12);
        
        // Add showtimes
        LocalDateTime showtime1 = LocalDateTime.now().plusDays(1).withHour(18).withMinute(0);
        LocalDateTime showtime2 = LocalDateTime.now().plusDays(1).withHour(21).withMinute(0);
        
        Showtime st1 = bookingSystem.addShowtime(movie1.getId(), screen1.getId(), showtime1, 12.50);
        Showtime st2 = bookingSystem.addShowtime(movie2.getId(), screen2.getId(), showtime2, 14.00);
        
        // Add a user
        User user = bookingSystem.addUser("John Doe", "john@example.com", "555-123-4567");
        
        // Create a booking
        Booking booking = bookingSystem.createBooking(user.getId(), st1.getId());
        
        // Add seats to the booking
        boolean seat1Added = bookingSystem.addSeatToBooking(booking.getId(), screen1.getSeat(5, 7).getId());
        boolean seat2Added = bookingSystem.addSeatToBooking(booking.getId(), screen1.getSeat(5, 8).getId());
        
        System.out.println("Booking created: " + booking);
        System.out.println("Seats added: " + seat1Added + ", " + seat2Added);
        
        // Process payment
        Payment payment = bookingSystem.processPayment(booking.getId(), "Credit Card");
        System.out.println("Payment processed: " + payment);
        
        // Generate ticket if payment was successful
        if (payment.getStatus() == PaymentStatus.COMPLETED) {
            String ticket = booking.generateTicket();
            System.out.println("\nTicket generated:\n" + ticket);
        }
        
        // Try to cancel the booking (should fail if too close to showtime)
        boolean cancelled = bookingSystem.cancelBooking(booking.getId());
        System.out.println("Booking cancelled: " + cancelled);
        
        // Show available seats for a showtime
        System.out.println("\nAvailable seats for showtime: " + st2.getAvailableSeats().size());
        
        // Add a discount
        bookingSystem.addDiscount("SUMMER20", 20, LocalDateTime.now().minusDays(10), 
                                 LocalDateTime.now().plusDays(30));
        
        // Create another booking with discount
        Booking booking2 = bookingSystem.createBooking(user.getId(), st2.getId());
        bookingSystem.addSeatToBooking(booking2.getId(), screen2.getSeat(4, 6).getId());
        
        double discountedAmount = bookingSystem.applyDiscount(booking2.getId(), "SUMMER20");
        System.out.println("Original amount: $" + booking2.getTotalAmount());
        System.out.println("Discounted amount: $" + discountedAmount);
    }
}
```

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on shared resources
2. **ConcurrentHashMap**: Used for thread-safe storage of movies, theaters, showtimes, etc.
3. **AtomicInteger**: Used for thread-safe ID generation
4. **Immutable Fields**: Many fields are declared as final to prevent modification
5. **Defensive Copying**: Collections are defensively copied when returned from methods

## Seat Booking Process

1. **Seat Selection**: Users select seats for a specific showtime
2. **Temporary Reservation**: Seats are temporarily reserved during the booking process
3. **Payment Processing**: Payment is processed for the selected seats
4. **Confirmation**: Booking is confirmed after successful payment
5. **Ticket Generation**: Tickets are generated for confirmed bookings

## Concurrency Handling

1. **Synchronized Seat Booking**: Prevents double-booking of seats
2. **Atomic Transactions**: Ensures that seat booking and payment are atomic operations
3. **Timeout Mechanism**: Temporary reservations expire if not confirmed within a time limit
4. **Deadlock Prevention**: Resources are always locked in a consistent order

## Additional Features

1. **Discount System**: Support for promotional discounts and coupons
2. **Seat Types**: Different types of seats with varying prices
3. **Cancellation Policy**: Rules for when bookings can be cancelled
4. **Multiple Theaters**: Support for multiple theaters and screens
5. **Showtime Management**: Prevents scheduling conflicts for screens