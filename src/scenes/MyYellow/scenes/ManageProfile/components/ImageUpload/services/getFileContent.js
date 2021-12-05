/* globals document, FileReader, Image, */
import { v4 as uuid } from 'uuid';

const getScaledImg = async (image, { maxWidth, maxHeight }) => {
  // creates canvas and context
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // calculate scale
  let scale = maxWidth / image.naturalWidth;
  if (image.naturalWidth < image.naturalHeight) {
    scale = maxHeight / image.naturalHeight;
  }

  if (
    image.naturalWidth < maxWidth
    && image.naturalHeight < maxHeight
  ) {
    scale = 1;
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

const getFileContent = (file) => new Promise((resolve) => {
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
        maxWidth: 2048,
        maxHeight: 2048,
      });

      // resolve with scaled image
      resolve(scaledImgFile);
    };

    // loads image
    imgObj.src = e.target.result;
  };

  // reads file
  reader.readAsDataURL(file);
});

export default getFileContent;
