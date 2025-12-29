import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { DocumentService, Document } from '../../services/document.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-document-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule
  ],
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  document: Document | null = null;
  loading = false;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDocument(id);
    }
  }

  loadDocument(id: string) {
    this.loading = true;
    this.documentService.getDocument(id).subscribe({
      next: (response) => {
        this.document = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open(error.error?.message || 'Error loading document', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      }
    });
  }

  downloadDocument() {
    if (this.document) {
      window.open(this.document.fileUrl, '_blank');
    }
  }

  deleteDocument() {
    if (!this.document) return;

    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(this.document._id).subscribe({
        next: () => {
          this.snackBar.open('Document deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/dashboard']);
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

  canEdit(): boolean {
    if (!this.document || !this.currentUser) return false;
    if (this.currentUser.role === 'admin') return true;
    if (this.document.uploadedBy._id === this.currentUser._id) return true;
    return this.document.permissions.editAccess.some((user: any) => user._id === this.currentUser._id);
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
