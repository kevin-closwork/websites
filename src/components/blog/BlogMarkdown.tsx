import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

interface BlogMarkdownProps {
  markdown: string;
}

export function BlogMarkdown({ markdown }: BlogMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a({ href, children }) {
          if (href?.startsWith("/"))
            return (
              <Link to={href} className="text-primary font-medium underline-offset-4 hover:underline">
                {children}
              </Link>
            );
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
