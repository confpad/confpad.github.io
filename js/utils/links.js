const DOMAIN = 'https://confpad.io';

export const getConferenceDetailLink = (conferenceId, useDomain) => {
  let path = `/${conferenceId}`;

  return `${useDomain ? DOMAIN : ''}${path}`
};

export const getConferenceTalkLink = (conferenceId, talkId, useDomain) => {
  let path = `/${conferenceId}/${talkId}`;

  return `${useDomain ? DOMAIN : ''}${path}`
};
