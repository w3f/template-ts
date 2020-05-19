export interface TemplateManager<T> {
    create(source: string, target: string, data: T): void;
}
