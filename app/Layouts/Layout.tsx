import React, { ReactNode, useEffect } from 'react';

import { ColorModeToggle } from '~/components/ColorModeToggle/ColorModeToggle';
import { Footer } from '~/components/Footer';
import { Navbar } from '~/components/Navbar';
import { Theme, useTheme } from '~/utils/theme.provider';

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme: Theme | null) =>
      !prevTheme || prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove(Theme.LIGHT, Theme.DARK);
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <section className={'relative pb-4'}>
      <Navbar>
        <ColorModeToggle theme={theme} onClick={toggleTheme} />
      </Navbar>
      {children}
      <Footer className={'mt-10'} />
    </section>
  );
}
