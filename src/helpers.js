export const qs = (selector) => document.querySelector(selector);
export const { get: nativeGetVolume, set: nativeSetVolume } = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "volume");
export const refreshVolume = (e = qs(".html5-video-player")) => e.setVolume(e.getVolume());
export const clampVolume = (volume, step = 0.01) => Math.round(volume / step) * step;
