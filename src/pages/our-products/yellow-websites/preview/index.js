import React from 'react';
import Select from 'react-select';
import { Link } from 'gatsby';
import Button from '../../../../components/Button';

const previewURL = process.env.GATSBY_YELLOW_WEBSITES_PREVIEW_URL || 'https://yellow-sandbox.sites.next.yellow.co.nz/';

const YellowWebsitesFullscreenPreview = () => {
  const iframeRef = React.useRef();
  const [selectedTheme, setSelectedTheme] = React.useState();
  const fireMessageToYellowWebsitesPreviewSiteIframe = () => {
    iframeRef.current.contentWindow.postMessage(
      {
        website: {
          theme: selectedTheme,
        },
      },
      previewURL,
    );
  };

  const themes = [
    { label: 'Tradie', value: 'tradie' },
    { label: 'Rose', value: 'rose' },
    { label: 'Fresh', value: 'fresh' },
    { label: 'Pro', value: 'pro' },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="px-3 py-2 shadow-md bg-white z-20 flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-x-3 sm:space-y-0">
        <Link to="/">
          <img
            src="https://cdn11.bigcommerce.com/s-npte00i8ef/stencil/4a56d7a0-2da2-0137-892b-0242ac110005/e/2ebf55a0-80d9-0136-d2c6-7fd6dfdde2be/img/header-footer/yellow-logo.svg"
            alt="Yellow logo"
            className="h-4 sm:h-5"
          />
        </Link>
        <div className="flex items-center space-x-2">
          <Select
            options={themes}
            className="w-13 max-w-sm"
            onChange={(t) => {
              setSelectedTheme(t.value);
            }}
            placeholder="Pick a theme..."
          />
          <Button size="sm" onClick={fireMessageToYellowWebsitesPreviewSiteIframe}>
            Apply
          </Button>
        </div>
      </div>
      <div className="flex-1 z-10">
        <iframe title="Yellow Website Preview" src={previewURL} ref={iframeRef} className="h-full w-full border-none" />
      </div>
    </div>
  );
};

export default YellowWebsitesFullscreenPreview;
