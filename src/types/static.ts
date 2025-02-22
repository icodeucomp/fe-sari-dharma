export interface footerListType {
  title: string;
  navigation: {
    subtitle: string;
    link: string;
  }[];
}

export interface navbarListType {
  title: string;
  link?: string;
  content?: { title: string; link: string }[];
}
