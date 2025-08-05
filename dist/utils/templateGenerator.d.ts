interface TemplateVars {
    featureName: string;
    componentName: string;
}
declare const templates: {
    page: string;
    component: string;
    actions: string;
    componentIndex: string;
};
export declare function generateTemplate(templateType: keyof typeof templates, filePath: string, vars: TemplateVars): Promise<void>;
export {};
//# sourceMappingURL=templateGenerator.d.ts.map