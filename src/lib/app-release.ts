export const APP_RELEASE_TARGET_ISO = "2026-07-25T00:00:00+05:00";
export const APP_RELEASE_TARGET_MS = new Date(APP_RELEASE_TARGET_ISO).getTime();
export const APP_RELEASE_DISPLAY_DATE = "July 25, 2026";
export const APP_RELEASE_DISPLAY_ZONE = "Asia/Tashkent";
export const APP_RELEASE_STORES_LABEL = "App Store + Google Play";

export function isAppReleaseLive(now = Date.now()) {
  return now >= APP_RELEASE_TARGET_MS;
}
