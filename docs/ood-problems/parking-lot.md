---
title: Parking Lot Design
description: Design a parking lot system with different vehicle types and payment processing
slug: parking-lot
tags: [ood, object-oriented-design, concurrency]
keywords: [parking lot, vehicle parking, payment processing, thread safety, java]
hide_table_of_contents: false
---

# Parking Lot Design

## Problem Statement

Design a parking lot system that can efficiently manage parking spaces for different types of vehicles, handle entry and exit of vehicles, calculate parking fees, and maintain occupancy information.

## Requirements

1. **Functional Requirements**:
   - Support multiple types of vehicles (Car, Motorcycle, Bus, etc.)
   - Support multiple types of parking spots with different sizes
   - Issue parking tickets upon entry
   - Calculate parking fees based on duration and vehicle type
   - Process payments for parking
   - Find available parking spots for a given vehicle
   - Track occupancy and availability of parking spots

2. **Non-Functional Requirements**:
   - Thread safety for concurrent operations
   - Scalability to handle large parking lots
   - Reliability in tracking vehicles and payments
   - Performance in finding available spots quickly

## Core Components

1. **ParkingLot**: Main class that manages the overall parking system
2. **ParkingSpot**: Represents a single parking space
3. **Vehicle**: Base class for different types of vehicles
4. **ParkingTicket**: Contains information about parking duration, fees, etc.
5. **PaymentProcessor**: Handles payment for parking
6. **ParkingFloor**: Represents a floor in a multi-level parking lot

## Implementation

```java
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Enum for vehicle types
enum VehicleType {
    MOTORCYCLE(1),
    CAR(2),
    BUS(4);

    private final int spotSize;

    VehicleType(int spotSize) {
        this.spotSize = spotSize;
    }

    public int getSpotSize() {
        return spotSize;
    }
}

// Enum for parking spot types
enum ParkingSpotType {
    MOTORCYCLE(1),
    COMPACT(2),
    LARGE(4);

    private final int size;

    ParkingSpotType(int size) {
        this.size = size;
    }

    public int getSize() {
        return size;
    }
}

// Vehicle class
class Vehicle {
    private final String licensePlate;
    private final VehicleType type;

    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public VehicleType getType() {
        return type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return licensePlate.equals(vehicle.licensePlate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(licensePlate);
    }
}

// Parking spot class
class ParkingSpot {
    private final String id;
    private final ParkingSpotType type;
    private boolean isOccupied;
    private Vehicle vehicle;
    private final Lock lock;

    public ParkingSpot(String id, ParkingSpotType type) {
        this.id = id;
        this.type = type;
        this.isOccupied = false;
        this.lock = new ReentrantLock();
    }

    public String getId() {
        return id;
    }

    public ParkingSpotType getType() {
        return type;
    }

    public boolean isOccupied() {
        lock.lock();
        try {
            return isOccupied;
        } finally {
            lock.unlock();
        }
    }

    public boolean park(Vehicle vehicle) {
        lock.lock();
        try {
            if (!isOccupied && vehicle.getType().getSpotSize() <= type.getSize()) {
                this.vehicle = vehicle;
                isOccupied = true;
                return true;
            }
            return false;
        } finally {
            lock.unlock();
        }
    }

    public Vehicle removeVehicle() {
        lock.lock();
        try {
            if (isOccupied) {
                Vehicle parkedVehicle = this.vehicle;
                this.vehicle = null;
                isOccupied = false;
                return parkedVehicle;
            }
            return null;
        } finally {
            lock.unlock();
        }
    }
}

// Parking ticket class
class ParkingTicket {
    private final String ticketId;
    private final Vehicle vehicle;
    private final LocalDateTime entryTime;
    private LocalDateTime exitTime;
    private double fee;
    private boolean isPaid;

    public ParkingTicket(String ticketId, Vehicle vehicle) {
        this.ticketId = ticketId;
        this.vehicle = vehicle;
        this.entryTime = LocalDateTime.now();
        this.isPaid = false;
    }

    public String getTicketId() {
        return ticketId;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public LocalDateTime getExitTime() {
        return exitTime;
    }

    public void setExitTime(LocalDateTime exitTime) {
        this.exitTime = exitTime;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void markAsPaid() {
        this.isPaid = true;
    }

    @Override
    public String toString() {
        return "Ticket ID: " + ticketId +
                "\nVehicle: " + vehicle.getLicensePlate() +
                "\nEntry Time: " + entryTime +
                (exitTime != null ? "\nExit Time: " + exitTime : "") +
                (fee > 0 ? "\nFee: $" + fee : "") +
                "\nPaid: " + (isPaid ? "Yes" : "No");
    }
}

// Fee calculator interface
interface FeeCalculator {
    double calculateFee(VehicleType vehicleType, Duration parkingDuration);
}

// Hourly fee calculator
class HourlyFeeCalculator implements FeeCalculator {
    private final Map<VehicleType, Double> hourlyRates;

    public HourlyFeeCalculator() {
        hourlyRates = new HashMap<>();
        hourlyRates.put(VehicleType.MOTORCYCLE, 1.0);
        hourlyRates.put(VehicleType.CAR, 2.0);
        hourlyRates.put(VehicleType.BUS, 4.0);
    }

    @Override
    public double calculateFee(VehicleType vehicleType, Duration parkingDuration) {
        double hourlyRate = hourlyRates.getOrDefault(vehicleType, 2.0);
        long hours = parkingDuration.toHours();
        // Minimum 1 hour charge
        return Math.max(1, hours) * hourlyRate;
    }
}

// Payment processor
class PaymentProcessor {
    public boolean processPayment(ParkingTicket ticket, String paymentMethod) {
        // In a real implementation, this would integrate with a payment gateway
        System.out.println("Processing payment of $" + ticket.getFee() + " using " + paymentMethod);
        
        // Simulate payment processing
        boolean paymentSuccessful = Math.random() > 0.1; // 90% success rate
        
        if (paymentSuccessful) {
            ticket.markAsPaid();
            System.out.println("Payment successful");
        } else {
            System.out.println("Payment failed");
        }
        
        return paymentSuccessful;
    }
}

// Parking floor class
class ParkingFloor {
    private final String floorId;
    private final List<ParkingSpot> parkingSpots;
    private final Map<String, ParkingSpot> occupiedSpots; // License plate to spot mapping
    private final Lock lock;

    public ParkingFloor(String floorId, int motorcycleSpots, int compactSpots, int largeSpots) {
        this.floorId = floorId;
        this.parkingSpots = new ArrayList<>();
        this.occupiedSpots = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();

        // Initialize parking spots
        initializeSpots(motorcycleSpots, compactSpots, largeSpots);
    }

    private void initializeSpots(int motorcycleSpots, int compactSpots, int largeSpots) {
        // Create motorcycle spots
        for (int i = 1; i <= motorcycleSpots; i++) {
            parkingSpots.add(new ParkingSpot(floorId + "-M-" + i, ParkingSpotType.MOTORCYCLE));
        }

        // Create compact spots
        for (int i = 1; i <= compactSpots; i++) {
            parkingSpots.add(new ParkingSpot(floorId + "-C-" + i, ParkingSpotType.COMPACT));
        }

        // Create large spots
        for (int i = 1; i <= largeSpots; i++) {
            parkingSpots.add(new ParkingSpot(floorId + "-L-" + i, ParkingSpotType.LARGE));
        }
    }

    public ParkingSpot findAvailableSpot(VehicleType vehicleType) {
        lock.lock();
        try {
            int requiredSize = vehicleType.getSpotSize();
            
            // First try to find a spot of the exact size needed
            for (ParkingSpot spot : parkingSpots) {
                if (!spot.isOccupied() && spot.getType().getSize() == requiredSize) {
                    return spot;
                }
            }
            
            // If no exact match, find any spot that can accommodate the vehicle
            for (ParkingSpot spot : parkingSpots) {
                if (!spot.isOccupied() && spot.getType().getSize() >= requiredSize) {
                    return spot;
                }
            }
            
            return null; // No available spot
        } finally {
            lock.unlock();
        }
    }

    public boolean parkVehicle(Vehicle vehicle, ParkingSpot spot) {
        if (spot.park(vehicle)) {
            occupiedSpots.put(vehicle.getLicensePlate(), spot);
            return true;
        }
        return false;
    }

    public ParkingSpot getOccupiedSpotByVehicle(String licensePlate) {
        return occupiedSpots.get(licensePlate);
    }

    public Vehicle removeVehicle(String licensePlate) {
        ParkingSpot spot = occupiedSpots.get(licensePlate);
        if (spot != null) {
            Vehicle vehicle = spot.removeVehicle();
            if (vehicle != null) {
                occupiedSpots.remove(licensePlate);
                return vehicle;
            }
        }
        return null;
    }

    public int getAvailableSpotsCount() {
        lock.lock();
        try {
            int count = 0;
            for (ParkingSpot spot : parkingSpots) {
                if (!spot.isOccupied()) {
                    count++;
                }
            }
            return count;
        } finally {
            lock.unlock();
        }
    }

    public String getFloorId() {
        return floorId;
    }
}

// Parking lot class
class ParkingLot {
    private final String name;
    private final List<ParkingFloor> floors;
    private final Map<String, ParkingTicket> activeTickets; // License plate to ticket mapping
    private final FeeCalculator feeCalculator;
    private final PaymentProcessor paymentProcessor;
    private final Lock lock;

    public ParkingLot(String name, int numFloors, int motorcycleSpotsPerFloor, 
                      int compactSpotsPerFloor, int largeSpotsPerFloor) {
        this.name = name;
        this.floors = new ArrayList<>();
        this.activeTickets = new ConcurrentHashMap<>();
        this.feeCalculator = new HourlyFeeCalculator();
        this.paymentProcessor = new PaymentProcessor();
        this.lock = new ReentrantLock();

        // Initialize floors
        for (int i = 1; i <= numFloors; i++) {
            floors.add(new ParkingFloor("F" + i, motorcycleSpotsPerFloor, 
                                        compactSpotsPerFloor, largeSpotsPerFloor));
        }
    }

    public ParkingTicket parkVehicle(Vehicle vehicle) {
        lock.lock();
        try {
            // Check if vehicle is already parked
            if (activeTickets.containsKey(vehicle.getLicensePlate())) {
                System.out.println("Vehicle already parked");
                return null;
            }

            // Find an available spot
            for (ParkingFloor floor : floors) {
                ParkingSpot spot = floor.findAvailableSpot(vehicle.getType());
                if (spot != null) {
                    if (floor.parkVehicle(vehicle, spot)) {
                        // Create and return a ticket
                        String ticketId = generateTicketId();
                        ParkingTicket ticket = new ParkingTicket(ticketId, vehicle);
                        activeTickets.put(vehicle.getLicensePlate(), ticket);
                        
                        System.out.println("Vehicle parked successfully at spot " + spot.getId());
                        return ticket;
                    }
                }
            }
            
            System.out.println("No available spot for this vehicle type");
            return null;
        } finally {
            lock.unlock();
        }
    }

    public double calculateFee(String licensePlate) {
        ParkingTicket ticket = activeTickets.get(licensePlate);
        if (ticket != null) {
            LocalDateTime exitTime = LocalDateTime.now();
            ticket.setExitTime(exitTime);
            
            Duration parkingDuration = Duration.between(ticket.getEntryTime(), exitTime);
            double fee = feeCalculator.calculateFee(ticket.getVehicle().getType(), parkingDuration);
            ticket.setFee(fee);
            
            return fee;
        }
        return 0;
    }

    public boolean processPayment(String licensePlate, String paymentMethod) {
        ParkingTicket ticket = activeTickets.get(licensePlate);
        if (ticket != null && !ticket.isPaid()) {
            if (ticket.getFee() == 0) {
                calculateFee(licensePlate);
            }
            
            return paymentProcessor.processPayment(ticket, paymentMethod);
        }
        return false;
    }

    public Vehicle removeVehicle(String licensePlate) {
        lock.lock();
        try {
            ParkingTicket ticket = activeTickets.get(licensePlate);
            if (ticket != null) {
                if (!ticket.isPaid()) {
                    System.out.println("Payment required before vehicle can be removed");
                    return null;
                }
                
                // Find the vehicle and remove it
                for (ParkingFloor floor : floors) {
                    ParkingSpot spot = floor.getOccupiedSpotByVehicle(licensePlate);
                    if (spot != null) {
                        Vehicle vehicle = floor.removeVehicle(licensePlate);
                        if (vehicle != null) {
                            activeTickets.remove(licensePlate);
                            System.out.println("Vehicle removed successfully from spot " + spot.getId());
                            return vehicle;
                        }
                    }
                }
            }
            
            System.out.println("Vehicle not found in the parking lot");
            return null;
        } finally {
            lock.unlock();
        }
    }

    public ParkingTicket getTicket(String licensePlate) {
        return activeTickets.get(licensePlate);
    }

    public int getTotalAvailableSpots() {
        lock.lock();
        try {
            int count = 0;
            for (ParkingFloor floor : floors) {
                count += floor.getAvailableSpotsCount();
            }
            return count;
        } finally {
            lock.unlock();
        }
    }

    public int getAvailableSpots(ParkingSpotType spotType) {
        lock.lock();
        try {
            int count = 0;
            for (ParkingFloor floor : floors) {
                for (int i = 0; i < floor.parkingSpots.size(); i++) {
                    ParkingSpot spot = floor.parkingSpots.get(i);
                    if (!spot.isOccupied() && spot.getType() == spotType) {
                        count++;
                    }
                }
            }
            return count;
        } finally {
            lock.unlock();
        }
    }

    private String generateTicketId() {
        return "T" + System.currentTimeMillis();
    }

    public String getName() {
        return name;
    }
}

// Example usage
public class ParkingLotDemo {
    public static void main(String[] args) {
        // Create a parking lot with 3 floors
        ParkingLot parkingLot = new ParkingLot("Downtown Parking", 3, 10, 20, 5);
        
        // Create vehicles
        Vehicle car1 = new Vehicle("ABC123", VehicleType.CAR);
        Vehicle car2 = new Vehicle("DEF456", VehicleType.CAR);
        Vehicle motorcycle = new Vehicle("MNO789", VehicleType.MOTORCYCLE);
        Vehicle bus = new Vehicle("XYZ999", VehicleType.BUS);
        
        // Park vehicles
        ParkingTicket ticket1 = parkingLot.parkVehicle(car1);
        ParkingTicket ticket2 = parkingLot.parkVehicle(car2);
        ParkingTicket ticket3 = parkingLot.parkVehicle(motorcycle);
        ParkingTicket ticket4 = parkingLot.parkVehicle(bus);
        
        // Display tickets
        System.out.println("\nTicket for car1:");
        System.out.println(ticket1);
        
        // Simulate time passing (for demonstration purposes)
        try {
            System.out.println("\nWaiting for 2 seconds to simulate time passing...");
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Calculate fees
        double fee1 = parkingLot.calculateFee(car1.getLicensePlate());
        System.out.println("\nFee for car1: $" + fee1);
        
        // Process payment
        boolean paymentSuccess = parkingLot.processPayment(car1.getLicensePlate(), "Credit Card");
        
        // Remove vehicle after payment
        if (paymentSuccess) {
            Vehicle removedVehicle = parkingLot.removeVehicle(car1.getLicensePlate());
            if (removedVehicle != null) {
                System.out.println("\nVehicle " + removedVehicle.getLicensePlate() + " has left the parking lot");
            }
        }
        
        // Display available spots
        System.out.println("\nTotal available spots: " + parkingLot.getTotalAvailableSpots());
        System.out.println("Available motorcycle spots: " + 
                          parkingLot.getAvailableSpots(ParkingSpotType.MOTORCYCLE));
        System.out.println("Available compact spots: " + 
                          parkingLot.getAvailableSpots(ParkingSpotType.COMPACT));
        System.out.println("Available large spots: " + 
                          parkingLot.getAvailableSpots(ParkingSpotType.LARGE));
    }
}
```

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on parking spots and floors
2. **ConcurrentHashMap**: Used for thread-safe storage of active tickets and occupied spots
3. **Atomic Operations**: Critical operations like parking and removing vehicles are performed atomically
4. **Immutable Objects**: Vehicle and ticket IDs are immutable

## Parking Spot Allocation Strategy

1. **Size-based Allocation**: Vehicles are assigned to spots based on their size requirements
2. **Optimal Fit**: The system tries to find a spot that exactly matches the vehicle's size
3. **Fallback Strategy**: If no exact match is found, any larger spot is used
4. **Floor-by-Floor Search**: Spots are searched floor by floor to distribute vehicles evenly

## Fee Calculation

1. **Time-based Pricing**: Fees are calculated based on parking duration
2. **Vehicle Type Pricing**: Different rates for different vehicle types
3. **Minimum Charge**: A minimum charge for short-duration parking
4. **Extensible Design**: The fee calculator interface allows for different pricing strategies

## Additional Features

1. **Multi-floor Support**: Support for multiple floors in the parking lot
2. **Payment Processing**: Integration with payment processing systems
3. **Availability Tracking**: Real-time tracking of available spots by type
4. **Ticket Management**: Comprehensive ticket system for entry and exit
5. **Vehicle Tracking**: Efficient lookup of parked vehicles by license plate