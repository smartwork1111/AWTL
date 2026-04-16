// Define the interface
interface Database {
    connect(): void;
    disconnect(): void;
    query(sql: string): any;
}

// Implement the interface in a class
class MyDatabase implements Database {

    connect(): void {
        console.log("Database connected");
    }

    disconnect(): void {
        console.log("Database disconnected");
    }

    query(sql: string): any {
        console.log("Executing query:", sql);
        return "Query Result";
    }
}

// Example usage
const db = new MyDatabase();

db.connect();
db.query("SELECT * FROM users");
db.disconnect();