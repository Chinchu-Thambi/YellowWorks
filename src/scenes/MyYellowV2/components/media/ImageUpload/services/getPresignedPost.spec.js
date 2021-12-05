
import axios from 'axios';

import getPresignedPost from './getPresignedPost';

describe('getPresignedPost', () => {
  const customerId = 'my customer id';
  const files = [
    new File([''], 'my file'),
    new File([''], 'my second file'),
  ];
  const token = 'my token';
  const presignedPostResponse = {
    CreatePresignedPost_myfile: {
      id: 'id 1',
      path: `path 1/${files[0].name}`,
      presignedPost: {
        fields: JSON.stringify({
          key: 'a9ffc924d2bb47c7a56e938e0442ce4b4339b95bd38eaeb4a9909154dcaf07c7/dwCdzfDPVBWknT6YsYVwq/example.txt',
          AWSAccessKeyId: 'ASIAUYJPDPCYIQTAEDUR',
          'x-amz-security-token': 'IQoJb3JpZ2luX2VjEFkaDmFwLXNvdXRoZWFzdC0yIkcwRQIgRP419BHpjZWyGLRHRpt5dp72G7nKS6ueQOdn0o3Nb+QCIQDfNISpyu6ZEYJ7hzBzs0Sbc4yAHVfZSYt9O4e1w2iVpyroAQgiEAIaDDMyNzA1MzE3OTA1NiIMLcdgtGwKTBPIDCbUKsUB7uKzx6TL3XGNSr3tJWUXLCNbpzHVmYJ7KwzthU1NqiTFsznD9GA78IqiW22E3ib91kk8Xb8XeCxoegsYvZP2zIq0iensVkiKHQCwPqqWhqA7Qz6mGsN4nwUOBhZI9v8S7OnNgtkLhOlwjBBksAgzyMwm4/bh+U6ENfCcTr6d9ZGZjhVjq0fQXtmFCdqHfpEVN7v2HlaVaxERsKtGLkSxk0279E0TN+wvzRQSzB8Z5pF4vMaYOKtzySXzrdZ6u7iH+SoNXnkwrYnU/wU64AESf1td+w+Q0t8zGhX1ttB/1IvFwCV1M2OVoImELeePuzX/Zb7bGQFzpUrKy0r7TK2RIQB6YLtLRltQEMyvUlDkY+8XmyB049GUNBjSxG7RGGZOjrhXuYO8cYlFTCimDBMc6rAWmNYg1ouvYrLkDpJGGFnjp/XI4Lmy0ev1Farab0GjoXRS7JJO6F11lgwKt5sM32Nnai0U93SIt3GVVosJYAwDd5WZKIR0OOKiNXgC/+nOo/fCR5wCnobUhBlM3zFiBxOIzwghpRCh1cQRsvBGJu7kEse/MrQxoNKblhsqSA==',
          policy: 'eyJleHBpcmF0aW9uIjogIjIwMjEtMDEtMDZUMDA6MzU6MzhaIiwgImNvbmRpdGlvbnMiOiBbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDEwMDAwMDAwXSwgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLCB7ImJ1Y2tldCI6ICJ5ZWxsb3duei1zYW5kYm94LWFwLXNvdXRoZWFzdC0yLWN1c3RvbWVyLWNvbnRlbnQtYzI2M2IwNSJ9LCB7ImtleSI6ICJhOWZmYzkyNGQyYmI0N2M3YTU2ZTkzOGUwNDQyY2U0YjQzMzliOTViZDM4ZWFlYjRhOTkwOTE1NGRjYWYwN2M3L2R3Q2R6ZkRQVkJXa25UNllzWVZ3cS9leGFtcGxlLnR4dCJ9LCB7IngtYW16LXNlY3VyaXR5LXRva2VuIjogIklRb0piM0pwWjJsdVgyVmpFRmthRG1Gd0xYTnZkWFJvWldGemRDMHlJa2N3UlFJZ1JQNDE5QkhwalpXeUdMUkhScHQ1ZHA3Mkc3bktTNnVlUU9kbjBvM05iK1FDSVFEZk5JU3B5dTZaRVlKN2h6QnpzMFNiYzR5QUhWZlpTWXQ5TzRlMXcyaVZweXJvQVFnaUVBSWFERE15TnpBMU16RTNPVEExTmlJTUxjZGd0R3dLVEJQSURDYlVLc1VCN3VLeng2VEwzWEdOU3IzdEpXVVhMQ05icHpIVm1ZSjdLd3p0aFUxTnFpVEZzem5EOUdBNzhJcWlXMjJFM2liOTFrazhYYjhYZUN4b2Vnc1l2WlAyeklxMGllbnNWa2lLSFFDd1BxcVdocUE3UXo2bUdzTjRud1VPQmhaSTl2OFM3T25OZ3RrTGhPbHdqQkJrc0FnenlNd200L2JoK1U2RU5mQ2NUcjZkOVpHWmpoVmpxMGZRWHRtRkNkcUhmcEVWTjd2MkhsYVZheEVSc0t0R0xrU3hrMDI3OUUwVE4rd3Z6UlFTekI4WjVwRjR2TWFZT0t0enlTWHpyZFo2dTdpSCtTb05Ybmt3clluVS93VTY0QUVTZjF0ZCt3K1EwdDh6R2hYMXR0Qi8xSXZGd0NWMU0yT1ZvSW1FTGVlUHV6WC9aYjdiR1FGenBVckt5MHI3VEsyUklRQjZZTHRMUmx0UUVNeXZVbERrWSs4WG15QjA0OUdVTkJqU3hHN1JHR1pPanJoWHVZTzhjWWxGVENpbURCTWM2ckFXbU5ZZzFvdXZZckxrRHBKR0dGbmpwL1hJNExteTBldjFGYXJhYjBHam9YUlM3SkpPNkYxMWxnd0t0NXNNMzJObmFpMFU5M1NJdDNHVlZvc0pZQXdEZDVXWktJUjBPT0tpTlhnQy8rbk9vL2ZDUjV3Q25vYlVoQmxNM3pGaUJ4T0l6d2docFJDaDFjUVJzdkJHSnU3a0VzZS9NclF4b05LYmxoc3FTQT09In1dfQ==',
          signature: '4CUeRfHhAJuODwtF7H0G7ujesiU=',
        }),
        url: 'presigned url 1',
      },
      url: 'url 1',
    },
    CreatePresignedPost_mysecondfile: {
      id: 'id 2',
      path: `path 2/${files[1].name}`,
      presignedPost: {
        fields: JSON.stringify({
          key: 'a9ffc924d2bb47c7a56e938e0442ce4b4339b95bd38eaeb4a9909154dcaf07c7/dwCdzfDPVBWknT6YsYVwq/example.txt',
          AWSAccessKeyId: 'ASIAUYJPDPCYIQTAEDUR',
          'x-amz-security-token': 'IQoJb3JpZ2luX2VjEFkaDmFwLXNvdXRoZWFzdC0yIkcwRQIgRP419BHpjZWyGLRHRpt5dp72G7nKS6ueQOdn0o3Nb+QCIQDfNISpyu6ZEYJ7hzBzs0Sbc4yAHVfZSYt9O4e1w2iVpyroAQgiEAIaDDMyNzA1MzE3OTA1NiIMLcdgtGwKTBPIDCbUKsUB7uKzx6TL3XGNSr3tJWUXLCNbpzHVmYJ7KwzthU1NqiTFsznD9GA78IqiW22E3ib91kk8Xb8XeCxoegsYvZP2zIq0iensVkiKHQCwPqqWhqA7Qz6mGsN4nwUOBhZI9v8S7OnNgtkLhOlwjBBksAgzyMwm4/bh+U6ENfCcTr6d9ZGZjhVjq0fQXtmFCdqHfpEVN7v2HlaVaxERsKtGLkSxk0279E0TN+wvzRQSzB8Z5pF4vMaYOKtzySXzrdZ6u7iH+SoNXnkwrYnU/wU64AESf1td+w+Q0t8zGhX1ttB/1IvFwCV1M2OVoImELeePuzX/Zb7bGQFzpUrKy0r7TK2RIQB6YLtLRltQEMyvUlDkY+8XmyB049GUNBjSxG7RGGZOjrhXuYO8cYlFTCimDBMc6rAWmNYg1ouvYrLkDpJGGFnjp/XI4Lmy0ev1Farab0GjoXRS7JJO6F11lgwKt5sM32Nnai0U93SIt3GVVosJYAwDd5WZKIR0OOKiNXgC/+nOo/fCR5wCnobUhBlM3zFiBxOIzwghpRCh1cQRsvBGJu7kEse/MrQxoNKblhsqSA==',
          policy: 'eyJleHBpcmF0aW9uIjogIjIwMjEtMDEtMDZUMDA6MzU6MzhaIiwgImNvbmRpdGlvbnMiOiBbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDEwMDAwMDAwXSwgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdLCB7ImJ1Y2tldCI6ICJ5ZWxsb3duei1zYW5kYm94LWFwLXNvdXRoZWFzdC0yLWN1c3RvbWVyLWNvbnRlbnQtYzI2M2IwNSJ9LCB7ImtleSI6ICJhOWZmYzkyNGQyYmI0N2M3YTU2ZTkzOGUwNDQyY2U0YjQzMzliOTViZDM4ZWFlYjRhOTkwOTE1NGRjYWYwN2M3L2R3Q2R6ZkRQVkJXa25UNllzWVZ3cS9leGFtcGxlLnR4dCJ9LCB7IngtYW16LXNlY3VyaXR5LXRva2VuIjogIklRb0piM0pwWjJsdVgyVmpFRmthRG1Gd0xYTnZkWFJvWldGemRDMHlJa2N3UlFJZ1JQNDE5QkhwalpXeUdMUkhScHQ1ZHA3Mkc3bktTNnVlUU9kbjBvM05iK1FDSVFEZk5JU3B5dTZaRVlKN2h6QnpzMFNiYzR5QUhWZlpTWXQ5TzRlMXcyaVZweXJvQVFnaUVBSWFERE15TnpBMU16RTNPVEExTmlJTUxjZGd0R3dLVEJQSURDYlVLc1VCN3VLeng2VEwzWEdOU3IzdEpXVVhMQ05icHpIVm1ZSjdLd3p0aFUxTnFpVEZzem5EOUdBNzhJcWlXMjJFM2liOTFrazhYYjhYZUN4b2Vnc1l2WlAyeklxMGllbnNWa2lLSFFDd1BxcVdocUE3UXo2bUdzTjRud1VPQmhaSTl2OFM3T25OZ3RrTGhPbHdqQkJrc0FnenlNd200L2JoK1U2RU5mQ2NUcjZkOVpHWmpoVmpxMGZRWHRtRkNkcUhmcEVWTjd2MkhsYVZheEVSc0t0R0xrU3hrMDI3OUUwVE4rd3Z6UlFTekI4WjVwRjR2TWFZT0t0enlTWHpyZFo2dTdpSCtTb05Ybmt3clluVS93VTY0QUVTZjF0ZCt3K1EwdDh6R2hYMXR0Qi8xSXZGd0NWMU0yT1ZvSW1FTGVlUHV6WC9aYjdiR1FGenBVckt5MHI3VEsyUklRQjZZTHRMUmx0UUVNeXZVbERrWSs4WG15QjA0OUdVTkJqU3hHN1JHR1pPanJoWHVZTzhjWWxGVENpbURCTWM2ckFXbU5ZZzFvdXZZckxrRHBKR0dGbmpwL1hJNExteTBldjFGYXJhYjBHam9YUlM3SkpPNkYxMWxnd0t0NXNNMzJObmFpMFU5M1NJdDNHVlZvc0pZQXdEZDVXWktJUjBPT0tpTlhnQy8rbk9vL2ZDUjV3Q25vYlVoQmxNM3pGaUJ4T0l6d2docFJDaDFjUVJzdkJHSnU3a0VzZS9NclF4b05LYmxoc3FTQT09In1dfQ==',
          signature: '4CUeRfHhAJuODwtF7H0G7ujesiU=',
        }),
        url: 'presigned url 2',
      },
      url: 'url 2',
    },
  };

  beforeAll(() => {
    axios.post.mockResolvedValue({
      data: { data: { ...presignedPostResponse } },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an object keyed by file name', async () => {
    const presignedPosts = await getPresignedPost(token, customerId)(files);

    expect(axios.post.mock.calls[0][1].query).toContain(`"${customerId}"`);
    expect(axios.post.mock.calls[0][1].query).toContain(Object.keys(presignedPostResponse)[0]);
    expect(axios.post.mock.calls[0][1].query).toContain(`"${files[0].name}"`);
    expect(axios.post.mock.calls[0][1].query).toContain(Object.keys(presignedPostResponse)[1]);
    expect(axios.post.mock.calls[0][1].query).toContain(`"${files[1].name}"`);
    expect(axios.post.mock.calls[0][2].headers.Authorization).toBe(token);

    files.forEach((file) => {
      expect(presignedPosts[file.name].file.name).toBe(file.name);
      expect(presignedPosts[file.name].file.name).toBeTruthy();
      expect(presignedPosts[file.name].id).toBeTruthy();
      expect(presignedPosts[file.name].path).toBeTruthy();
      expect(presignedPosts[file.name].presignedPost.fields).toBeTruthy();
      expect(presignedPosts[file.name].presignedPost.url).toBeTruthy();
      expect(presignedPosts[file.name].url).toBeTruthy();
    });
  });
});
