import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Book {
  id?: number;
  title: string;
  author: string;
  year: number;
}

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'], // Corrigido: styleUrls é um array
})
export class UserHomeComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/books';
  bookForm: FormGroup;
  books: Book[] = [];
  errorMessage: { [key: string]: string | null } = {
    title: null,
    author: null,
    year: null,
  };

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      title: [''],
      author: [''],
      year: [''],
    });

    // Monitorar mudanças individualmente para cada campo
    this.bookForm.get('title')?.valueChanges.subscribe(() => {
      const control = this.bookForm.get('title');
      if (control && control.valid) {
        this.errorMessage['title'] = null;
      }
    });

    this.bookForm.get('author')?.valueChanges.subscribe(() => {
      const control = this.bookForm.get('author');
      if (control && control.valid) {
        this.errorMessage['author'] = null;
      }
    });

    this.bookForm.get('year')?.valueChanges.subscribe(() => {
      const control = this.bookForm.get('year');
      if (control && control.valid) {
        this.errorMessage['year'] = null;
      }
    });
  }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<Book[]>(this.apiUrl).subscribe((books) => {
      this.books = books;
    });
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;

      this.http.post<Book>(this.apiUrl, newBook).subscribe({
        next: (book) => {
          this.books.push(book);
          this.bookForm.reset();
        },
        error: (error) => {
          console.error('Erro ao adicionar livro', error);
        },
      });
    }
  }

  validateForm() {
    const title = this.bookForm.get('title')?.value;
    const author = this.bookForm.get('author')?.value;
    const year = this.bookForm.get('year')?.value;

    let isValid = true;
    if (!title) {
      this.errorMessage['title'] = 'O título do livro é obrigatório';
      isValid = false;
    }
    if (!author) {
      this.errorMessage['author'] = 'O nome do autor é obrigatório';
      isValid = false;
    }
    if (!year) {
      this.errorMessage['year'] = 'O ano do livro é obrigatório';
      isValid = false;
    }
    return isValid;
  }
  deleteBook(id: number | undefined, index: number) {
    if (id !== undefined) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.books.splice(index, 1);
          console.log(`livro com o id ${id} removido`);
        },
        error: (error) => {
          console.error('Erro ao remover o livro', error);
        },
      });
    }
  }
}
