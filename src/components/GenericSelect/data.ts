export type Book = {
    id: string;
    title: string;
    author: string;
  };
  
  export type Movie = {
    id: string;
    title: string;
    releaseDate: string;
  };
  
  export type Laptop = {
    id: string;
    model: string;
    releaseDate: string;
  };
  
  export const books: Book[] = [
    {
      id: "1",
      title: "Good omens",
      author: "Terry Pratchett & Neil Gaiman"
    },
    {
      id: "2",
      title: "The Truth",
      author: "Terry Pratchett"
    }
  ];
  
  export const movies: Movie[] = [
    {
      id: "1",
      title: "Captain Marvel",
      releaseDate: "2019"
    },
    {
      id: "2",
      title: "Good Omens",
      releaseDate: "2019"
    }
  ];
  
  export const laptops: Laptop[] = [
    {
      id: "1",
      model: "Orangebook Pro",
      releaseDate: "2019"
    },
    {
      id: "2",
      model: "Orangebook Pro Extreme",
      releaseDate: "2022"
    }
  ];
  