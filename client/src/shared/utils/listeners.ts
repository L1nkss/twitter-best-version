export function listenerOn(
  obj: EventTarget,
  type: keyof DocumentEventMap,
  listener: EventListenerOrEventListenerObject,
  ...rest: any[]
): any {
  obj.addEventListener(type, listener, ...rest)
}

export function listenerOff(
  obj: EventTarget,
  type: keyof DocumentEventMap,
  listener: EventListenerOrEventListenerObject,
  ...rest: any[]
): any {
  obj.removeEventListener(type, listener, ...rest)
}
