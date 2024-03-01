import React from 'react';

import { CTA } from '~/components/CTA';
import { Container } from '~/components/Container';
import { Hero } from '~/components/Hero';
import { NewsletterSignUp } from '~/components/NewsletterSignUp';

import { Features } from './components/Features';

const Logos = React.lazy(() => import('~/components/Logos'));

export function Marketing() {
  return (
    <Container>
      <Hero />
      <Features />
      <CTA />
      <Logos />
      <NewsletterSignUp />
    </Container>
  );
}
