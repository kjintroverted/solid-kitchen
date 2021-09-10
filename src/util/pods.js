import { createSolidDataset, getSolidDataset, getThing, saveSolidDatasetAt, setThing } from "@inrupt/solid-client";
import { fetch, getDefaultSession, login, logout } from '@inrupt/solid-client-authn-browser'

export async function appLogin() {
  await login({
    oidcIssuer: "https://inrupt.net",
    redirectUrl: window.location.href,
    clientName: "Solid Movies"
  });
}

export async function initDataset(url) {
  let dataset = createSolidDataset();
  dataset = await saveSolidDatasetAt(url, dataset, { fetch })
  return dataset;
}

export async function loadDataset(url) {
  let dataset;
  try {
    dataset = await getSolidDataset(url, { fetch })
  } catch (e) {
    if (e.toString().indexOf("404") > 0) {
      console.info("Could not find dataset at", url);
      console.info("Attempting to create dataset at", url);
      dataset = await initDataset(url);
    } else {
      throw e;
    }
  }
  return dataset;
}

export async function loadThing(url, struct) {
  if (!getDefaultSession().info.isLoggedIn) {
    logout()
    return new Error("Session Expired. Please Login.");
  }
  const dataset = await getSolidDataset(url.split('#')[0], { fetch })
  const thing = getThing(dataset, url)
  let datum = {};
  for (let field in struct) {
    let attribute = struct[field]
    datum[field] = attribute.parse(thing, attribute.predicate)
  }
  return [thing, datum];
}

// TODO: needs feedback
export async function saveThing(thing, data, struct) {
  let dataset = await getSolidDataset(resourceURL(thing.url), { fetch })
  for (let field in struct) {
    if (!data[field]) continue;
    const attribute = struct[field];
    thing = attribute.set(thing, attribute.predicate, data[field])
  }
  dataset = setThing(dataset, thing);
  await saveSolidDatasetAt(resourceURL(thing.url), dataset, { fetch })
}

function resourceURL(url) {
  return url.split('#')[0];
}