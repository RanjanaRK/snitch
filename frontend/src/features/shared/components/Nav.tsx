import { Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import type { RootState } from "../../../app/app.store";
import LogoutButton from "../../auth/components/LogoutButton";
import CategoryMenu from "./CategoryMenu";

const Nav = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      <nav
        className="animate-in fade-in slide-in-from-top-2 sticky top-0 z-50 border-b bg-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.03)] backdrop-blur-xl duration-1000"
        style={{ borderColor: "#e4e2df" }}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16 xl:px-24">
          <Link
            to="/"
            className="text-xl tracking-[0.3em] uppercase transition-all duration-500 hover:tracking-[0.4em] hover:text-[#D8B77B]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch.
          </Link>

          {/* Desktop Categories */}
          {user?.role === "buyer" && (
            <div className="hidden lg:block">
              <CategoryMenu />
            </div>
          )}

          <div
            className="flex items-center gap-3 text-[10px] font-medium uppercase md:gap-6"
            style={{ color: "#7A6E63" }}
          >
            {user ? (
              <>
                <span className="hidden lg:block">{user.fullname}</span>

                {user.role === "buyer" && (
                  <>
                    <Link to="/wishlist">
                      <Heart
                        size={18}
                        className="transition-all duration-500 hover:-translate-y-0.5 hover:text-red-500"
                      />
                    </Link>

                    <Link
                      to="/cart"
                      className="group relative flex items-center transition-all duration-300 hover:-translate-y-0.5"
                      style={{ color: "#1b1c1a" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="transition-colors duration-300 group-hover:text-[#C9A96E]"
                      >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>

                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A96E] text-[9px] text-white">
                          {cartItems.length > 9 ? "9+" : cartItems.length}
                        </span>
                      )}
                    </Link>
                  </>
                )}

                {user.role === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    // className="hidden hover:text-[#C9A96E] md:block"
                    className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-500 hover:after:w-full"
                  >
                    Dashboard
                  </Link>
                )}

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-500 hover:after:w-full"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-500 hover:after:w-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE CATEGORY BAR */}
        {user?.role === "buyer" && (
          <div
            className="animate-in fade-in slide-in-from-top-2 border-t duration-1000 lg:hidden"
            // className="animate-in fade-in border-t duration-1000 lg:hidden"
          >
            <div className="overflow-x-auto px-4 py-3">
              <CategoryMenu />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
