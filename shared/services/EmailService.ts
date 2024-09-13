import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { WELCOME_EMAIL } from './email_templates/WelcomeEmail';
import { LIMIT_50_EMAIL } from './email_templates/Limit50Email';
import { LIMIT_90_EMAIL } from './email_templates/Limit90Email';
import { LIMIT_MAX_EMAIL } from './email_templates/LimitMaxEmail';
import { PURCHASE_EMAIL } from './email_templates/PurchaseEmail';


class EmailService {

    private apiInstance = new TransactionalEmailsApi();

    init(apiKey: string) {
        this.apiInstance.setApiKey(0, apiKey);
    }

    async sendLimitEmail50(target: string, projectName: string) {
        try {
            const sendSmtpEmail = new SendSmtpEmail();
            sendSmtpEmail.subject = "You've reached 50% limit on Litlyx";
            sendSmtpEmail.sender = { "name": "Litlyx", "email": "help@litlyx.com" };
            sendSmtpEmail.to = [{ "email": target }];

            sendSmtpEmail.htmlContent = LIMIT_50_EMAIL
                .replace(/\[Project Name\]/, projectName)
                .toString();

            await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return true;
        } catch (ex) {
            console.error('ERROR SENDING EMAIL', ex);
            return false;
        }
    }

    async sendLimitEmail90(target: string, projectName: string) {
        try {
            const sendSmtpEmail = new SendSmtpEmail();
            sendSmtpEmail.subject = "You've reached 90% limit on Litlyx";
            sendSmtpEmail.sender = { "name": "Litlyx", "email": "help@litlyx.com" };
            sendSmtpEmail.to = [{ "email": target }];
            sendSmtpEmail.htmlContent = LIMIT_90_EMAIL
                .replace(/\[Project Name\]/, projectName)
                .toString();
            await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return true;
        } catch (ex) {
            console.error('ERROR SENDING EMAIL', ex);
            return false;
        }
    }

    async sendLimitEmailMax(target: string, projectName: string) {
        try {
            const sendSmtpEmail = new SendSmtpEmail();
            sendSmtpEmail.subject = "You've reached your limit on Litlyx!";
            sendSmtpEmail.sender = { "name": "Litlyx", "email": "help@litlyx.com" };
            sendSmtpEmail.to = [{ "email": target }];
            sendSmtpEmail.htmlContent = LIMIT_MAX_EMAIL
                .replace(/\[Project Name\]/, projectName)
                .toString();
            await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return true;
        } catch (ex) {
            console.error('ERROR SENDING EMAIL', ex);
            return false;
        }
    }

    async sendWelcomeEmail(target: string) {
        try {
            const sendSmtpEmail = new SendSmtpEmail();
            sendSmtpEmail.subject = "Welcome to Litlyx!";
            sendSmtpEmail.sender = { "name": "Litlyx", "email": "help@litlyx.com" };
            sendSmtpEmail.to = [{ "email": target }];
            sendSmtpEmail.htmlContent = WELCOME_EMAIL;
            await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return true;
        } catch (ex) {
            console.error('ERROR SENDING EMAIL', ex);
            return false;
        }
    }

    async sendPurchaseEmail(target: string, projectName: string) {
        try {
            const sendSmtpEmail = new SendSmtpEmail();
            sendSmtpEmail.subject = "Thank You for Upgrading Your Litlyx Plan!";
            sendSmtpEmail.sender = { "name": "Litlyx", "email": "help@litlyx.com" };
            sendSmtpEmail.to = [{ "email": target }];
            sendSmtpEmail.htmlContent = PURCHASE_EMAIL
                .replace(/\[Project Name\]/, projectName)
                .toString();;
            await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return true;
        } catch (ex) {
            console.error('ERROR SENDING EMAIL', ex);
            return false;
        }
    }

}

const instance = new EmailService();
export default instance;