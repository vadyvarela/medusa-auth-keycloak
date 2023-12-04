type Type<T> = new (...args: any[]) => T;
export declare function PassportStrategy<T extends Type<any> = any>(Strategy: T, name?: string | undefined): {
    new (...args: any[]): InstanceType<T>;
};
export {};
//# sourceMappingURL=Strategy.d.ts.map