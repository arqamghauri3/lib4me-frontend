import React from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Bell, Moon, UserCircleIcon } from "lucide-react";

function Topbar() {
  return (
    <div id="navbar" className="flex justify-between px-10 w-full">
      <div id="search">
        <Field className="w-[250px]">
          <Input id="search-books" type="text" placeholder="Search" className="bg-gray-200" />
        </Field>
      </div>
      <div id="profile" className="flex gap-2">
        <Moon />
        <Bell />
        <UserCircleIcon />
      </div>
    </div>
  );
}

export default Topbar;
