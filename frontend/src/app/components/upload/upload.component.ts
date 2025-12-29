import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFile: File | null = null;
  title: string = '';
  tagInput: string = '';
  tags: string[] = [];
  uploading: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10485760) {
        this.snackBar.open('File size must be less than 10MB', 'Close', {
          duration: 3000
        });
        return;
      }
      
      this.selectedFile = file;
      if (!this.title) {
        this.title = file.name;
      }
    }
  }

  addTag(): void {
    if (this.tagInput.trim() && !this.tags.includes(this.tagInput.trim())) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(t => t !== tag);
  }

  onSubmit(): void {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Please login to upload documents', 'Close', {
        duration: 3000
      });
      this.router.navigate(['/login']);
      return;
    }

    if (!this.selectedFile || !this.title) {
      this.snackBar.open('Please select a file and enter a title', 'Close', {
        duration: 3000
      });
      return;
    }

    this.uploading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('title', this.title);
    formData.append('tags', JSON.stringify(this.tags));

    this.documentService.uploadDocument(formData).subscribe({
      next: (response) => {
        this.uploading = false;
        this.snackBar.open('Document uploaded successfully!', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.uploading = false;
        console.error('Upload error:', error);
        
        if (error.status === 401) {
          this.snackBar.open('Session expired. Please login again.', 'Close', {
            duration: 3000
          });
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        } else {
          this.snackBar.open(
            error.error?.message || 'Upload failed. Please try again.',
            'Close',
            { duration: 3000 }
          );
        }
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
