import React from 'react';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node, children) => {
      const { file } = node.data.target.fields;
      const mimeType = file['en-US'].contentType;
      const mimeGroup = mimeType.split('/')[0];

      switch (mimeGroup) {
        case 'application':
          return (
            <a
              href={file['en-US'].url}
              target="_blank"
              rel="noopener noreferrer"
            >{children}
            </a>
          );
        default:
          return <span style={{ backgroundColor: 'red', color: 'white' }}> {mimeType} embedded asset </span>;
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description, file } = node?.data?.target?.fields || {};
      const mimeType = file['en-US']?.contentType;
      const mimeGroup = mimeType.split('/')[0];

      switch (mimeGroup) {
        case 'image':
          return (
            <img
              title={title ? title['en-US'] : null}
              alt={description ? description['en-US'] : null}
              src={file['en-US'].url}
            />
          );
        case 'application':
          return (
            <a
              href={file['en-US'].url}
            >{ title ? title['en-US'] : file['en-US'].details.fileName }
            </a>
          );
        default:
          return <span style={{ backgroundColor: 'red', color: 'white' }}> {mimeType} embedded asset </span>;
      }
    },
  },
};

export default richTextOptions;
