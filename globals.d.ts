export {};

declare global {
  interface Navigator {
    connection?: {
      effectiveType: string;
    };
  }
}
