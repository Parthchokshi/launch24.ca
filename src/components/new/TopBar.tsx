import { Logo } from "@/components/new/Logo";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <Logo />
        <p className="status">
          <i aria-hidden />
          Taking new projects
        </p>
      </div>
    </div>
  );
}
