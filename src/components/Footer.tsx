import { Mail } from "lucide-react";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className="w-4 h-4"
      {...props}
    >
      <path
        d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.545 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.36.31.68.923.68 1.861 0 1.343-.012 2.427-.012 2.757 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
        stroke="currentColor"
        strokeWidth={1.5}
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="w-4 h-4"
      {...props}
    >
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-4 mt-12 flex flex-col items-center text-xs">
      <div className="flex items-center gap-4 mb-1">
        <a
          href="mailto:jsoncp@proton.me"
          className="flex items-center gap-1 hover:text-yellow-500 hover:brightness-125 dark:hover:text-yellow-400 transition"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          <span className="underline">Email</span>
        </a>
        <a
          href="https://github.com/jayson-panganiban"
          className="flex items-center gap-1 hover:text-yellow-500 hover:brightness-125 dark:hover:text-yellow-400 transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon />
          <span className="underline">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jayson-panganiban"
          className="flex items-center gap-1 hover:text-yellow-500 hover:brightness-125 dark:hover:text-yellow-400 transition"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
          <span className="underline">LinkedIn</span>
        </a>
      </div>
      <div className="mt-1">© {new Date().getFullYear()} PHZipCodes</div>
    </footer>
  );
}
