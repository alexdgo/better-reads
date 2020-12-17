import numpy as np
import pandas as pd
from google.colab import drive
from stdnum import isbn

prefix = '/content/drive'
from google.colab import drive
drive.mount(prefix, force_remount=True)

books_covers_path = '/content/drive/My Drive/CIS550/book-covers.csv' 
books_path = '/content/drive/My Drive/CIS550/books.csv'
bookx_books_path = '/content/drive/My Drive/CIS550/BX_Books.csv'
bookx_ratings_path = '/content/drive/My Drive/CIS550/BX-Book-Ratings.csv'
bookx_users_path = '/content/drive/My Drive/CIS550/BX-Users.csv'

books_cols = ["bookID", "title", "authors", "average_rating", "isbn", "isbn13", "language_code", "num_pages", "ratings_count", "text_reviews_count", "publication_date", "publisher"]
bx_books_cols = ["ISBN", "Book-Title", "Book-Author", "Year-Of-Publication", "Publisher", "Image-URL-S", "Image-URL-M", "Image-URL-L"]
bx_ratings_cols = ["User-ID", "ISBN", "Book-Rating"]
bx_users_cols = ["User-ID", "Location", "Age"]

covers = pd.read_csv(books_covers_path)
books = pd.read_csv(books_path, names=books_cols)
bookx_books = pd.read_csv(bookx_books_path, sep=';', encoding='latin-1')
bookx_ratings = pd.read_csv(bookx_ratings_path, sep=';', encoding='latin-1')
bookx_users = pd.read_csv(bookx_users_path, sep=';', encoding='latin-1')

bookx_books = pd.read_csv(bookx_books_path, sep=';', encoding='latin-1')
bookx_ratings = pd.read_csv(bookx_ratings_path, sep=';', encoding='latin-1')


missing_bookx_books = bookx_books.isin(["NULL", " "])
missing_bookx_users = bookx_users.isin(["NULL", " "])
missing_bookx_ratings = bookx_ratings.isin(["NULL", "NaN"])
missing_covers = covers.isin(["NULL", "NaN"])
missing_books = books.isin(["NULL", " ", "NaN"])


missing_bx_books = missing_bookx_books.any(axis=1)
missing_bx_users = missing_bookx_users.all(axis=1)
missing_bx_ratings = missing_bookx_ratings.any(axis=1)
missing_books = missing_books.any(axis=1)
missing_covers = missing_covers.any(axis=1)

bookx_books = bookx_books.loc[(~missing_bx_books).values, :]
bookx_ratings = bookx_ratings.loc[(~missing_bx_ratings).values, :]
bookx_users = bookx_users.loc[(~missing_bx_users).values, :]
covers = covers.loc[(~missing_covers).values, :]

bx_books_isbns = bookx_books["ISBN"].unique()
bx_ratings_isbns = bookx_ratings["ISBN"].unique()
books_isbns = books["isbn"].unique()
books_isbn13s = books["isbn13"].unique()
covers_isbn13s = covers["isbn"].unique()

isbns = set(bx_books_isbns.tolist() + bx_ratings_isbns.tolist() + books_isbns.tolist())
isbn13s = set(books_isbn13s.tolist() + covers_isbn13s.tolist())

isbn_strings = list()
for i in covers_isbn13s.tolist():
  if isinstance(i, int):
    isbn_strings.append(str(i))
isbn13s = set(books_isbn13s.tolist() + isbn_strings)


invalid = set()
for num in isbns.union(isbn13s):
  if not isbn.is_valid(num):
    invalid.add(num)

bx_ratings_isbns = set(bx_ratings_isbns)
bx_books_isbns = set(bx_books_isbns)

covers["isbn"] = covers["isbn"].astype(str)

for num in covers["isbn"]:
  if (not isbn.is_valid(num) and num not in invalid):
    print(num)

bx_books_idx = bookx_books.index[bookx_books["ISBN"].isin(set(bx_books_isbns) - invalid)]
isbn_to_apply_books = bookx_books.loc[bx_books_idx, "ISBN"]

bx_ratings_idx = bookx_ratings.index[bookx_ratings["ISBN"].isin(set(bx_ratings_isbns) - invalid)]
isbn_to_apply_ratings = bookx_ratings.loc[bx_ratings_idx, "ISBN"]

isbn_applied_books = isbn_to_apply_books.apply(isbn.to_isbn13)
isbn_applied_ratings = isbn_to_apply_ratings.apply(isbn.to_isbn13)

bookx_books.loc[bx_books_idx, "ISBN"] = isbn_applied_books

bookx_ratings.loc[bx_ratings_idx, "ISBN"] = isbn_applied_ratings

book_isbns = bookx_books["ISBN"]
ratings_isbns = bookx_ratings["ISBN"]

bookx_books = bookx_books.loc[~bookx_books["ISBN"].isin(invalid), :]
bookx_ratings = bookx_ratings.loc[~bookx_ratings["ISBN"].isin(invalid), :]
books = books.loc[~books["isbn13"].isin(invalid), :]
covers = covers.loc[~covers["isbn"].isin(invalid), :]

bookx_books.loc[~bookx_books["ISBN"].isin(invalid), :]

book_isbns = bookx_books["ISBN"]
ratings_isbns = bookx_ratings["ISBN"]


bookx_books.to_csv("bx_books.csv", index=False)
bookx_ratings.to_csv("bx_ratings.csv", index=False)
bookx_users.to_csv("bx_users.csv", index=False)
books.to_csv("books.csv", index=False)
covers.to_csv("covers.csv", index=False)

from google.colab import files
files.download('bx_books.csv') 
files.download("bx_ratings.csv")
files.download("bx_users.csv")
files.download("books.csv")
files.download("covers.csv")

books_covers_path = '/content/drive/My Drive/CIS550/project/covers.csv' 
books_path = '/content/drive/My Drive/CIS550/project/books.csv' 
bookx_books_path = '/content/drive/My Drive/CIS550/project/bx_books.csv' 
bookx_ratings_path = '/content/drive/My Drive/CIS550/project/bx_ratings.csv' 
bookx_users_path = '/content/drive/My Drive/CIS550/project/bx_users.csv' 

covers = pd.read_csv(books_covers_path)
books = pd.read_csv(books_path)

bookx_users = pd.read_csv(bookx_users_path, encoding='latin-1')

bookx_books = pd.read_csv(bookx_books_path)
bookx_ratings = pd.read_csv(bookx_ratings_path)

del covers["cover"]
covers = covers.rename(columns={"image": "cover"})

bookx_ratings = bookx_ratings.rename(columns={"ISBN": "isbn"})
bookx_ratings = bookx_ratings.rename(columns={"User-ID": "user_id", "ISBN": "isbn", "Book-Rating" : "rating"})

del bookx_books["ISBN"]
del bookx_books["Image-URL-S"]
del bookx_books["Image-URL-M"]

bookx_books = bookx_books.rename(columns={"Book-Title": "title", "Book-Author" : "author", "Year-Of-Publication": "year_published", "Publisher":"publisher", "Image-URL-L": "cover"})

final_book_df = pd.merge(books, covers, on="isbn", how="left")
final_book_df = pd.merge(final_book_df, bookx_books, on="isbn", how="left")

final_book_df.to_csv("Book.csv", index=False)
bookx_ratings.to_csv("Rating.csv", index=False)
bookx_users.to_csv("Reader.csv", index=False)

files.download('Book.csv') 
files.download("Rating.csv")
files.download("Reader.csv")