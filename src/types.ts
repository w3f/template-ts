export interface TemplateData {
    [key: string]: string;
}

export interface TemplateManager {
    create(source: string, target: string, data: TemplateData): void;
}
