import { renderToString } from "react-dom/server";
import PrerenderedApp from "@/prerender/PrerenderedApp";

export function renderPrerenderedRoute(pathname: string) {
  return renderToString(<PrerenderedApp pathname={pathname} />);
}
