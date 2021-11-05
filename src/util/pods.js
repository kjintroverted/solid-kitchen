import {
  createSolidDataset,
  getSolidDataset,
  getThing,
  saveSolidDatasetAt,
  setThing,
  createThing,
  removeThing,
  getThingAll
} from "@inrupt/solid-client";
import { fetch, getDefaultSession, login, logout } from '@inrupt/solid-client-authn-browser'
import { nanoid } from "nanoid";

let updateQ = [];
let appDataSetURL;

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

export async function loadDataset(url = appDataSetURL) {
  appDataSetURL = url;
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

export function getThings(dataset) {
  return getThingAll(dataset)
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
  return { ...datum, thing };
}

export function addToUpdateQueue(thing) {
  let i = updateQ.findIndex(e => thing.url === e.url);
  if (i < 0) updateQ = [...updateQ, thing];
  else updateQ.splice(i, 1, thing)
}

export function newThing(name) {
  let id = `${ name }-${ nanoid() }`;
  return createThing({ name: id })
}

export function setAttr(thing, attribute, value) {
  thing = attribute.set(thing, attribute.predicate, value)
  return thing;
}

export function updateAttr(thing, attribute, value) {
  thing = attribute.set(thing, attribute.predicate, value)
  addToUpdateQueue(thing)
  return thing;
}

export async function saveThing(thing) {
  const dataURL = isTemp(thing.url) ? appDataSetURL : resourceURL(thing.url);
  let dataset = await getSolidDataset(dataURL, { fetch })
  dataset = setThing(dataset, thing);
  await saveSolidDatasetAt(dataURL, dataset, { fetch })
  return isTemp(thing.url) ?
    appDataSetURL + "#" + getThingNameFromTempURL(thing.url)
    : thing.url;
}

export async function deleteThing(thing) {
  const dataURL = resourceURL(thing.url);
  let dataset = await getSolidDataset(dataURL, { fetch })
  dataset = removeThing(dataset, thing);
  await saveSolidDatasetAt(dataURL, dataset, { fetch })
  return dataset;
}

export async function save() {
  let res = await Promise.all(updateQ.map(saveThing));
  console.log("Saved:", res);
  return true;
}

export function getDomain(url) {
  const regex = /https:\/\/([^,\s]+\.[^,\s]+?)(?=\/|,|\s|$|\?|#)/g;
  return regex.exec(url)[0];
}

export function nameFilter(str) {
  return thing => thing.url.indexOf(str) >= 0
}

function getThingNameFromTempURL(url) {
  return url.split('/').splice(-1);
}

function resourceURL(url) {
  return url.split('#')[0];
}

export function resourceName(url) {
  return url.split('#')[1];
}

function isTemp(url) {
  return url.indexOf('#') < 0;
}

export function getAndParse(get) {
  return (thing, url) => {
    let rawData = get(thing, url);
    return JSON.parse(rawData);
  }
}

export function stringifyAndSet(set) {
  return (thing, url, data) => {
    let value = JSON.stringify(data);
    return set(thing, url, value);
  }
}
