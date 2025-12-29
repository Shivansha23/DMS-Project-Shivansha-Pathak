import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Document {
  _id: string;
  title: string;
  description?: string;
  tags: string[];
  fileUrl: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedBy: any;
  permissions: {
    viewAccess: any[];
    editAccess: any[];
  };
  versions: any[];
  currentVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;

  constructor(private http: HttpClient) { }

  uploadDocument(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  getDocuments(filters?: any): Observable<any> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.tag) params = params.set('tag', filters.tag);
      if (filters.uploadedBy) params = params.set('uploadedBy', filters.uploadedBy);
      if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  getDocument(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateDocument(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getDocumentVersions(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/versions`);
  }

  updatePermissions(id: string, permissions: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/permissions`, permissions);
  }
}
