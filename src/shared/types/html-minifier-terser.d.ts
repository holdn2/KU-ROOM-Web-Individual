declare module "html-minifier-terser" {
  export function minify(input: string, options?: any): Promise<string>;
}
