---
draft: true
title: Elevator System Design
description: Design an elevator system for a building
slug: elevator-system
tags: [ood, object-oriented-design, state-pattern, concurrency]
keywords: [elevator system, state pattern, thread safety, java, building management]
hide_table_of_contents: false
---

# Elevator System Design

## Problem Statement

Design an elevator system that can efficiently manage multiple elevators in a building, handling requests from users on different floors and optimizing elevator movement.

## Requirements

1. **Functional Requirements**:
   - Support multiple elevators in a building
   - Handle external requests (from floors) and internal requests (from inside elevators)
   - Move elevators up and down
   - Open and close doors
   - Display current floor and direction
   - Support emergency stop

2. **Non-Functional Requirements**:
   - Safety (prevent doors from closing when obstructed)
   - Efficiency (minimize wait time and energy consumption)
   - Reliability
   - Thread safety for concurrent requests

## Core Components

1. **Elevator Car**: The physical elevator that moves between floors
2. **Elevator Controller**: Controls the movement and operations of an elevator
3. **Scheduler**: Assigns requests to elevators based on an optimization algorithm
4. **Button Panel**: Inside each elevator and on each floor
5. **Display**: Shows current floor and direction

## Design Approach

We'll use the State Pattern to model elevator states:

1. **Idle**: Elevator is stationary with doors closed
2. **Moving Up**: Elevator is moving upward
3. **Moving Down**: Elevator is moving downward
4. **Doors Opening**: Elevator doors are opening
5. **Doors Open**: Elevator doors are fully open
6. **Doors Closing**: Elevator doors are closing

## Implementation


<details>
<summary>Koda bax</summary>

```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

// Elevator state interface
interface ElevatorState {
    void handleRequest(Elevator elevator, int floor);
    void move(Elevator elevator);
    void stop(Elevator elevator);
    void openDoors(Elevator elevator);
    void closeDoors(Elevator elevator);
}

// Idle state
class IdleState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        if (floor > elevator.getCurrentFloor()) {
            elevator.setDirection(Direction.UP);
            elevator.setState(new MovingUpState());
        } else if (floor < elevator.getCurrentFloor()) {
            elevator.setDirection(Direction.DOWN);
            elevator.setState(new MovingDownState());
        } else {
            elevator.openDoors();
        }
    }

    @Override
    public void move(Elevator elevator) {
        // Cannot move in idle state
    }

    @Override
    public void stop(Elevator elevator) {
        // Already stopped
    }

    @Override
    public void openDoors(Elevator elevator) {
        elevator.setState(new DoorsOpeningState());
    }

    @Override
    public void closeDoors(Elevator elevator) {
        // Doors already closed
    }
}

// Moving Up state
class MovingUpState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        if (floor >= elevator.getCurrentFloor()) {
            elevator.addRequest(floor);
        }
    }

    @Override
    public void move(Elevator elevator) {
        elevator.moveUp();
        if (elevator.shouldStopAtCurrentFloor()) {
            elevator.stop();
        }
    }

    @Override
    public void stop(Elevator elevator) {
        elevator.setState(new IdleState());
        elevator.openDoors();
    }

    @Override
    public void openDoors(Elevator elevator) {
        // Cannot open doors while moving
    }

    @Override
    public void closeDoors(Elevator elevator) {
        // Doors already closed
    }
}

// Moving Down state
class MovingDownState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        if (floor <= elevator.getCurrentFloor()) {
            elevator.addRequest(floor);
        }
    }

    @Override
    public void move(Elevator elevator) {
        elevator.moveDown();
        if (elevator.shouldStopAtCurrentFloor()) {
            elevator.stop();
        }
    }

    @Override
    public void stop(Elevator elevator) {
        elevator.setState(new IdleState());
        elevator.openDoors();
    }

    @Override
    public void openDoors(Elevator elevator) {
        // Cannot open doors while moving
    }

    @Override
    public void closeDoors(Elevator elevator) {
        // Doors already closed
    }
}

// Doors Opening state
class DoorsOpeningState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        elevator.addRequest(floor);
    }

    @Override
    public void move(Elevator elevator) {
        // Cannot move while doors are opening
    }

    @Override
    public void stop(Elevator elevator) {
        // Already stopped
    }

    @Override
    public void openDoors(Elevator elevator) {
        // Doors are already opening
    }

    @Override
    public void closeDoors(Elevator elevator) {
        // Cannot close doors while they are opening
    }
    
    // Transition to doors open state after doors finish opening
    public void doorsOpened(Elevator elevator) {
        elevator.setState(new DoorsOpenState());
    }
}

// Doors Open state
class DoorsOpenState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        elevator.addRequest(floor);
    }

    @Override
    public void move(Elevator elevator) {
        // Cannot move while doors are open
    }

    @Override
    public void stop(Elevator elevator) {
        // Already stopped
    }

    @Override
    public void openDoors(Elevator elevator) {
        // Doors already open
    }

    @Override
    public void closeDoors(Elevator elevator) {
        elevator.setState(new DoorsClosingState());
    }
}

// Doors Closing state
class DoorsClosingState implements ElevatorState {
    @Override
    public void handleRequest(Elevator elevator, int floor) {
        if (floor == elevator.getCurrentFloor()) {
            // Reopen doors if request is for current floor
            elevator.openDoors();
        } else {
            elevator.addRequest(floor);
        }
    }

    @Override
    public void move(Elevator elevator) {
        // Cannot move while doors are closing
    }

    @Override
    public void stop(Elevator elevator) {
        // Already stopped
    }

    @Override
    public void openDoors(Elevator elevator) {
        elevator.setState(new DoorsOpeningState());
    }

    @Override
    public void closeDoors(Elevator elevator) {
        // Doors already closing
    }
    
    // Transition to idle state after doors finish closing
    public void doorsClosed(Elevator elevator) {
        elevator.setState(new IdleState());
        elevator.processNextRequest();
    }
}

// Direction enum
enum Direction {
    UP, DOWN, NONE
}

// Elevator class
class Elevator {
    private final int id;
    private int currentFloor;
    private Direction direction;
    private ElevatorState state;
    private final Set<Integer> upRequests;
    private final Set<Integer> downRequests;
    private final int maxFloor;
    private final Lock lock;
    private boolean doorObstructed;

    public Elevator(int id, int maxFloor) {
        this.id = id;
        this.currentFloor = 1;
        this.direction = Direction.NONE;
        this.state = new IdleState();
        this.upRequests = new ConcurrentSkipListSet<>();
        this.downRequests = new ConcurrentSkipListSet<>(Collections.reverseOrder());
        this.maxFloor = maxFloor;
        this.lock = new ReentrantLock();
        this.doorObstructed = false;
    }

    public int getId() {
        return id;
    }

    public int getCurrentFloor() {
        return currentFloor;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }

    public void setState(ElevatorState state) {
        this.state = state;
    }

    public void addRequest(int floor) {
        if (floor < 1 || floor > maxFloor) {
            throw new IllegalArgumentException("Invalid floor: " + floor);
        }

        if (floor > currentFloor) {
            upRequests.add(floor);
        } else if (floor < currentFloor) {
            downRequests.add(floor);
        }
    }

    public void handleRequest(int floor) {
        lock.lock();
        try {
            state.handleRequest(this, floor);
        } finally {
            lock.unlock();
        }
    }

    public void moveUp() {
        if (currentFloor < maxFloor) {
            currentFloor++;
            System.out.println("Elevator " + id + " moved up to floor " + currentFloor);
        }
    }

    public void moveDown() {
        if (currentFloor > 1) {
            currentFloor--;
            System.out.println("Elevator " + id + " moved down to floor " + currentFloor);
        }
    }

    public void move() {
        lock.lock();
        try {
            state.move(this);
        } finally {
            lock.unlock();
        }
    }

    public void stop() {
        lock.lock();
        try {
            state.stop(this);
            System.out.println("Elevator " + id + " stopped at floor " + currentFloor);
        } finally {
            lock.unlock();
        }
    }

    public void openDoors() {
        lock.lock();
        try {
            state.openDoors(this);
            System.out.println("Elevator " + id + " doors opening at floor " + currentFloor);
            
            // Simulate doors opening
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            
            if (state instanceof DoorsOpeningState) {
                ((DoorsOpeningState) state).doorsOpened(this);
                System.out.println("Elevator " + id + " doors open at floor " + currentFloor);
            }
        } finally {
            lock.unlock();
        }
    }

    public void closeDoors() {
        lock.lock();
        try {
            if (doorObstructed) {
                System.out.println("Elevator " + id + " doors obstructed, reopening");
                doorObstructed = false;
                openDoors();
                return;
            }
            
            state.closeDoors(this);
            System.out.println("Elevator " + id + " doors closing at floor " + currentFloor);
            
            // Simulate doors closing
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            
            if (state instanceof DoorsClosingState) {
                ((DoorsClosingState) state).doorsClosed(this);
                System.out.println("Elevator " + id + " doors closed at floor " + currentFloor);
            }
        } finally {
            lock.unlock();
        }
    }

    public boolean shouldStopAtCurrentFloor() {
        if (direction == Direction.UP && upRequests.contains(currentFloor)) {
            upRequests.remove(currentFloor);
            return true;
        } else if (direction == Direction.DOWN && downRequests.contains(currentFloor)) {
            downRequests.remove(currentFloor);
            return true;
        }
        return false;
    }

    public void processNextRequest() {
        if (!upRequests.isEmpty() && (direction == Direction.UP || downRequests.isEmpty())) {
            direction = Direction.UP;
            int nextFloor = upRequests.iterator().next();
            handleRequest(nextFloor);
        } else if (!downRequests.isEmpty()) {
            direction = Direction.DOWN;
            int nextFloor = downRequests.iterator().next();
            handleRequest(nextFloor);
        } else {
            direction = Direction.NONE;
        }
    }

    public void simulateDoorObstruction() {
        doorObstructed = true;
    }

    public void emergencyStop() {
        lock.lock();
        try {
            System.out.println("Elevator " + id + " EMERGENCY STOP at floor " + currentFloor);
            state = new IdleState();
            direction = Direction.NONE;
            upRequests.clear();
            downRequests.clear();
        } finally {
            lock.unlock();
        }
    }
}

// Elevator Controller class
class ElevatorController {
    private final List<Elevator> elevators;
    private final int maxFloor;

    public ElevatorController(int elevatorCount, int maxFloor) {
        this.elevators = new ArrayList<>();
        this.maxFloor = maxFloor;
        
        for (int i = 1; i <= elevatorCount; i++) {
            elevators.add(new Elevator(i, maxFloor));
        }
    }

    public void requestElevator(int floor, Direction direction) {
        if (floor < 1 || floor > maxFloor) {
            throw new IllegalArgumentException("Invalid floor: " + floor);
        }

        // Find the best elevator to handle this request
        Elevator bestElevator = findBestElevator(floor, direction);
        bestElevator.handleRequest(floor);
    }

    public void requestFloor(int elevatorId, int floor) {
        if (elevatorId < 1 || elevatorId > elevators.size()) {
            throw new IllegalArgumentException("Invalid elevator ID: " + elevatorId);
        }
        
        if (floor < 1 || floor > maxFloor) {
            throw new IllegalArgumentException("Invalid floor: " + floor);
        }

        Elevator elevator = elevators.get(elevatorId - 1);
        elevator.handleRequest(floor);
    }

    private Elevator findBestElevator(int floor, Direction direction) {
        // Simple algorithm: find the closest idle elevator or one moving in the same direction
        Elevator bestElevator = null;
        int minDistance = Integer.MAX_VALUE;

        for (Elevator elevator : elevators) {
            if (elevator.getDirection() == Direction.NONE) {
                // Idle elevator
                int distance = Math.abs(elevator.getCurrentFloor() - floor);
                if (distance < minDistance) {
                    minDistance = distance;
                    bestElevator = elevator;
                }
            } else if (elevator.getDirection() == direction) {
                // Elevator moving in the same direction
                if ((direction == Direction.UP && elevator.getCurrentFloor() < floor) ||
                    (direction == Direction.DOWN && elevator.getCurrentFloor() > floor)) {
                    int distance = Math.abs(elevator.getCurrentFloor() - floor);
                    if (distance < minDistance) {
                        minDistance = distance;
                        bestElevator = elevator;
                    }
                }
            }
        }

        // If no suitable elevator found, just pick the first one
        if (bestElevator == null) {
            bestElevator = elevators.get(0);
        }

        return bestElevator;
    }

    public void step() {
        // Simulate one time step for all elevators
        for (Elevator elevator : elevators) {
            if (elevator.getDirection() != Direction.NONE) {
                elevator.move();
            }
        }
    }
}

// Example usage
public class ElevatorSystemDemo {
    public static void main(String[] args) {
        // Create a controller with 3 elevators and 10 floors
        ElevatorController controller = new ElevatorController(3, 10);
        
        // Request elevators from different floors
        controller.requestElevator(5, Direction.UP);
        controller.requestElevator(3, Direction.DOWN);
        
        // Simulate time steps
        for (int i = 0; i < 10; i++) {
            controller.step();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        
        // Request a specific floor from inside an elevator
        controller.requestFloor(1, 8);
        
        // Simulate more time steps
        for (int i = 0; i < 10; i++) {
            controller.step();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
```
</details>

## Thread Safety Considerations

1. **ReentrantLock**: Used to ensure thread-safe operations on elevators
2. **ConcurrentSkipListSet**: Used for thread-safe floor request management
3. **State Pattern**: Ensures that elevator state transitions are atomic and consistent
4. **Immutable Objects**: Direction enum and state implementations are immutable

## Optimization Strategies

1. **Nearest Elevator Algorithm**: Assign requests to the nearest available elevator
2. **Same Direction Priority**: Prioritize elevators already moving in the requested direction
3. **Scan Algorithm (Elevator Algorithm)**: Service requests in one direction until no more requests in that direction
4. **Look-Ahead Strategy**: Anticipate future requests based on patterns

## Safety Features

1. **Door Obstruction Detection**: Prevents doors from closing when obstructed
2. **Emergency Stop**: Immediately stops the elevator and clears all requests
3. **Floor Validation**: Ensures requested floors are within valid range
4. **State Validation**: Prevents invalid operations based on current state

## Additional Features

1. **Weight Limit Detection**: Prevent overloading the elevator
2. **Priority Service**: Support priority requests (e.g., for emergency personnel)
3. **Express Elevators**: Elevators that only stop at certain floors
4. **Maintenance Mode**: Take elevators out of service for maintenance
