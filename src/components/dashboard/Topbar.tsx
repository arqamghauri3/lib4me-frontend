"use client"
import React from "react";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Bell, Moon, Search, UserCircleIcon } from "lucide-react";
import { DropdownMenuAvatar } from "../ui/dropdown-menu-avatar";

function Topbar() {
  return (
    <div id="navbar" className="flex w-full justify-between px-10">
      <div id="search" className="flex items-center justify-center">
        <Field orientation="horizontal" className="w-fit">
          <Search size={16} />
          <Input
            id="search-books"
            type="text"
            placeholder="Search book name, author"
            className="border-0 bg-transparent"
          />
        </Field>
      </div>
      <div id="profile" className="flex gap-2">
        <Moon />
        <Bell />
        <DropdownMenuAvatar />
      </div>
    </div>
  );
}

export default Topbar;
