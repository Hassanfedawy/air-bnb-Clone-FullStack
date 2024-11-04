"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import UserMenu from "./userMenu";
import Categories from "./Categories";
import React, { useState } from 'react';

function Nav() {
  const [selectedLabel, setSelectedLabel] = useState(""); // Define the state here

  return (
    <div>
      <div className="sticky top-0 z-10 p-5 md:px-10 flex justify-between bg-white shadow-md">
        <Link href={"/"}>
          <Image
            src="https://links.papareact.com/qd3"
            loading="lazy"
            alt="Logo"
            width={150}
            height={70}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <SearchBar />
        <UserMenu />
      </div>
      <Categories selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} /> {/* Pass the state and setter */}
    </div>
  );
}

export default Nav;
