/* globals FileReader, Image, document */

import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';

import Button from '../Button';
import Spinner from '../Spinner';
import AuthContext from '../Auth/AuthContext';
import dropfilesSrc from '../../assets/icons/light/dropfiles.svg';

import useStorage from '../../services/useStorage';

import BucketImage from '../BucketImage';

import { Wrapper, DropView } from './Styled';

const getScaledImg = async (image, { maxWidth, maxHeight }) => {
  // creates canvas and context
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // calculate scale
  let scale = maxWidth / image.naturalWidth;
  if (image.naturalWidth < image.naturalHeight) {
    scale = maxHeight / image.naturalHeight;
  }

  // top left position of the image in the canvas
  const dx = 0;
  const dy = 0;

  // bottom right position of the image in the canvas
  const dWidth = image.naturalWidth * scale;
  const dHeight = image.naturalHeight * scale;

  // set canvas size
  canvas.width = dWidth;
  canvas.height = dHeight;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, dWidth, dHeight);

  // draw in the canvas
  ctx.drawImage(image, dx, dy, dWidth, dHeight);

  return new Promise((resolve, reject) => {
    // transforms the canvas in a jpeg file
    canvas.toBlob((blob) => {
      if (!blob) {
        reject();
      }

      // eslint-disable-next-line no-param-reassign
      blob.lastModifiedDate = new Date();
      // eslint-disable-next-line no-param-reassign
      blob.name = `${uuid()}.jpg`;

      // returns the file
      resolve(blob);
    }, 'image/jpeg');
  });
};

const LogoInput = React.forwardRef((props, ref) => {
  const {
    onChange,
    formData,
  } = props;

  const { putToBucket } = useStorage();

  const authState = React.useContext(AuthContext);
  const [imgFile, setImgFile] = React.useState(null);
  const [isUploaded, setUploadedStatus] = React.useState(true);
  const [skipValue, setSkipValue] = React.useState(false);

  const dropHandler = (acceptedFiles) => {
    setUploadedStatus(false);
    onChange();
    // creates file reader
    const reader = new FileReader();

    // sets reader handler
    reader.onload = (e) => {
      // creates image object
      const imgObj = new Image();

      // sets image onload handler
      imgObj.onload = async () => {
        // scale image
        const scaledImgFile = await getScaledImg(imgObj, {
          maxWidth: 600,
          maxHeight: 600,
        });

        // save scaled image to inner component state
        setImgFile(scaledImgFile);
      };

      // loads image
      imgObj.src = e.target.result;
    };

    // reads file
    reader.readAsDataURL(acceptedFiles[0]);
  };

  // setup dropzone
  const onDrop = React.useCallback(dropHandler, []);
  const {
    getRootProps, getInputProps, isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
  });

  // push image to S3 and set caption
  React.useEffect(() => {
    if (
      !isUploaded
      && imgFile
      && authState.jwtToken
    ) {
      const getImageS3URL = async () => {
        const response = await putToBucket({
          ownerType: 'customers',
          fileName: 'logo-600x600.jpg',
          content: imgFile,
        });

        setUploadedStatus(true);

        onChange({
          caption: 'Company logo',
          contentUrl: response.contentUrl,
          width: '200 px',
          height: '200 px',
        });
      };
      getImageS3URL();
    }
  }, [authState.jwtToken, imgFile, isUploaded, onChange, putToBucket]);

  // communicates change to undefined if skip is selected
  React.useEffect(() => {
    if (skipValue) {
      onChange();
    }
  }, [onChange, skipValue]);

  return (
    <Wrapper
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...getRootProps()}
      onFocus={() => setSkipValue(false)}
      tabIndex={-1}
      ref={ref}
    >
      <input {...getInputProps()} />
      <DropView>

        { formData?.contentUrl ? (
          <BucketImage
            contentUrl={formData?.contentUrl}
            style={{ maxWidth: 200, maxHeight: 200 }}
          />
          ) : (
            <>
              { !isUploaded ? (
                <Spinner />
              ) : (
                <>
                  <img src={dropfilesSrc} alt="Drag & Drop files here" />
                  <h3>Drag & Drop files here</h3>
                  { !isDragActive && (
                  <>
                    <p>or</p>
                    <Button
                      type="button"
                      variant="tertiary"
                      outline="true"
                    >Browse files
                    </Button>
                  </>
                  )}
                  <p>130 x 130 px minimum</p>
                </>
              )}
            </>
          )}
      </DropView>
    </Wrapper>
  );
});

LogoInput.defaultProps = {
  formData: {},
};

LogoInput.propTypes = {
  formData: PropTypes.shape({
    contentUrl: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

export default LogoInput;
