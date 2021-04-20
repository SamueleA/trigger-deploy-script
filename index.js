const fetch = require('node-fetch');

const triggerDeploy = async () => {
  // get site id
  const siteSlug = 'super-voice-5459';

  const getSiteVariables = {
    slug: siteSlug,
  };
  const siteResult = await fetch("https://api.fleek.co/graphql", {
    method: "POST",
    headers: {
      authorization: process.env.FLEEK_STORAGE_API_KEY,
    },
    body: JSON.stringify({
      query: `
        query getSiteBySlug($slug: String!) {
          getSiteBySlug(slug: $slug) {
            id
          }
        }
      `,
      variables: getSiteVariables,
    }),
  });
  const jsonResult = await siteResult.json();
  const siteData = jsonResult.data;
  const siteId = siteData.getSiteBySlug.id;

  // trigger deploy with site Id
  const triggerDeploy = {
    siteId,
  };

  await fetch("https://api.fleek.co/graphql", {
    method: "POST",
    headers: {
      authorization: process.env.FLEEK_STORAGE_API_KEY,
    },
    body: JSON.stringify({
      query: `
        mutation triggerDeploy($siteId: ID!) {
          triggerDeploy(siteId: $siteId) {
            id
          }
        }
      `,
      variables: triggerDeploy,
    }),
  });

  console.log('You have succesfully created a new deployment!');
};

triggerDeploy();