---
draft: true
title: Command Design Pattern
description: Command design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: command-design-pattern
tags: [design-patterns, behavioral, command, java]
keywords: [command pattern, design pattern, behavioral pattern, java]
hide_table_of_contents: false
---

# Command Design Pattern


Command Design Pattern, behavioral design pattern-lərdən biridir və bir sorğu və ya əməliyyatı obyekt şəklində encapsulate etməyə imkan verir. Bu pattern, sorğu göndərən obyekti (invoker) sorğunu yerinə yetirən obyektdən (receiver) ayırır və beləliklə, müxtəlif sorğuları parametrləşdirməyə, növbəyə qoymağa, log etməyə və ləğv etməyə (undo) imkan verir.

Command pattern, real həyatda restoranda sifariş vermə prosesinə bənzəyir. Müştəri (client) sifarişi verir, ofisiant (invoker) sifarişi qəbul edir və mətbəxə (receiver) ötürür. Ofisiant, sifarişin detallarını bilmədən, sadəcə onu ötürür.

## Command Pattern-nin Əsas Xüsusiyyətləri

- **Decoupling**: Əməliyyatı yerinə yetirən obyekti əməliyyatı başladan obyektdən ayırır
- **Encapsulation**: Əməliyyatı və onun parametrlərini bir obyektdə encapsulate edir
- **Extensibility**: Mövcud kodu dəyişdirmədən yeni command-lar əlavə etməyə imkan verir
- **Composite Commands**: Mürəkkəb əməliyyatlar yaratmaq üçün command-ları birləşdirməyə imkan verir
- **Undo/Redo**: Əməliyyatları ləğv etmək və yenidən yerinə yetirmək imkanı

## Command Pattern-nin Strukturu

1. **Command**: Əməliyyatı yerinə yetirmək üçün interface
2. **Concrete Command**: Command interface-ni implement edən və Receiver ilə əlaqə saxlayan class
3. **Receiver**: Əməliyyatı faktiki olaraq yerinə yetirən class
4. **Invoker**: Command-ı yerinə yetirən class
5. **Client**: Command obyektini yaradır və onu Invoker-ə təyin edir

## Java-da Command Pattern İmplementasiyası

### Sadə Command Pattern Nümunəsi


<details>
<summary>Koda bax</summary>

```java
// Command interface
interface Command {
    void execute();
}

// Receiver
class Light {
    private boolean isOn = false;
    
    public void turnOn() {
        isOn = true;
        System.out.println("Light is ON");
    }
    
    public void turnOff() {
        isOn = false;
        System.out.println("Light is OFF");
    }
    
    public boolean isOn() {
        return isOn;
    }
}

// Concrete Commands
class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOn();
    }
}

class LightOffCommand implements Command {
    private Light light;
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOff();
    }
}

// Invoker
class RemoteControl {
    private Command command;
    
    public void setCommand(Command command) {
        this.command = command;
    }
    
    public void pressButton() {
        command.execute();
    }
}

// Client code
public class CommandPatternDemo {
    public static void main(String[] args) {
        // Create receiver
        Light light = new Light();
        
        // Create commands
        Command lightOn = new LightOnCommand(light);
        Command lightOff = new LightOffCommand(light);
        
        // Create invoker
        RemoteControl remote = new RemoteControl();
        
        // Execute commands
        remote.setCommand(lightOn);
        remote.pressButton();
        
        remote.setCommand(lightOff);
        remote.pressButton();
    }
}
```
</details>

### Undo Funksionallığı ilə Command Pattern


<details>
<summary>Koda bax</summary>

```java
// Command interface with undo
interface Command {
    void execute();
    void undo();
}

// Receiver
class Fan {
    private static final int OFF = 0;
    private static final int LOW = 1;
    private static final int MEDIUM = 2;
    private static final int HIGH = 3;
    private int speed = OFF;
    
    public void setSpeed(int speed) {
        this.speed = speed;
        if (speed == OFF) {
            System.out.println("Fan is OFF");
        } else {
            System.out.println("Fan is set to " + 
                (speed == LOW ? "LOW" : (speed == MEDIUM ? "MEDIUM" : "HIGH")));
        }
    }
    
    public int getSpeed() {
        return speed;
    }
}

// Concrete Command
class FanSpeedCommand implements Command {
    private Fan fan;
    private int prevSpeed;
    private int newSpeed;
    
    public FanSpeedCommand(Fan fan, int speed) {
        this.fan = fan;
        this.newSpeed = speed;
    }
    
    @Override
    public void execute() {
        prevSpeed = fan.getSpeed();
        fan.setSpeed(newSpeed);
    }
    
    @Override
    public void undo() {
        fan.setSpeed(prevSpeed);
    }
}

// Invoker with history
class RemoteControlWithUndo {
    private Command command;
    private Command lastCommand;
    
    public void setCommand(Command command) {
        this.command = command;
    }
    
    public void pressButton() {
        command.execute();
        lastCommand = command;
    }
    
    public void pressUndoButton() {
        if (lastCommand != null) {
            lastCommand.undo();
        }
    }
}

// Client code
public class CommandWithUndoDemo {
    public static void main(String[] args) {
        // Create receiver
        Fan fan = new Fan();
        
        // Create commands
        Command fanLow = new FanSpeedCommand(fan, 1);
        Command fanMedium = new FanSpeedCommand(fan, 2);
        Command fanHigh = new FanSpeedCommand(fan, 3);
        Command fanOff = new FanSpeedCommand(fan, 0);
        
        // Create invoker
        RemoteControlWithUndo remote = new RemoteControlWithUndo();
        
        // Execute commands
        remote.setCommand(fanLow);
        remote.pressButton();
        
        remote.setCommand(fanMedium);
        remote.pressButton();
        
        remote.setCommand(fanHigh);
        remote.pressButton();
        
        // Undo commands
        System.out.println("\nUndo operations:");
        remote.pressUndoButton(); // Undo to medium
        remote.pressUndoButton(); // Undo to low
        
        // Set to off
        remote.setCommand(fanOff);
        remote.pressButton();
    }
}
```
</details>

### Macro Commands (Command-lərin Kompozisiyası)


<details>
<summary>Koda bax</summary>

```java
import java.util.ArrayList;
import java.util.List;

// Command interface
interface Command {
    void execute();
    void undo();
}

// Receivers
class Light {
    private String location;
    private boolean isOn = false;
    
    public Light(String location) {
        this.location = location;
    }
    
    public void turnOn() {
        isOn = true;
        System.out.println(location + " light is ON");
    }
    
    public void turnOff() {
        isOn = false;
        System.out.println(location + " light is OFF");
    }
}

class Stereo {
    private boolean isOn = false;
    private int volume = 0;
    
    public void on() {
        isOn = true;
        System.out.println("Stereo is ON");
    }
    
    public void off() {
        isOn = false;
        System.out.println("Stereo is OFF");
    }
    
    public void setCD() {
        System.out.println("Stereo is set for CD input");
    }
    
    public void setVolume(int volume) {
        this.volume = volume;
        System.out.println("Stereo volume set to " + volume);
    }
}

class TV {
    private boolean isOn = false;
    
    public void on() {
        isOn = true;
        System.out.println("TV is ON");
    }
    
    public void off() {
        isOn = false;
        System.out.println("TV is OFF");
    }
    
    public void setInputChannel() {
        System.out.println("TV channel set to DVD");
    }
}

// Concrete Commands
class LightOnCommand implements Command {
    private Light light;
    
    public LightOnCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOn();
    }
    
    @Override
    public void undo() {
        light.turnOff();
    }
}

class LightOffCommand implements Command {
    private Light light;
    
    public LightOffCommand(Light light) {
        this.light = light;
    }
    
    @Override
    public void execute() {
        light.turnOff();
    }
    
    @Override
    public void undo() {
        light.turnOn();
    }
}

class StereoOnWithCDCommand implements Command {
    private Stereo stereo;
    
    public StereoOnWithCDCommand(Stereo stereo) {
        this.stereo = stereo;
    }
    
    @Override
    public void execute() {
        stereo.on();
        stereo.setCD();
        stereo.setVolume(11);
    }
    
    @Override
    public void undo() {
        stereo.off();
    }
}

class StereoOffCommand implements Command {
    private Stereo stereo;
    
    public StereoOffCommand(Stereo stereo) {
        this.stereo = stereo;
    }
    
    @Override
    public void execute() {
        stereo.off();
    }
    
    @Override
    public void undo() {
        stereo.on();
        stereo.setCD();
        stereo.setVolume(11);
    }
}

class TVOnCommand implements Command {
    private TV tv;
    
    public TVOnCommand(TV tv) {
        this.tv = tv;
    }
    
    @Override
    public void execute() {
        tv.on();
        tv.setInputChannel();
    }
    
    @Override
    public void undo() {
        tv.off();
    }
}

class TVOffCommand implements Command {
    private TV tv;
    
    public TVOffCommand(TV tv) {
        this.tv = tv;
    }
    
    @Override
    public void execute() {
        tv.off();
    }
    
    @Override
    public void undo() {
        tv.on();
        tv.setInputChannel();
    }
}

// Macro Command
class MacroCommand implements Command {
    private List<Command> commands;
    
    public MacroCommand(List<Command> commands) {
        this.commands = commands;
    }
    
    @Override
    public void execute() {
        for (Command command : commands) {
            command.execute();
        }
    }
    
    @Override
    public void undo() {
        // Execute undo in reverse order
        for (int i = commands.size() - 1; i >= 0; i--) {
            commands.get(i).undo();
        }
    }
}

// Invoker
class RemoteControl {
    private Command[] onCommands;
    private Command[] offCommands;
    private Command undoCommand;
    
    public RemoteControl(int slots) {
        onCommands = new Command[slots];
        offCommands = new Command[slots];
        
        Command noCommand = new NoCommand();
        for (int i = 0; i < slots; i++) {
            onCommands[i] = noCommand;
            offCommands[i] = noCommand;
        }
        undoCommand = noCommand;
    }
    
    public void setCommand(int slot, Command onCommand, Command offCommand) {
        onCommands[slot] = onCommand;
        offCommands[slot] = offCommand;
    }
    
    public void onButtonPressed(int slot) {
        onCommands[slot].execute();
        undoCommand = onCommands[slot];
    }
    
    public void offButtonPressed(int slot) {
        offCommands[slot].execute();
        undoCommand = offCommands[slot];
    }
    
    public void undoButtonPressed() {
        undoCommand.undo();
    }
    
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("\n------ Remote Control -------\n");
        for (int i = 0; i < onCommands.length; i++) {
            sb.append("[slot ").append(i).append("] ")
              .append(onCommands[i].getClass().getSimpleName()).append("    ")
              .append(offCommands[i].getClass().getSimpleName()).append("\n");
        }
        sb.append("[undo] ").append(undoCommand.getClass().getSimpleName()).append("\n");
        return sb.toString();
    }
    
    // Null Object pattern to avoid null checks
    private static class NoCommand implements Command {
        @Override
        public void execute() {}
        
        @Override
        public void undo() {}
    }
}

// Client code
public class MacroCommandDemo {
    public static void main(String[] args) {
        // Create receivers
        Light livingRoomLight = new Light("Living Room");
        Light kitchenLight = new Light("Kitchen");
        Stereo stereo = new Stereo();
        TV tv = new TV();
        
        // Create commands
        LightOnCommand livingRoomLightOn = new LightOnCommand(livingRoomLight);
        LightOffCommand livingRoomLightOff = new LightOffCommand(livingRoomLight);
        
        LightOnCommand kitchenLightOn = new LightOnCommand(kitchenLight);
        LightOffCommand kitchenLightOff = new LightOffCommand(kitchenLight);
        
        StereoOnWithCDCommand stereoOn = new StereoOnWithCDCommand(stereo);
        StereoOffCommand stereoOff = new StereoOffCommand(stereo);
        
        TVOnCommand tvOn = new TVOnCommand(tv);
        TVOffCommand tvOff = new TVOffCommand(tv);
        
        // Create macro commands
        List<Command> partyOnCommands = new ArrayList<>();
        partyOnCommands.add(livingRoomLightOn);
        partyOnCommands.add(kitchenLightOn);
        partyOnCommands.add(stereoOn);
        partyOnCommands.add(tvOn);
        
        List<Command> partyOffCommands = new ArrayList<>();
        partyOffCommands.add(livingRoomLightOff);
        partyOffCommands.add(kitchenLightOff);
        partyOffCommands.add(stereoOff);
        partyOffCommands.add(tvOff);
        
        MacroCommand partyOnMacro = new MacroCommand(partyOnCommands);
        MacroCommand partyOffMacro = new MacroCommand(partyOffCommands);
        
        // Create remote control
        RemoteControl remoteControl = new RemoteControl(7);
        
        // Set individual commands
        remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);
        remoteControl.setCommand(1, kitchenLightOn, kitchenLightOff);
        remoteControl.setCommand(2, stereoOn, stereoOff);
        remoteControl.setCommand(3, tvOn, tvOff);
        
        // Set macro commands
        remoteControl.setCommand(4, partyOnMacro, partyOffMacro);
        
        // Print remote control state
        System.out.println(remoteControl);
        
        // Test individual commands
        System.out.println("--- Pressing individual buttons ---");
        remoteControl.onButtonPressed(0);  // Turn on living room light
        remoteControl.onButtonPressed(1);  // Turn on kitchen light
        remoteControl.offButtonPressed(0); // Turn off living room light
        remoteControl.undoButtonPressed(); // Undo - turn on living room light
        
        // Test macro command
        System.out.println("\n--- Pressing party mode on ---");
        remoteControl.onButtonPressed(4);  // Turn on party mode
        
        System.out.println("\n--- Pressing party mode off ---");
        remoteControl.offButtonPressed(4); // Turn off party mode
        
        System.out.println("\n--- Pressing undo button ---");
        remoteControl.undoButtonPressed(); // Undo - turn on party mode
    }
}
```
</details>

## Real-World Nümunələr

### Thread Pool və Task Queue


<details>
<summary>Koda bax</summary>

```java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

// Command interface
interface Task extends Runnable {
    String getName();
    void execute();
}

// Concrete Command
class DataProcessingTask implements Task {
    private String name;
    private String data;
    
    public DataProcessingTask(String name, String data) {
        this.name = name;
        this.data = data;
    }
    
    @Override
    public String getName() {
        return name;
    }
    
    @Override
    public void execute() {
        System.out.println("Processing data: " + data);
        // Simulate processing time
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Data processing completed for: " + name);
    }
    
    @Override
    public void run() {
        execute();
    }
}

// Invoker
class TaskExecutor {
    private BlockingQueue<Runnable> taskQueue;
    private ThreadPoolExecutor executor;
    
    public TaskExecutor(int corePoolSize, int maxPoolSize, long keepAliveTime) {
        taskQueue = new LinkedBlockingQueue<>();
        executor = new ThreadPoolExecutor(
            corePoolSize, maxPoolSize, keepAliveTime, TimeUnit.SECONDS, taskQueue);
    }
    
    public void submitTask(Task task) {
        System.out.println("Submitting task: " + task.getName());
        executor.execute(task);
    }
    
    public void shutdown() {
        executor.shutdown();
    }
    
    public boolean isTerminated() {
        return executor.isTerminated();
    }
    
    public int getQueueSize() {
        return taskQueue.size();
    }
    
    public int getActiveCount() {
        return executor.getActiveCount();
    }
}

// Client code
public class ThreadPoolCommandDemo {
    public static void main(String[] args) {
        // Create task executor
        TaskExecutor executor = new TaskExecutor(2, 4, 10);
        
        // Create and submit tasks
        for (int i = 1; i <= 10; i++) {
            Task task = new DataProcessingTask("Task-" + i, "Data-" + i);
            executor.submitTask(task);
        }
        
        // Monitor task execution
        try {
            while (!executor.isTerminated()) {
                System.out.println("Active threads: " + executor.getActiveCount() + 
                                  ", Queue size: " + executor.getQueueSize());
                Thread.sleep(500);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        // Shutdown executor
        executor.shutdown();
    }
}
```
</details>

### Undo/Redo Funksionallığı ilə Text Editor


<details>
<summary>Koda bax</summary>

```java
import java.util.Stack;

// Command interface
interface TextEditorCommand {
    void execute();
    void undo();
}

// Receiver
class TextDocument {
    private StringBuilder content = new StringBuilder();
    
    public void insert(String text, int position) {
        content.insert(position, text);
    }
    
    public void delete(int position, int length) {
        content.delete(position, position + length);
    }
    
    public String getContent() {
        return content.toString();
    }
}

// Concrete Commands
class InsertTextCommand implements TextEditorCommand {
    private TextDocument document;
    private String text;
    private int position;
    
    public InsertTextCommand(TextDocument document, String text, int position) {
        this.document = document;
        this.text = text;
        this.position = position;
    }
    
    @Override
    public void execute() {
        document.insert(text, position);
    }
    
    @Override
    public void undo() {
        document.delete(position, text.length());
    }
}

class DeleteTextCommand implements TextEditorCommand {
    private TextDocument document;
    private String deletedText;
    private int position;
    
    public DeleteTextCommand(TextDocument document, int position, int length) {
        this.document = document;
        this.position = position;
        // Store the text to be deleted for undo operation
        this.deletedText = document.getContent().substring(position, position + length);
    }
    
    @Override
    public void execute() {
        document.delete(position, deletedText.length());
    }
    
    @Override
    public void undo() {
        document.insert(deletedText, position);
    }
}

// Invoker
class TextEditor {
    private TextDocument document = new TextDocument();
    private Stack<TextEditorCommand> undoStack = new Stack<>();
    private Stack<TextEditorCommand> redoStack = new Stack<>();
    
    public void executeCommand(TextEditorCommand command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear(); // Clear redo stack when a new command is executed
    }
    
    public void undo() {
        if (!undoStack.isEmpty()) {
            TextEditorCommand command = undoStack.pop();
            command.undo();
            redoStack.push(command);
        } else {
            System.out.println("Nothing to undo");
        }
    }
    
    public void redo() {
        if (!redoStack.isEmpty()) {
            TextEditorCommand command = redoStack.pop();
            command.execute();
            undoStack.push(command);
        } else {
            System.out.println("Nothing to redo");
        }
    }
    
    public String getContent() {
        return document.getContent();
    }
    
    public void insertText(String text, int position) {
        executeCommand(new InsertTextCommand(document, text, position));
    }
    
    public void deleteText(int position, int length) {
        executeCommand(new DeleteTextCommand(document, position, length));
    }
}

// Client code
public class TextEditorDemo {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        
        // Insert text
        editor.insertText("Hello", 0);
        System.out.println("After inserting 'Hello': " + editor.getContent());
        
        // Insert more text
        editor.insertText(" World", 5);
        System.out.println("After inserting ' World': " + editor.getContent());
        
        // Delete text
        editor.deleteText(5, 6);
        System.out.println("After deleting ' World': " + editor.getContent());
        
        // Undo the delete
        editor.undo();
        System.out.println("After undo: " + editor.getContent());
        
        // Undo the second insert
        editor.undo();
        System.out.println("After undo: " + editor.getContent());
        
        // Redo
        editor.redo();
        System.out.println("After redo: " + editor.getContent());
        
        // Insert new text
        editor.insertText("!", 11);
        System.out.println("After inserting '!': " + editor.getContent());
        
        // Try to redo (should not work because we executed a new command)
        editor.redo();
        System.out.println("After trying to redo: " + editor.getContent());
    }
}
```
</details>

## Command Pattern-nin Üstünlükləri

1. **Decoupling**: Əməliyyatı yerinə yetirən obyekti əməliyyatı başladan obyektdən ayırır
2. **Extensibility**: Mövcud kodu dəyişdirmədən yeni command-lar əlavə etməyə imkan verir
3. **Composite Commands**: Mürəkkəb əməliyyatlar yaratmaq üçün command-ları birləşdirməyə imkan verir
4. **Undo/Redo**: Əməliyyatları ləğv etmək və yenidən yerinə yetirmək imkanı
5. **Queueing and Logging**: Əməliyyatları növbəyə qoymaq və log etmək imkanı
6. **Transaction Support**: Əməliyyatları qruplaşdırmaq və atomik olaraq yerinə yetirmək imkanı

## Command Pattern-nin Çatışmazlıqları

1. **Complexity**: Çoxlu sayda kiçik command class-ları yaratmaq lazım gəlir
2. **Memory Usage**: Undo/redo funksionallığı üçün command history saxlamaq lazım gəlir
3. **Performance Overhead**: Əlavə abstraction layer-i performance-a təsir edə bilər

## Command Pattern-nin İstifadə Sahələri

1. **GUI Elements**: Button, menu item və s. kimi GUI elementləri üçün
2. **Undo/Redo Functionality**: Text editor, graphic editor və s. kimi tətbiqlərdə
3. **Transaction Processing**: Database transaction-ları və s. kimi əməliyyatlar üçün
4. **Task Scheduling**: Əməliyyatları növbəyə qoymaq və sonra yerinə yetirmək üçün
5. **Multi-level Undo**: Çoxsəviyyəli undo funksionallığı üçün
6. **Macro Recording**: İstifadəçi əməliyyatlarını qeyd etmək və təkrar yerinə yetirmək üçün

## Command Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Command vs Strategy

- **Command**: Əməliyyatı və onun parametrlərini encapsulate edir
- **Strategy**: Bir algoritmin müxtəlif variantlarını təqdim edir

### Command vs Observer

- **Command**: Əməliyyatı encapsulate edir və sonra yerinə yetirmək üçün saxlayır
- **Observer**: Bir obyektin vəziyyəti dəyişdikdə digər obyektləri xəbərdar edir

### Command vs Memento

- **Command**: Əməliyyatı encapsulate edir və undo/redo funksionallığı təqdim edir
- **Memento**: Obyektin daxili vəziyyətini saxlayır və sonra bərpa etməyə imkan verir

