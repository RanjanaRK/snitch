import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../../../app/app.store";

const Nav = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      <nav
        className="flex items-center justify-between border-b px-8 pt-10 pb-6 lg:px-16 xl:px-24"
        style={{ borderColor: "#e4e2df" }}
      >
        <Link
          to="/"
          className="text-sm font-medium tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#C9A96E",
          }}
        >
          Snitch.
        </Link>
        <div
          className="flex items-center gap-6 text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: "#7A6E63" }}
        >
          {user ? (
            <>
              <span style={{ color: "#1b1c1a" }}>{user.fullname}</span>
              {user.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="transition-colors hover:text-[#C9A96E]"
                >
                  Seller Dashboard
                </Link>
              )}
              <Link
                to="/cart"
                className="relative flex items-center transition-opacity hover:opacity-70"
                style={{ color: "#1b1c1a" }}
                aria-label="Shopping cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartItems?.length > 0 && (
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white"
                    style={{
                      backgroundColor: "#C9A96E",
                      width: "16px",
                      height: "16px",
                      fontSize: "9px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      letterSpacing: 0,
                    }}
                  >
                    {cartItems.length > 9 ? "9+" : cartItems.length}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="transition-colors hover:text-[#C9A96E]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="transition-colors hover:text-[#C9A96E]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
