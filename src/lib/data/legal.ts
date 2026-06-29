import { site } from './site';

export interface LegalSection {
	id: string;
	title: string;
	content: string[];
}

export interface LegalPage {
	title: string;
	lastUpdated: string;
	sections: LegalSection[];
}

export const legal: Record<'privacy' | 'terms' | 'cookies', LegalPage> = {
	privacy: {
		title: 'Privacy Policy',
		lastUpdated: '2024-06-01',
		sections: [
			{
				id: 'controller',
				title: '1. Identity & Contact Details of the Data Controller',
				content: [
					`This Privacy Policy explains how ${site.companyLegalName} (trading as Áras Living) collects, uses, and protects your personal data.`,
					`Data controller: ${site.companyLegalName}`,
					'Registered address: TBC.',
					'Operational address: TBC.',
					`Email: ${site.email}`
				]
			},
			{
				id: 'dpo',
				title: '2. Data Protection Officer',
				content: [
					`${site.companyLegalName} is not currently required to appoint a Data Protection Officer under Article 37 GDPR. Questions about data protection should be directed to ${site.email}.`
				]
			},
			{
				id: 'categories',
				title: '3. Categories of Personal Data Collected',
				content: [
					'We collect personal data that you provide through our contact form or email. This may include your name, email address, optional phone number, project location, project type, budget range, message, and any files or images you choose to send.',
					'We also collect technical data via cookies and similar technologies when you browse our website, including IP address, browser type, device information, and pages visited.'
				]
			},
			{
				id: 'purposes',
				title: '4. Purposes & Legal Basis for Processing',
				content: [
					'We process your personal data for the following purposes and on the following legal bases:',
					'(a) To respond to enquiries and provide quotes — performance of pre-contractual measures or contract.',
					'(b) To manage enquiries, specifications, delivery and installation coordination — performance of contract.',
					'(c) To send occasional project updates or marketing communications — consent, which you can withdraw at any time.',
					'(d) To improve our website and understand visitor behaviour — legitimate interest, where consent is not required, or consent for non-essential cookies.'
				]
			},
			{
				id: 'recipients',
				title: '5. Recipients & Third-Party Processors',
				content: [
					'Your personal data may be shared with trusted third-party service providers who assist us in operating our business, such as form processing services, email providers, hosting platforms, and analytics providers.',
					'We do not sell your personal data. Any third-party processors are contractually bound to use your data only for the specified purposes and to protect it in accordance with GDPR.'
				]
			},
			{
				id: 'transfers',
				title: '6. International Transfers',
				content: [
					'Some of our processors may store or process data outside the European Economic Area. Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, or processing in countries recognised as providing an adequate level of protection.'
				]
			},
			{
				id: 'retention',
				title: '7. Retention Periods',
				content: [
					'We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected. Enquiry data is typically retained for up to two years unless you request deletion earlier.',
					'Project records, including contracts and correspondence, are retained for the duration required by applicable law.'
				]
			},
			{
				id: 'rights',
				title: '8. Your Data Subject Rights',
				content: [
					'Under GDPR, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data. You also have the right to data portability and to withdraw consent at any time.',
					`To exercise any of these rights, please contact us at ${site.email}. We will respond within one month of receiving your request.`
				]
			},
			{
				id: 'complaint',
				title: '9. Right to Lodge a Complaint',
				content: [
					'If you believe we have not handled your personal data in accordance with the law, you have the right to lodge a complaint with the Data Protection Commission of Ireland.',
					'Website: www.dataprotection.ie'
				]
			},
			{
				id: 'nature',
				title: '10. Voluntary Nature of Data & Automated Decision-Making',
				content: [
					'Providing your personal data is voluntary, but we may not be able to respond to your enquiry or proceed with a project without certain information.',
					'We do not use automated decision-making or profiling that produces legal or similarly significant effects on individuals.'
				]
			}
		]
	},
	terms: {
		title: 'Terms of Service',
		lastUpdated: '2024-06-01',
		sections: [
			{
				id: 'scope',
				title: '1. Scope of Services',
				content: [
					`Áras Living, operated by ${site.companyLegalName}, provides fitted cabinetry specification, delivery coordination and installation coordination for residential and commercial clients in Ireland.`,
					`All work is carried out subject to a written quotation and, where applicable, a signed contract between the client and ${site.companyLegalName}.`
				]
			},
			{
				id: 'quotations',
				title: '2. Quotations, Deposits & Payment Terms',
				content: [
					'Quotations are valid for 30 days unless otherwise stated. A deposit is required to confirm an order, with the balance payable according to the agreed payment schedule.',
					`Payments can be made by bank transfer. Title to goods remains with ${site.companyLegalName} until full payment has been received.`
				]
			},
			{
				id: 'lead-times',
				title: '3. Lead Times, Delivery & Installation',
				content: [
					'Estimated lead times are provided at quotation stage and begin once the deposit is received, designs are approved, and all necessary site access is confirmed.',
					'Delivery and installation dates are estimates. We will make reasonable efforts to meet them but are not liable for delays caused by circumstances beyond our control, including material shortages, site unpreparedness, or access restrictions.'
				]
			},
			{
				id: 'cancellations',
				title: '4. Cancellations & Refunds',
				content: [
					'Orders are prepared around an approved specification and cancellation terms will be confirmed in the written quotation or contract.',
					'If cancellation is requested after specification work has begun, any retained amount will be set out in the written quotation or contract.'
				]
			},
			{
				id: 'warranty',
				title: '5. Warranty on Workmanship',
				content: [
					'Warranty terms are TBC and will be confirmed in writing before publication.',
					'No public warranty claim should be treated as final until approved by the brand owner or legal adviser.'
				]
			},
			{
				id: 'liability',
				title: '6. Limitation of Liability',
				content: [
					'Our total liability arising from any contract shall not exceed the total contract value. We are not liable for indirect, consequential, or economic loss unless caused by our negligence or wilful misconduct.',
					'Clients are responsible for ensuring accurate measurements and site conditions are disclosed before manufacture begins.'
				]
			},
			{
				id: 'governing-law',
				title: '7. Governing Law & Jurisdiction',
				content: [
					'These Terms of Service are governed by the laws of Ireland. Any dispute arising from them shall be subject to the exclusive jurisdiction of the Irish courts.'
				]
			},
			{
				id: 'disputes',
				title: '8. Dispute Resolution',
				content: [
					'In the event of a dispute, both parties agree to attempt to resolve the matter through good-faith negotiation before initiating legal proceedings.',
					'Mediation may be used where appropriate to reach a binding or non-binding resolution.'
				]
			}
		]
	},
	cookies: {
		title: 'Cookie Policy',
		lastUpdated: '2024-06-01',
		sections: [
			{
				id: 'what-are-cookies',
				title: '1. What Are Cookies',
				content: [
					'Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences, understand how visitors use the site, and support marketing and analytics.'
				]
			},
			{
				id: 'categories',
				title: '2. Cookie Categories',
				content: [
					'Necessary cookies are essential for the website to function and cannot be switched off. They include cookies that maintain your session and remember cookie consent preferences.',
					'Analytics cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
					'Marketing cookies may be used to track visitors across websites to display relevant and engaging advertisements.'
				]
			},
			{
				id: 'cookie-table',
				title: '3. Cookies We Use',
				content: [
					`Cookie: aras-living-consent. Purpose: Stores your cookie consent preferences. Duration: 1 year. Controller: ${site.companyLegalName}.`,
					'Analytics or marketing cookies may be added later only after the relevant tools are confirmed and consent behaviour is approved.',
					'Google Analytics, Meta Pixel or similar services are TBC and should not be treated as active until configured.'
				]
			},
			{
				id: 'manage',
				title: '4. How to Manage or Withdraw Consent',
				content: [
					'You can change your cookie preferences at any time by clicking the cookie settings link in the footer or by adjusting the preferences below.',
					'You can also manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of the website.'
				]
			},
			{
				id: 'preferences',
				title: '5. Your Preferences',
				content: [
					'Use the cookie preference toggle on this page to accept or reject analytics and marketing cookies. Necessary cookies remain active to ensure the site works correctly.'
				]
			}
		]
	}
};
