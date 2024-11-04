import sanitizeHtml from 'sanitize-html';


const safeHtml = (dirtyHtml: string): string => {
    return sanitizeHtml(dirtyHtml, {
        allowedTags: [ 'strong', 'p', 'a', 'br'],
        allowedAttributes: {
            'a': ['href', 'target']
        }
    });
};

export default safeHtml;
