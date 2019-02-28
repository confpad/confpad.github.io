const DOMAIN = 'https://confpad.io';


export const getConferenceTalk = (conferenceId, talkId, useDomain) => {
  let path = `/${conferenceId}/${talkId}`;

  return `${useDomain ? DOMAIN : ''}${path}`
};
