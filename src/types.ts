export interface Template<T> {
    create(source: string, target: string, data: T): void;
}
