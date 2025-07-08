---
title: Facade Design Pattern
description: Facade design pattern-nin ətraflı izahı və Java-da implementasiyası
slug: facade-design-pattern
tags: [design-patterns, structural, facade, java]
keywords: [facade pattern, design pattern, structural pattern, java]
hide_table_of_contents: false
---

# Facade Design Pattern

## Giriş

Facade Design Pattern, structural design pattern-lərdən biridir və mürəkkəb alt sistemlər üçün sadə bir interface təqdim edir. Bu pattern, mürəkkəb sistemləri gizlədərək, client-lər üçün daha sadə və istifadəsi asan interface yaradır.

Facade pattern, real həyatda bir çox nümunələrə bənzəyir. Məsələn, bir restoranda sifariş verdiyiniz zaman, siz birbaşa aşbaz, qabyuyan və digər işçilərlə əlaqə saxlamırsınız - bunun əvəzinə, ofisiant sizin üçün bir facade rolunu oynayır və mürəkkəb prosesləri gizlədir.

## Facade Pattern-nin Əsas Xüsusiyyətləri

- **Simplification**: Mürəkkəb sistemləri sadə interface arxasında gizlədir
- **Decoupling**: Client-ləri alt sistemlərdən ayırır
- **Entry Point**: Alt sistemlərə giriş nöqtəsi təqdim edir
- **Layer of Abstraction**: Mürəkkəb sistemlər üzərində abstraction layer-i yaradır

## Facade Pattern-nin Strukturu

1. **Facade**: Alt sistemlərə sadə interface təqdim edən class
2. **Subsystems**: Mürəkkəb funksionallığı həyata keçirən class-lar
3. **Client**: Facade interface-i istifadə edən class

## Java-da Facade Pattern İmplementasiyası

### Sadə Facade Pattern Nümunəsi

```java
// Subsystem classes
class CPU {
    public void freeze() {
        System.out.println("CPU: Freezing processor.");
    }
    
    public void jump(long position) {
        System.out.println("CPU: Jumping to position " + position);
    }
    
    public void execute() {
        System.out.println("CPU: Executing commands.");
    }
}

class Memory {
    public void load(long position, byte[] data) {
        System.out.println("Memory: Loading data at position " + position);
    }
}

class HardDrive {
    public byte[] read(long lba, int size) {
        System.out.println("HardDrive: Reading " + size + " bytes from position " + lba);
        return new byte[size];
    }
}

// Facade
class ComputerFacade {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;
    
    public ComputerFacade() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }
    
    public void start() {
        System.out.println("ComputerFacade: Starting computer...");
        
        cpu.freeze();
        
        // Read boot sector
        byte[] bootData = hardDrive.read(0, 1024);
        
        // Load boot data into memory
        memory.load(0, bootData);
        
        // Jump to boot address and execute
        cpu.jump(0);
        cpu.execute();
        
        System.out.println("ComputerFacade: Computer started successfully.");
    }
    
    public void shutdown() {
        System.out.println("ComputerFacade: Shutting down computer...");
        
        // Shutdown operations would go here
        
        System.out.println("ComputerFacade: Computer shut down successfully.");
    }
}

// Client code
public class FacadePatternDemo {
    public static void main(String[] args) {
        ComputerFacade computer = new ComputerFacade();
        
        // Client uses the simple facade interface
        computer.start();
        
        System.out.println("\nComputer is running...\n");
        
        computer.shutdown();
    }
}
```

### Daha Mürəkkəb Facade Pattern Nümunəsi

```java
// Subsystem 1: Video Conversion
class VideoFile {
    private String name;
    private String codecType;
    
    public VideoFile(String name) {
        this.name = name;
        this.codecType = name.substring(name.indexOf(".") + 1);
    }
    
    public String getName() {
        return name;
    }
    
    public String getCodecType() {
        return codecType;
    }
}

class Codec {
    private String type;
    
    public Codec(String type) {
        this.type = type;
    }
    
    public String getType() {
        return type;
    }
}

class MPEG4CompressionCodec extends Codec {
    public MPEG4CompressionCodec() {
        super("mp4");
    }
}

class OggCompressionCodec extends Codec {
    public OggCompressionCodec() {
        super("ogg");
    }
}

// Subsystem 2: Audio Extraction
class AudioExtractor {
    public void extract(VideoFile file) {
        System.out.println("AudioExtractor: Extracting audio from " + file.getName());
    }
}

// Subsystem 3: Codec Factory
class CodecFactory {
    public Codec extract(VideoFile file) {
        String type = file.getCodecType();
        if (type.equals("mp4")) {
            System.out.println("CodecFactory: Extracting mp4 codec");
            return new MPEG4CompressionCodec();
        } else {
            System.out.println("CodecFactory: Extracting ogg codec");
            return new OggCompressionCodec();
        }
    }
}

// Subsystem 4: Bitrate Reader
class BitrateReader {
    public static byte[] read(VideoFile file, Codec codec) {
        System.out.println("BitrateReader: Reading file " + file.getName() + " with codec " + codec.getType());
        return new byte[10]; // Dummy data
    }
    
    public static byte[] convert(byte[] buffer, Codec codec) {
        System.out.println("BitrateReader: Converting bitrate using codec " + codec.getType());
        return buffer; // Dummy conversion
    }
}

// Facade
class VideoConversionFacade {
    public String convertVideo(String fileName, String format) {
        System.out.println("VideoConversionFacade: Starting video conversion from " + fileName + " to " + format);
        
        VideoFile file = new VideoFile(fileName);
        Codec sourceCodec = new CodecFactory().extract(file);
        
        Codec destinationCodec;
        if (format.equals("mp4")) {
            destinationCodec = new MPEG4CompressionCodec();
        } else {
            destinationCodec = new OggCompressionCodec();
        }
        
        byte[] buffer = BitrateReader.read(file, sourceCodec);
        byte[] result = BitrateReader.convert(buffer, destinationCodec);
        
        AudioExtractor audioExtractor = new AudioExtractor();
        audioExtractor.extract(file);
        
        String outputFileName = fileName.substring(0, fileName.indexOf(".")) + "." + format;
        System.out.println("VideoConversionFacade: Conversion completed. Output file: " + outputFileName);
        
        return outputFileName;
    }
}

// Client code
public class VideoConversionDemo {
    public static void main(String[] args) {
        VideoConversionFacade converter = new VideoConversionFacade();
        
        // Client uses the simple facade interface
        String mp4File = converter.convertVideo("wildlife.ogg", "mp4");
        System.out.println("Client: Conversion result: " + mp4File);
        
        System.out.println();
        
        String oggFile = converter.convertVideo("vacation.mp4", "ogg");
        System.out.println("Client: Conversion result: " + oggFile);
    }
}
```

## Real-World Nümunələr

### JDBC API

JDBC API, Facade pattern-in real-world nümunəsidir:

```java
import java.sql.*;

public class JdbcFacadeExample {
    // JDBC Facade
    public static class JdbcFacade {
        private Connection connection;
        private Statement statement;
        
        public JdbcFacade() {
            try {
                // Load the driver
                Class.forName("com.mysql.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
        
        public void open(String url, String username, String password) {
            try {
                connection = DriverManager.getConnection(url, username, password);
                statement = connection.createStatement();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        
        public ResultSet executeQuery(String query) {
            try {
                return statement.executeQuery(query);
            } catch (SQLException e) {
                e.printStackTrace();
                return null;
            }
        }
        
        public int executeUpdate(String query) {
            try {
                return statement.executeUpdate(query);
            } catch (SQLException e) {
                e.printStackTrace();
                return 0;
            }
        }
        
        public void close() {
            try {
                if (statement != null) {
                    statement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
    // Client code
    public static void main(String[] args) {
        JdbcFacade jdbc = new JdbcFacade();
        
        // Open connection
        jdbc.open("jdbc:mysql://localhost:3306/mydb", "username", "password");
        
        // Execute query
        ResultSet resultSet = jdbc.executeQuery("SELECT * FROM users");
        
        // Process results
        try {
            while (resultSet != null && resultSet.next()) {
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                System.out.println("User: " + name + ", Email: " + email);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        // Execute update
        int rowsAffected = jdbc.executeUpdate("UPDATE users SET status = 'active' WHERE id = 1");
        System.out.println("Rows affected: " + rowsAffected);
        
        // Close connection
        jdbc.close();
    }
}
```

### Home Theater Facade

```java
// Subsystem components
class Amplifier {
    public void on() {
        System.out.println("Amplifier is ON");
    }
    
    public void off() {
        System.out.println("Amplifier is OFF");
    }
    
    public void setVolume(int level) {
        System.out.println("Setting amplifier volume to " + level);
    }
    
    public void setSource(String source) {
        System.out.println("Setting amplifier source to " + source);
    }
}

class DVDPlayer {
    public void on() {
        System.out.println("DVD Player is ON");
    }
    
    public void off() {
        System.out.println("DVD Player is OFF");
    }
    
    public void play(String movie) {
        System.out.println("Playing DVD: " + movie);
    }
    
    public void stop() {
        System.out.println("Stopping DVD");
    }
    
    public void eject() {
        System.out.println("Ejecting DVD");
    }
}

class Projector {
    public void on() {
        System.out.println("Projector is ON");
    }
    
    public void off() {
        System.out.println("Projector is OFF");
    }
    
    public void setInput(String input) {
        System.out.println("Setting projector input to " + input);
    }
    
    public void wideScreenMode() {
        System.out.println("Projector in widescreen mode (16:9 aspect ratio)");
    }
}

class TheaterLights {
    public void on() {
        System.out.println("Theater Lights are ON");
    }
    
    public void off() {
        System.out.println("Theater Lights are OFF");
    }
    
    public void dim(int level) {
        System.out.println("Dimming lights to " + level + "%");
    }
}

class Screen {
    public void down() {
        System.out.println("Theater Screen going DOWN");
    }
    
    public void up() {
        System.out.println("Theater Screen going UP");
    }
}

class PopcornPopper {
    public void on() {
        System.out.println("Popcorn Popper is ON");
    }
    
    public void off() {
        System.out.println("Popcorn Popper is OFF");
    }
    
    public void pop() {
        System.out.println("Popping popcorn!");
    }
}

// Facade
class HomeTheaterFacade {
    private Amplifier amp;
    private DVDPlayer dvd;
    private Projector projector;
    private TheaterLights lights;
    private Screen screen;
    private PopcornPopper popper;
    
    public HomeTheaterFacade(Amplifier amp, DVDPlayer dvd, Projector projector, 
                            TheaterLights lights, Screen screen, PopcornPopper popper) {
        this.amp = amp;
        this.dvd = dvd;
        this.projector = projector;
        this.lights = lights;
        this.screen = screen;
        this.popper = popper;
    }
    
    public void watchMovie(String movie) {
        System.out.println("Get ready to watch a movie...");
        
        popper.on();
        popper.pop();
        
        lights.dim(10);
        screen.down();
        
        projector.on();
        projector.setInput("DVD");
        projector.wideScreenMode();
        
        amp.on();
        amp.setSource("DVD");
        amp.setVolume(5);
        
        dvd.on();
        dvd.play(movie);
        
        System.out.println("Movie started. Enjoy!");
    }
    
    public void endMovie() {
        System.out.println("Shutting down the home theater...");
        
        dvd.stop();
        dvd.eject();
        dvd.off();
        
        amp.off();
        
        projector.off();
        
        screen.up();
        
        lights.on();
        
        popper.off();
        
        System.out.println("Home theater powered down.");
    }
}

// Client code
public class HomeTheaterDemo {
    public static void main(String[] args) {
        // Initialize the subsystem components
        Amplifier amp = new Amplifier();
        DVDPlayer dvd = new DVDPlayer();
        Projector projector = new Projector();
        TheaterLights lights = new TheaterLights();
        Screen screen = new Screen();
        PopcornPopper popper = new PopcornPopper();
        
        // Create the facade
        HomeTheaterFacade homeTheater = new HomeTheaterFacade(amp, dvd, projector, lights, screen, popper);
        
        // Use the simplified interface
        homeTheater.watchMovie("Inception");
        
        System.out.println("\n--- Movie is playing ---\n");
        
        homeTheater.endMovie();
    }
}
```

## Facade Pattern-nin Üstünlükləri

1. **Simplicity**: Client-lər üçün mürəkkəb sistemləri sadələşdirir
2. **Decoupling**: Client-ləri alt sistemlərdən ayırır
3. **Layering**: Sistemləri layer-lərə bölməyə kömək edir
4. **Reduced Complexity**: Client code-un mürəkkəbliyini azaldır

## Facade Pattern-nin Çatışmazlıqları

1. **God Object**: Facade class-ı çox böyük və mürəkkəb ola bilər
2. **Limited Flexibility**: Bəzi hallarda alt sistemlərə birbaşa çıxış lazım ola bilər
3. **Abstraction Leakage**: Mürəkkəb alt sistemlərin detalları facade-dən sıza bilər

## Facade Pattern-nin İstifadə Sahələri

1. **Complex Libraries**: Mürəkkəb kitabxanaları sadələşdirmək
2. **Legacy Systems**: Legacy sistemlərə sadə interface təqdim etmək
3. **Subsystem Organization**: Alt sistemləri təşkil etmək və onlara çıxışı idarə etmək
4. **Layer Boundaries**: Sistem layer-ləri arasında interface yaratmaq

## Facade Pattern-nin Digər Pattern-lərlə Müqayisəsi

### Facade vs Adapter

- **Facade**: Mürəkkəb alt sistemlər üçün sadə interface yaradır
- **Adapter**: Mövcud interface-i başqa bir interface-ə çevirir

### Facade vs Mediator

- **Facade**: Alt sistemlər arasında one-way communication təqdim edir
- **Mediator**: Obyektlər arasında many-to-many communication təqdim edir

### Facade vs Proxy

- **Facade**: Mürəkkəb alt sistemlər üçün sadə interface yaradır
- **Proxy**: Başqa bir obyektin yerini tutur və ona çıxışı idarə edir

## Nəticə

Facade Design Pattern, mürəkkəb alt sistemlər üçün sadə interface təqdim edən güclü bir structural pattern-dir. Bu pattern, client-ləri alt sistemlərin mürəkkəbliyindən qoruyur və kod-un daha oxunaqlı və maintainable olmasını təmin edir. Facade pattern, xüsusilə mürəkkəb kitabxanalar, legacy sistemlər və layer boundaries kimi ssenarilər üçün faydalıdır. Bu pattern-in düzgün istifadəsi, kod-un daha modular və istifadəsi asan olmasını təmin edir.