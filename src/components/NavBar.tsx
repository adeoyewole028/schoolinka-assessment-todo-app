import { useState } from "react";
import {
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { FiBell, FiSettings } from "react-icons/fi";
import { HiBars3CenterLeft } from "react-icons/hi2";

export default function Nav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <nav className="fixed w-full top-0 left-0 right-0 z-40 bg-white border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center gap-2">
            <div className="sm:hidden">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <Link href="/" className="flex items-center text-black">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                ToDo
              </span>
            </Link>
          </div>
          <div className="hidden sm:flex gap-3 items-center md:order-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Link as="button" className="text-black">
                  <FiSettings />
                </Link>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <FiBell />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <button
            onClick={toggleDrawer}
            className="sm:hidden text-xl"
            type="button"
          >
            <HiBars3CenterLeft />
          </button>
          <div
            id="drawer-right"
            className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
              isDrawerOpen ? "translate-x-0" : "translate-x-full"
            } bg-white w-80 dark:bg-gray-800`}
            tabIndex={-1}
            aria-labelledby="drawer-right-label"
          >
            <h5
              id="drawer-right-label"
              className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
            >
              ToDo
            </h5>
            <button
              type="button"
              onClick={toggleDrawer}
              aria-controls="drawer-right"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>

            <ul className="flex flex-col gap-3 justify-center">
              <li>
                <Link href="#" className="text-black">
                  My Settings
                </Link>{" "}
              </li>
              <li>
                <Link href="#" className="text-black">
                  System
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black">
                  Configuration
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black">
                  Help & Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black">
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
