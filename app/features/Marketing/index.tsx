import { CTA } from '~/components/CTA';
import { Container } from '~/components/Container';
import { Hero } from '~/components/Hero';
import { Logos } from '~/components/Logos';
import { NewsletterSignUp } from '~/components/NewsletterSignUp';

import { Features } from './components/Features';

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
