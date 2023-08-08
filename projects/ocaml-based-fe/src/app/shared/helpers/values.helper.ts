export const hasValue = (value: any): boolean => {
  return value !== undefined && value !== null;
}

export function any(arg: any): any {
  return arg as any;
}
export const isMobile = (): boolean => window.innerWidth <= 768;
export const isDesktop = (): boolean => !isMobile();
