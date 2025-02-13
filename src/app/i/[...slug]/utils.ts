export function getIconByTemplate(name: string, body: string) {
  const componentName =
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/-([a-z])/g, (_, char) => char.toUpperCase());

  return `import type { SVGProps } from "react";

export function ${componentName}(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      ${body}
    </svg>
  );
}
`;
}
