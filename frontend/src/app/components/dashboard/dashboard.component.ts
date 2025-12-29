import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { DocumentService, Document } from '../../services/document.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  loading = false;
  currentUser: any;
  
  searchControl = new FormControl('');
  sortControl = new FormControl('date');
  tagFilter = new FormControl('');

  constructor(
    public authService: AuthService,
    private documentService: DocumentService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loadDocuments();
    this.setupFilters();
  }

  setupFilters() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.applyFilters());

    this.sortControl.valueChanges.subscribe(() => this.applyFilters());
    this.tagFilter.valueChanges.subscribe(() => this.applyFilters());
  }

  loadDocuments() {
    this.loading = true;
    this.documentService.getDocuments().subscribe({
      next: (response) => {
        this.documents = response.data || [];
        this.filteredDocuments = [...this.documents];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error loading documents', 'Close', { duration: 3000 });
      }
    });
  }

  applyFilters() {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    const sortBy = this.sortControl.value || 'date';
    const tag = this.tagFilter.value || '';

    // Filter documents
    this.filteredDocuments = this.documents.filter(doc => {
      const matchesSearch = !searchTerm || 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.fileName.toLowerCase().includes(searchTerm);
      
      const matchesTag = !tag || doc.tags.includes(tag);

      return matchesSearch && matchesTag;
    });

    // Sort documents
    this.filteredDocuments.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'size') return b.fileSize - a.fileSize;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  viewDocument(id: string) {
    this.router.navigate(['/documents', id]);
  }

  deleteDocument(id: string, event: Event) {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => {
          this.snackBar.open('Document deleted successfully', 'Close', { duration: 3000 });
          this.loadDocuments();
        },
        error: (error) => {
          this.snackBar.open(error.error?.message || 'Error deleting document', 'Close', { duration: 3000 });
        }
      });
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  canEdit(doc: Document): boolean {
    if (!this.currentUser) return false;
    if (this.currentUser.role === 'admin') return true;
    if (doc.uploadedBy._id === this.currentUser._id) return true;
    return doc.permissions.editAccess.some((user: any) => user._id === this.currentUser._id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToUpload() {
    this.router.navigate(['/upload']);
  }
}
