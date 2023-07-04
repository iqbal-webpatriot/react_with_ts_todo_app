import React, { useState } from "react";
import { GenericSelect } from "./GenericSelect";
import { Book, Laptop, Movie, books, laptops, movies } from "./data";
//!This trick is known as const assertion. With this, our tabs array, instead of an array of any random string will turn into a read-only array of those specific values and nothing else.
const tabs = ["Books", "Movies", "Laptops"] as const; 
type Tabs = typeof tabs;//? Tabs will be ['Books' | 'Movies' | 'Laptops'];
//! This trick is called “indexed access”, it’s a way to access types of properties or individual elements (if array) of another type.
type Tab = Tabs[number]; //? Tab will be 'Books' | 'Movies' | 'Laptops'
// Telling typescript explicitly that we want tab to be "never" type
// When this function is called, it should be "never" and only "never"
const confirmImpossibleState = (tab: never) => {
    throw new Error(`Reacing an impossible state because of ${tab}`);
  };
  
const getSelect = (tab: Tab) => {
  switch (tab) {
    case "Books":
      return (
        <GenericSelect<Book>
          onChange={(value) => console.info(value)}
          values={books}
          formatLabel={(value) => value.title}
           isMulti={false}
        />
      );
    case "Movies":
      return (
        <GenericSelect<Movie>
          onChange={(value) => console.info(value)}
          values={movies}
          formatLabel={(value) => value.title}
          isMulti={false}
        />
      );
    case "Laptops":
      return (
        <GenericSelect<Laptop>
          onChange={(value) => console.info(value)}
          values={laptops}
          formatLabel={(value) => value.model}
          isMulti={false}
        />
      );
      default:
        //? Any typos will be picked up by typescript, non-existing categories will be picked up, and missed categories will be picked up as well! This trick is called Exhaustiveness checking .
        confirmImpossibleState(tab);
  }
};

export const TabsComponent = () => {
  const [tab, setTab] = useState<Tab>(tabs[0]);

  const select = getSelect(tab);

  return (
    <>
     <div>
    <label htmlFor=""> Select category:</label>
      <br />
      <GenericSelect<Tab>
        onChange={(value) => setTab(value)}
        values={tabs}
        isMulti={false}
        formatLabel={(value) => value}
      />
     </div>
      
     <div>
    <label htmlFor=""> List of items:</label>
      <br />
      {select}
     </div>
    </>
  );
};
