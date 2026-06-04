export type AccountType = 'github' | 'linkedIn' | 'xtwitter' | 'gmail';

export interface SocialLinkModel {
  accountType: AccountType;
  socialLink: string;
  ariaLabel: string;
}

export const SOCIALS: SocialLinkModel[] = [
  {
    accountType: 'github',
    socialLink: 'https://github.com/antipotion',
    ariaLabel: 'Visit Antipotion\'s Github',
  },
  {
    accountType: 'linkedIn',
    socialLink: 'https://linkedin.com/in/cris-john-tunacao',
    ariaLabel: 'Visit Antipotion\'s LinkedIn',
  },
  {
    accountType: 'xtwitter',
    socialLink: 'https://x.com/antipotion',
    ariaLabel: 'Visit Antipotion\'s XTwitter',
  },
  {
    accountType: 'gmail',
    socialLink: 'mailto:hello.antipotion@gmail.com',
    ariaLabel: 'Send message to Antipotion\'s Gmail',
  }
];
