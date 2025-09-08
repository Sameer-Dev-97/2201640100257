interface LogPayload {
    stack: "backend" | "frontend";
    level: "info" | "error" | "fatal";
    package: string;
    message: string;
}
export declare class Logger {
    private token;
    constructor(token: string);
    log(stack: LogPayload["stack"], level: LogPayload["level"], pkg: string, message: string): Promise<any>;
}
export {};
//# sourceMappingURL=index.d.ts.map