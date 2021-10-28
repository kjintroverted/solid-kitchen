import { createSolidDataset, getSolidDataset, getThing, saveSolidDatasetAt, setThing } from "@inrupt/solid-client";
import { fetch, getDefaultSession, login, logout } from '@inrupt/solid-client-authn-browser'

let updateQ = [];

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

export function addToUpdateQueue(thing) {
  let i = updateQ.findIndex(e => thing.url === e.url);
  if (i < 0) updateQ = [...updateQ, thing];
  else updateQ.splice(i, 1, thing)

}

export function setAttr(thing, attribute, value) {
  thing = attribute.set(thing, attribute.predicate, value)
  addToUpdateQueue(thing)
  return thing;
}

export async function saveThing(thing) {
  let dataset = await getSolidDataset(resourceURL(thing.url), { fetch })
  dataset = setThing(dataset, thing);
  await saveSolidDatasetAt(resourceURL(thing.url), dataset, { fetch })
}

export async function save() {
  let res = await Promise.all(updateQ.map(saveThing));
  console.log("Saved:", res);
  return true;
}

function resourceURL(url) {
  return url.split('#')[0];
}