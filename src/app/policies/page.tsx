import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

type PolicyPageProps = {
  params: { policy: string };
};

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { policy } = params;
  
  const pageTitles: Record<string, string> = {
    'privacy': 'Privacy Policy',
    'terms': 'Terms & Conditions',
    'shipping': 'Shipping Policy',
    'cancellation-refund': 'Cancellation & Refund Policy'
  };

  const title = pageTitles[policy] || 'Page Not Found';
  
  return {
    title: `${title} | ABU Accessories`,
    description: `View our ${title.toLowerCase()} for ABU Accessories.`,
  };
}

// Dynamically import the policy components with no SSR
const policyComponents = {
  'privacy': dynamic(() => import('@/pages/policies/PrivacyPolicy'), { ssr: false }),
  'terms': dynamic(() => import('@/pages/policies/TermsAndConditions'), { ssr: false }),
  'shipping': dynamic(() => import('@/pages/policies/ShippingPolicy'), { ssr: false }),
  'cancellation-refund': dynamic(() => import('@/pages/policies/CancellationRefundPolicy'), { ssr: false }),
} as const;

export default function PolicyPage({ params }: PolicyPageProps) {
  const { policy } = params;
  
  const PolicyComponent = policy in policyComponents 
    ? policyComponents[policy as keyof typeof policyComponents]
    : null;

  if (!PolicyComponent) {
    notFound();
  }

  return <PolicyComponent />;
}
