declare module 'sanitize-html' {
    interface Options {
        allowedTags?: string[];
        allowedAttributes?: {
            [key: string]: string[];
        };
        // Add other options here if needed
    }

    function sanitizeHtml(dirty: string, options?: Options): string;

    export default sanitizeHtml;
}
