import React from "react";
import Book from "./Book";
import Filters from "../Filters";

function BookList({
    handleChange,
    handleReset,
    filterValues,
    filters,
    books,
    setFilters,
    getBooks,
    isAdmin,
    cartItemsNumber,
    setCartItemsNumber,
  }) {
    return (
      <>
        <Filters
          filterValues={filterValues}
          filters={filters}
          setFilters={setFilters}
          handleChange={handleChange}
          handleReset={handleReset}
        />
        <div className="container mt-3 mb-3">
          <div className="row" id="book-row">
            {books && books.length > 0 ? (
              books.map((item) => (
                <Book
                  key={item.id}
                  id={item.id}
                  date={item.publishDate}
                  discount={item.discount || 0}
                  name={item.title}
                  author={item.authors && item.authors.length > 0 ? item.authors[0].fullName : ""}
                  category={
                    item.genres && item.genres.length > 0
                      ? item.genres.map((genre) => genre.name).join(", ")
                      : ""
                  }
                  image={item.coverPhoto}
                  brand={item.publisher && item.publisher.name ? item.publisher.name : ""}
                  publishing_house={item.publisher && item.publisher.name ? item.publisher.name : ""}
                  price={item.price || 0}
                  quantity={item.status === 1 ? "YES" : "NO"}
                  rating={item.rating || 0}
                  getBooks={getBooks}
                  isAdmin={isAdmin}
                  cartItemsNumber={cartItemsNumber}
                  setCartItemsNumber={setCartItemsNumber}
                />
              ))
            ) : (
              <p>No books available.</p>
            )}
          </div>
        </div>
      </>
    );
  }
  
  export default BookList;