import React, { useEffect, useRef, useState } from 'react';

interface ReactCodepenProps {
  defaultTab?: string;
  hash: string;
  height?: number;
  loader?:
    | React.ElementType
    | ((props: { isLoading: boolean; error?: string }) => React.ReactNode);
  preview?: boolean;
  editable?: boolean;
  title?: string;
  themeId?: string | number;
  user: string;
  version?: number;
}

const SCRIPT_URL = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
const LOAD_STATE = {
  booting: '__booting__',
  error: '__error__',
  loading: '__loading__',
  loaded: '__loaded__',
};

const Codepen: React.FC<ReactCodepenProps> = ({
  defaultTab = 'css,result',
  hash,
  height = 300,
  loader,
  preview = true,
  editable = false,
  title,
  themeId = 'dark',
  user,
  version = 2,
}) => {
  const [loadState, setLoadState] = useState(LOAD_STATE.booting);
  const [error, setError] = useState<string>();
  const _isMounted = useRef(false);

  const loadScript = () => {
    // load the codepen embed script
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      // do not do anything if the component is already unmounted.
      if (!_isMounted.current) return;
      setLoadState(LOAD_STATE.loaded);
    };
    script.onerror = () => {
      if (!_isMounted.current) return;
      setLoadState(LOAD_STATE.error);
      setError('Failed to load the pen');
    };

    setLoadState(LOAD_STATE.loading);
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!_isMounted.current) _isMounted.current = true;

    loadScript();

    return () => {
      _isMounted.current = false;
    };
  }, []);

  const showLoader = loadState === LOAD_STATE.loading && loader !== undefined;
  const penLink = `https://codepen.io/${user}/pen/${hash}/`;
  const userProfileLink = `https://codepen.io/${user}`;
  const visibilityClass =
    loadState === LOAD_STATE.loaded ? 'visible' : 'invisible';

  return (
    <React.Fragment>
      {showLoader &&
        React.createElement(loader, {
          isLoading: loadState === LOAD_STATE.loading,
          error,
        })}

      <p
        className={`codepen ${visibilityClass}`}
        data-default-tab={defaultTab}
        data-editable={editable}
        data-embed-version={version}
        data-height={height}
        data-pen-title={title}
        data-preview={preview}
        data-slug-hash={hash}
        data-theme-id={themeId}
        data-user={user}
      >
        See the Pen <a href={penLink}>{title}</a>
        by {user} (<a href={userProfileLink}>@{user}</a>) on{' '}
        <a href="https://codepen.io">CodePen</a>.
      </p>
    </React.Fragment>
  );
};

export default Codepen;
