import { Link, useNavigate } from "react-router-dom";
import {
  FolderGit,
  History,
  Home,
  LayoutGrid,
  LogOut,
  MessageSquareMore,
  Package2,
  PanelLeft,
  PencilRuler,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Dashboard from "./sub-componets/Dashboard";
import AddSkills from "./sub-componets/AddSkills";
import AddBlog from "./sub-componets/AddBlog";
import AddSoftware from "./sub-componets/AddSoftware";
import Account from "./sub-componets/Account";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import Messages from "./sub-componets/Message";
import AddTimeline from "./sub-componets/AddTimeline";

const HomePage = () => {
  const [active, setActive] = useState("");
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };
  const navigateTo = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Dashboard"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Blog"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Blog")}
                >
                  <FolderGit className="h-5 w-5" />
                  <span className="sr-only">Add Blog</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Blog</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Skill"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Skill")}
                >
                  <PencilRuler className="h-5 w-5" />
                  <span className="sr-only">Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Software"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Software")}
                >
                  <LayoutGrid className="h-5 w-5" />
                  <span className="sr-only">Add Software</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Software</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Timeline"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  <span className="sr-only">Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Messages"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Account"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Account")}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Dashboard"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Dashboard")}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Blog"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Add Blog")}
              >
                <FolderGit className="h-5 w-5" />
                Add Blog
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Skill"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Add Skill")}
              >
                <PencilRuler className="h-5 w-5" />
                Add Skill
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Add Software"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Add Software")}
              >
                <LayoutGrid className="h-5 w-5" />
                Add Software
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Profile"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Account")}
              >
                <User className="h-5 w-5" />
                Account
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Timeline"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Timeline")}
              >
                <History className="h-5 w-5" />
                Timeline
              </Link>
              <Link
                className={`flex items-center gap-4 px-2.5 ${
                  active === "Messages"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground "
                }`}
                onClick={() => setActive("Messages")}
              >
                <MessageSquareMore className="h-5 w-5" />
                Messages
              </Link>
              <Link
                className={
                  "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                }
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
          <img
            src={user && user.avatar && user.avatar.url}
            alt="avatar"
            className="w-20 h-20 rounded-full max-[900px]:hidden"
          />
          <h1 className="text-4xl max-[900px]:text-2xl">
            Welcome back, {user.fullName}
          </h1>
        </div>
      </header>
      {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
            break;
          case "Add Blog":
            return <AddBlog />;
            break;
          case "Add Skill":
            return <AddSkills />;
            break;
          case "Add Software":
            return <AddSoftware />;
            break;
          case "Add Timeline":
            return <AddTimeline />;
            break;
          case "Messages":
            return <Messages />;
            break;
          case "Account":
            return <Account />;
            break;
          default:
            return <Dashboard />;
            break;
        }
      })()}
    </div>
  );
};

export default HomePage;