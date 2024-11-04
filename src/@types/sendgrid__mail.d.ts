declare module '@sendgrid/mail' {
    export interface MailData {
        to: string | string[];
        from: string;
        subject: string;
        text?: string;
        html?: string;
    }

    export interface SendGrid {
        setApiKey(apiKey: string): void;
        send(msg: MailData): Promise<void>;
    }

    const sgMail: SendGrid;
    export default sgMail;
}
