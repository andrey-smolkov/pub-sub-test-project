class Logger {
    log(...args: any[]) {
        console.log(...args);
    }

    error(...args: any[]) {
        console.error(...args);
    }
}

export const logger = new Logger();
