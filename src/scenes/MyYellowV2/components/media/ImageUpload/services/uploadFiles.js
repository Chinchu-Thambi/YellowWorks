
/** @type {(
 * files: File[],
 * presignedPosts: Object.<string, {
 *   id: string,
 *   url: string,
 *   presignedPost: {
 *     fields: string
 *     url: string
 *   }
 * }>
 * ) => { file: File, id: string, url: string }[]} */
const uploadFiles = (files, presignedPosts) => Promise.all(files.map(
  async (file) => {
    const { id, url, presignedPost } = presignedPosts[file.name];
    const fields = JSON.parse(presignedPost.fields);

    // Generate form data
    const formData = new FormData();
    formData.append('Content-Type', file.type);
    Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
    formData.append('file', file);

    // Upload file
    await fetch(
      presignedPost.url,
      { method: 'POST', body: formData },
    );

    return {
      file,
      id,
      url,
    };
  },
));

export default uploadFiles;
