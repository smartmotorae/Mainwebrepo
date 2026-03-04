import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Smart Motor',
    template: '%s | Smart Motor',
  },
  description: 'Authentication pages for Smart Motor.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
