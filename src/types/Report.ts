export type Report = {
  rid: string;
  title: string;
  reportLogo: string;
  pubdate: string;
  fileRo: string;
  fileEn: string;
  fileRu: string;
};

export type ReportDetails = Report & {
  shortDescription: '<p><strong>For example</strong>, your internet router may be located at 10.0.0.1 and it is serving your local network, 10.0.0.0/8. However, you have a 172.16.5.0 /24 network that is accessible only through a secondary router, which has the IP address 10.0.0.101 on the main network. Therefore, you need to point your OS to the secondary router for any IP addresses located in the 172.16.5.0-255 address space. To do this, you need to add a static route.</p>\r\n';
};
