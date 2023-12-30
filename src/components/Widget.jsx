import React, { useEffect } from 'react';

function Widget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='widget'>
        <h2>News</h2>
      <a
        className="twitter-timeline"
        data-width="700"
        data-height="500"
        data-theme="light"
        href="https://twitter.com/MMAFighting?ref_src=twsrc%5Etfw"
      >
        Tweets by MMAFighting
      </a>
    </div>
  );
}

export default Widget;
